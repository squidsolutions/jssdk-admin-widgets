(function (root, factory) {
    root.squid_api.view.CollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        collection : null,
        config : null,
        modalElementClassName : "squid-api-admin-widgets-modal-form",
        type : null,
        collectionAvailable : false,
        suggestionHandler : null,
        changeEventHandler : null,
        schemasCallback : null,
        beforeRenderHandler : null,

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
            if (options.suggestionHandler) {
                this.suggestionHandler = options.suggestionHandler;
            }
            if (options.schemasCallback) {
                this.schemasCallback = options.schemasCallback;
            }
            if (options.beforeRenderHandler) {
                this.beforeRenderHandler = options.beforeRenderHandler;
            }

            // set base then update
            this.collection = new squid_api.model.BaseCollection();
            this.updateCollection();

            this.collection.on("reset change remove sync", this.render, this);

            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.parent, "change", function() {
                // project has changed
                this.collectionAvailable = false;
                this.render();
                this.collection.parentId = this.parent.get("id");
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
                        title: this.type + "s"
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

        updateCollection: function() {
            var me = this;

            // match a base collection and overwrite base
            var collection = null;
            for (var collectionItem in squid_api.model) {
                var str = collectionItem;
                var res = str.match(this.type + "Collection");
                if (res) {
                    this.collection = new squid_api.model[res]();
                }
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
                        suggestionHandler : me.suggestionHandler,
                        schemasCallback : me.schemasCallback,
                        beforeRenderHandler : me.beforeRenderHandler,
                        successHandler : function() {
                            if (me.changeEventHandler) {
                                me.changeEventHandler.call(this);
                            }
                            $(me.collectionModal.el).trigger("hidden.bs.modal");
                            var message = me.type + " with name " + this.get("name") + " has been successfully created";
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
                    suggestionHandler : me.suggestionHandler,
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

            // delete
            $(".squid-api-" + this.type + "-model-widget-popup .delete").on("click", function() {
                var id = this.parentElement.dataset.attr;
                var model = me.collection.get(id);

                if (confirm("are you sure you want to delete the " + model.definition.toLowerCase() + " " + model.get("name") + "?")) {
                    if (true) {
                        model.destroy({
                            success:function(collection) {
                                $(me.collectionModal.el).trigger("hidden.bs.modal");
                                var message = me.type + " with name " + collection.get("name") + " has been successfully deleted";
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

            var modelRole = this.model.get("_role");
            var parentRole = this.parent.get("_role");

            // write role
            if (modelRole == "WRITE" || modelRole == "OWNER" || parentRole == "OWNER" || parentRole == "WRITE") {
                roles.create = true;
                roles.edit = true;
                roles.delete = true;
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
                    "options" : [],
                    "valueSelected" : false,
                    "create" : this.roles.create,
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

            // sort data by dynamic attribute
            jsonData.options.sort(function(a, b) {
                var labelA = a.label.toUpperCase();
                var labelB = b.label.toUpperCase();
                return (labelA < labelB) ? -1 : (labelA > labelB) ? 1 : 0;
            });

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
