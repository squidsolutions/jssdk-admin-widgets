(function (root, factory) {
    root.squid_api.view.CollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        collection : null,
        config : null,
        type : null,
        typeLabelPlural : null,
        collectionAvailable : null,
        comparator : null,
        parentType : null,

        initialize: function(options) {
            var me = this;
            this.status = squid_api.model.status;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            if (options.type) {
                this.type = options.type;
            }
            if (options.typeLabelPlural) {
                this.typeLabelPlural = options.typeLabelPlural;
            } else {
                this.typeLabelPlural = this.type + "s";
            }
            if (options.config) {
                this.config = options.config;
            } else {
                this.config = squid_api.model.config;
            }
            if (options.parent) {
                this.parent = options.parent;
            }

            // once the parent role changes, initialize the collection
            if (this.parent) {
                this.listenTo(this.config, "change:"+this.parent, this.initCollection);
            } else {
                this.listenTo(squid_api.model.login, "change:accessToken", this.initCollection);
            }

            this.render();
        },

        setParent : function() {
            // set & fetch parent
            this.parent.set("id", { projectId : this.config.get("project")});
        },

        fetchParent : function() {
            // fetch parent
            this.parent.fetch({
                error: function() {
                    me.status.set({"error":response});
                }
            });
        },

        initCollection : function() {
            var me = this;

            // match a base collection
            for (var collectionItem in squid_api.model) {
                var str = collectionItem;
                var res = str.match(this.type + "Collection");
                if (res) {
                    this.collection = new squid_api.model[res]();
                }
            }
            if (this.collection) {
                this.$el.find("button").html("<span class='glyphicon glyphicon-refresh'></span> fetching " + me.typeLabelPlural);
                // once collection synced, re-render button
                this.collection.on("sync", this.render, this);
                // set & fetch collection
                if (this.parent) {
                    this.collection.parentId = this.config.get(this.parent);
                }
                this.collection.fetch({
                    success : function() {
                        me.collectionAvailable = true;
                    },
                    error : function(collection, response, options) {
                        me.status.set({"error":response});
                    }
                });
            }
        },

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

        events: {
            "click button": "initializeModal"
        },


        initializeModal: function(){
             this.modalOpen = true;
             this.render();
         },

        getRoles: function() {
            // roles
            var roles = {"create" : false, "edit" : false, "delete" : false, "refresh" : false};

            var parentRole = this.parent.get("_role");

            // write role
            if (parentRole == "OWNER" || parentRole == "WRITE") {
                roles.create = true;
                roles.edit = true;
                roles.delete = true;
                roles.refresh = true;
            }

            return roles;
        },

        render: function() {

            var me = this;

            if (this.modalOpen) {

                if (!this.contentView) {
                    // if modal displayed and not initialized
                    this.contentView = Backbone.View.extend({
                        initialize: function() {
                            me.collection.on("sync", this.render, this);
                        },
                        events: {
                            // select
                            "click .select": function(event) {
                                var value = $(event.target).parent('tr').attr('data-attr');
                                if (me.changeEventHandler) {
                                    // trigger close
                                    $(this.el).trigger("hidden.bs.modal");
                                    me.changeEventHandler.call(this, value);
                                } else {
                                    console.log('no change handler defined');
                                }
                            },
                            "click .create": function() {
                                if (me.roles.create) {
                                    new this.modelView({
                                        el : $(this).find(".create"),
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
                                }
                            },
                            "click .edit": function(event) {
                                var id = $(event.target).parents('tr').attr("data-attr");
                                var model = this.collection.get(id);
                                new this.modelView({
                                    el : $(this),
                                    model : model,
                                    parent : me.parent,
                                    successHandler : function() {
                                        if (me.changeEventHandler) {
                                            me.changeEventHandler.call(this);
                                        }
                                        var message = me.type + " with name " + this.get("name") + " has been successfully modified";
                                        squid_api.model.config.trigger("change:project", squid_api.model.config);
                                        squid_api.model.status.set({'message' : message});
                                    }
                                });
                            },
                            "click .refresh": function(event) {
                                var id = $(event.target).parents('tr').attr("data-attr");
                                var model = me.collection.get(id);
                                squid_api.refreshObjectType(model);
                            },
                            "click .delete": function(event) {
                                var id = $(event.target).parents('tr').attr("data-attr");
                                var model = me.collection.get(id);
                                if (confirm("are you sure you want to delete the " + model.definition.toLowerCase() + " " + model.get("name") + "?")) {
                                    if (true) {
                                        model.destroy({
                                            wait : true,
                                            success:function(collection) {
                                                $(me.collectionModal.el).trigger("hidden.bs.modal");
                                                var message = me.typeLabel + " with name " + collection.get("name") + " has been successfully deleted";
                                                squid_api.model.status.set({'message' : message});
                                            },
                                            error : function(collection, response) {
                                                squid_api.model.status.set({'error' : response});
                                            }
                                        });
                                    }
                                }
                            }
                        },
                        render: function() {
                            var jsonData = {
                                models : [],
                                type : me.typeLabelPlural,
                                modalHtml : true
                            };
                            // store models
                            if (me.collection) {
                                for (i=0; i<me.collection.models.length; i++) {
                                    var model = {};
                                    model.label = me.collection.models[i].get("name");
                                    jsonData.models.push(model);
                                }
                            }

                            // print template
                            var html = me.template(jsonData);
                            this.$el.html(html);
                            return this;
                        }
                    });

                    this.collectionModal = new Backbone.BootstrapModal({
                        content: new this.contentView(),
                        title: this.typeLabelPlural
                    }).open();
                } else {
                    me.collectionModal.open();
                }
                /* bootstrap doesn't remove modal from dom when clicking outside of it.
                   Check to make sure it has been removed whenever it isn't displayed.
                */
                $(this.collectionModal.el).one('hidden.bs.modal', function () {
                    me.collectionModal.close();
                    me.collectionModal.remove();
                    me.modalOpen = false;
                });
                $(this.collectionModal.el).find(".close").one("click", function() {
                    $(me.collectionModal.el).trigger("hidden.bs.modal");
                });
                $(this.collectionModal.el).find(".cancel").one("click", function() {
                    $(me.collectionModal.el).trigger("hidden.bs.modal");
                });
            } else {
                var jsonData = {
                    collectionAvailable : this.collectionAvailable,
                    type : this.typeLabelPlural,
                    modalHtml : false
                };

                // print template
                var html = $(this.template(jsonData));
                this.$el.html(html);
            }

            return this;
        }

    });

    return View;
}));
