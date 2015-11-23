(function (root, factory) {
    root.squid_api.view.CollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        collection : null,
        config : null,
        modalElementClassName : "squid-api-admin-widgets-modal-form squid-api-admin-widgets-modal-form-collection",
        type : null,
        typeLabel : null,
        typeLabelPlural : null,
        collectionAvailable : false,
        suggestionHandler : null,
        changeEventHandler : null,
        schemasCallback : null,
        beforeRenderHandler : null,
        comparator : null,
        
        alphaNameComparator : function(a,b) {
            var va = a.get("name").toLowerCase();
            var vb = b.get("name").toLowerCase();
            if (va < vb) {
                return -1;
            }
            if (va > vb) {
                return 1;
            }
            return 0;
        },
        
        dynamicComparator : function(a,b) {
            var da = a.get("dynamic");
            var db = b.get("dynamic");
            return (da === db) ? 0 : da ? 1 : -1;
        },

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            if (options.changeEventHandler) {
                this.changeEventHandler = options.changeEventHandler;
            }
            if (options.type) {
                this.type = options.type;
            }
            if (options.typeLabel) {
                this.typeLabel = options.typeLabel;
            } else {
                this.typeLabel = this.type;
            }
            if (options.typeLabelPlural) {
                this.typeLabelPlural = options.typeLabelPlural;
            } else {
                this.typeLabelPlural = this.typeLabel + "s";
            }
            if (options.config) {
                this.config = options.config;
            } else {
                this.config = squid_api.model.config;
            }
            if (options.parent) {
                this.parent = options.parent;
            }
            if (!this.model) {
                this.model =  new squid_api.model[this.type + "Model"]();
            }
            if (options.schemasCallback) {
                this.schemasCallback = options.schemasCallback;
            }
            if (options.beforeRenderHandler) {
                this.beforeRenderHandler = options.beforeRenderHandler;
            }
            if (options.comparator) {
                this.comparator = options.comparator;
            } else {
                // default is : sort by alpha name and dynamic last
                this.comparator =  function(a, b) {
                    var r = me.dynamicComparator(a,b);
                    if (r === 0) {
                        r = me.alphaNameComparator(a,b);
                    }
                    return r;
                };
            }

            // set Collection
            
            // match a base collection
            for (var collectionItem in squid_api.model) {
                var str = collectionItem;
                var res = str.match(this.type + "Collection");
                if (res) {
                    this.collection = new squid_api.model[res]();
                }
            }
            if (!this.collection) {
                squid_api.model.status.set({error : true, message: "No collection found for type :"+ this.type});
            }

            this.collection.comparator = this.comparator;
            this.collection.on("remove", function(model) {
                if (model.get("oid") == me.config.get(me.model.definition.toLowerCase())) {
                    me.config.unset(me.model.definition.toLowerCase());
                }
            });
            this.collection.on("reset change sync", this.render, this);
            this.collection.on("remove change", function() {
            	if (me.model.definition == "Domain") {
            		this.fetch();
            	}
            });

            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.parent, "change", function() {
                var parentActive = true;

                // project has changed
                this.collectionAvailable = false;
                this.render();

                this.collection.parentId = this.parent.get("id");

                if (this.parent.definition == "Project") {
                    if (! this.collection.parentId.projectId) {
                        parentActive = false;
                    }
                }

                if (parentActive) {
                    this.collection
                        .fetch({
                            success : function() {
                                me.collectionAvailable = true;
                            },
                            error : function(collection, response, options) {
                                squid_api.model.status.set({"error":response});
                                me.collectionAvailable = true;
                            }
                        });
                }
            });

            this.render();
        },

        setModel : function(model) {
            this.model = model;
            this.listenTo(this.model, "change", this.render);
        },

        events: {
            "click button": function() {
                var me = this;

                if (this.collectionModal) {
                    this.collectionModal.$el.find(".modal-body").html(this.html);
                    // redelegate events after updating template
                    this.collectionModal.delegateEvents();
                    this.collectionModal.open();
                } else {
                    this.collectionModal = new Backbone.BootstrapModal({
                        content: this.html,
                        title: this.typeLabelPlural
                    });
                    this.collectionModal.open();
                }
                // remove button
                $(this.collectionModal.el).find("button.selected-model").remove();

                // modal wrapper class
                $(this.collectionModal.el).addClass(this.modalElementClassName);
                $(this.collectionModal.el).addClass("squid-api-" + this.type + "-model-widget-popup-container");

                // add events
                this.actionEvents(this.roles);

                /* bootstrap doesn't remove modal from dom when clicking outside of it.
                   Check to make sure it has been removed whenever it isn't displayed.
                */
                $(this.collectionModal.el).one('hidden.bs.modal', function () {
                    me.closeModal();
                });
                $(this.collectionModal.el).find(".close").one("click", function() {
                    $(me.collectionModal.el).trigger("hidden.bs.modal");
                });
                $(this.collectionModal.el).find(".cancel").one("click", function() {
                    $(me.collectionModal.el).trigger("hidden.bs.modal");
                });
            }
        },

        closeModal : function() {
            this.collectionModal.close();
            this.collectionModal.remove();
        },

        actionEvents: function(roles) {
            var me = this;

            // select
            $(".squid-api-" + this.type + "-model-widget-popup .select").on("click", function() {
                var value = $(this).parent('tr').attr('data-attr');
                if (me.changeEventHandler) {
                    $(me.collectionModal.el).trigger("hidden.bs.modal");
                    $(".squid-api-" + this.type + "-model-widget-popup").dialog("close");
                    me.changeEventHandler.call(this, value);
                } else {
                    console.log('no change handler defined');
                }
            });

            if (roles.create) {
                // create
                $(".squid-api-" + this.type + "-model-widget-popup .create").on("click", function() {
                    new squid_api.view.ModelManagementView({
                        el : $(this).find(".create"),
                        model : new squid_api.model[ me.model.definition + "Model"](),
                        parent : me.parent,
                        autoOpen : true,
                        schemasCallback : me.schemasCallback,
                        beforeRenderHandler : me.beforeRenderHandler,
                        successHandler : function() {
                            if (me.changeEventHandler) {
                                me.changeEventHandler.call(this);
                            }
                            me.collection.add(this);
                            $(me.collectionModal.el).trigger("hidden.bs.modal");
                            var message = me.typeLabel + " has been successfully created";
                            squid_api.model.status.set({'message' : message});
                        }
                    });
                });
            }

            // edit
            $(".squid-api-" + this.type + "-model-widget-popup .edit").on("click", function() {
                var id = this.parentElement.dataset.attr;
                var model = me.collection.get(id);
                new squid_api.view.ModelManagementView({
                    el : $(this),
                    model : model,
                    parent : me.parent,
                    autoOpen : true,
                    schemasCallback : me.schemasCallback,
                    beforeRenderHandler : me.beforeRenderHandler,
                    buttonLabel : "edit",
                    successHandler : function() {
                        var message = me.type + " with name " + this.get("name") + " has been successfully modified";
                        squid_api.model.config.trigger("change:project", squid_api.model.config);
                        squid_api.model.status.set({'message' : message});
                    }
                });
            });

            // refresh
            $(".squid-api-" + this.type + "-model-widget-popup .refresh").on("click", function() {
                var id = this.parentElement.dataset.attr;
                var model = me.collection.get(id);
                squid_api.refreshObjectType(model);
            });

            // delete
            $(".squid-api-" + this.type + "-model-widget-popup .delete").on("click", function() {
                var id = this.parentElement.dataset.attr;
                var model = me.collection.get(id);

                if (confirm("are you sure you want to delete the " + model.definition.toLowerCase() + " " + model.get("name") + "?")) {
                    if (true) {
                        model.destroy({
                            success:function(collection) {
                                $(me.collectionModal.el).trigger("hidden.bs.modal");
                                var message = me.typeLabel + " with name " + collection.get("name") + " has been successfully deleted";
                                squid_api.model.status.set({'message' : message});
                            }
                        });
                    }
                }
            });
        },

        userRoles: function() {
            // roles
            var roles = {"create" : false, "edit" : false, "delete" : false};

            var parentRole = this.parent.get("_role");

            // write role
            if (parentRole == "OWNER" || parentRole == "WRITE") {
                roles.create = true;
                roles.edit = true;
                roles.delete = true;
            }

            // decide which models can be refreshed
            if ((this.model.definition == "Project" || this.model.definition == "Domain") && (parentRole == "OWNER" || parentRole == "WRITE")) {
                roles.refresh = true;
            }

            return roles;
        },

        render: function() {
            var me = this;

            this.roles = this.userRoles();
            var collectionNotAvailableReason = "please select a " + this.parent.definition + " first ";

            var jsonData = {
                    "selAvailable" : false,
                    "type" : this.type,
                    "typeLabel" : this.typeLabel,
                    "typeLabelPlural" : this.typeLabelPlural,
                    "options" : [],
                    "valueSelected" : false,
                    "create" : this.roles.create,
                    "refresh" : this.roles.refresh,
                    "collectionAvailable" : this.collectionAvailable,
                    "collectionNotAvailableReason" : collectionNotAvailableReason
            };
            if (this.model && this.model.get("id")) {
                jsonData.selectedLabel = this.model.get("name");
            } else {
                jsonData.selectedLabel = null;
            }

            var models = this.collection.models;

            // selected obj
            var sel = [];

            // populate view data
            for (i=0; i<models.length; i++) {
                jsonData.selAvailable = true;
                var selected = false;
                // obtain name from model
                var oid = models[i].get("oid");
                if (oid) {
                    if (this.config.get(this.type.toLowerCase()) === oid) {
                        jsonData.selectedName = models[i].get("name");
                        selected = true;
                    }
                }
                var option = {
                        "label" : models[i].get("name"),
                        "value" : oid,
                        "selected" : selected,
                        "edit" : this.roles.edit,
                        "refresh" : this.roles.refresh,
                        "delete" : this.roles.delete
                };

                // support dynamic collections
                if (models[i].get("dynamic")) {
                    option.dynamic = true;
                    option.label = "~" + models[i].get("name");
                } else {
                    option.dynamic = false;
                }

                if (selected) {
                    jsonData.valueSelected = true;
                    sel.push(option);
                } else {
                    jsonData.options.push(option);
                }
            }

            // place selected obj at start of array
            if (sel[0]) {
                jsonData.options.unshift(sel[0]);
            }

            // print template
            this.html = this.template(jsonData);
            this.$el.html(this.html);

            if (this.collectionModal) {
                this.collectionModal.$el.find(".modal-body").html(this.html);
                // redelegate events after updating template
                this.collectionModal.delegateEvents();

                // remove button
                $(this.collectionModal.el).find("button.selected-model").remove();

                // modal wrapper class
                $(this.collectionModal.el).addClass(this.modalElementClassName);
                $(this.collectionModal.el).addClass("squid-api-" + this.type + "-model-widget-popup-container");

                // add events
                this.actionEvents(this.roles);
            }

            // set button value
            this.$el.find("button.selected-model").text(jsonData.selectedName);

            // hide main button if parent is not set
            if (!this.parent.get("id")) {
                this.$el.find("button.selected-model").addClass("hidden");
            } else {
                this.$el.find("button.selected-model").removeClass("hidden");
            }

            // remove popup information from the view
            this.$el.find(".squid-api-" + this.type + "-model-widget-popup").remove();

            return this;
        }

    });

    return View;
}));
