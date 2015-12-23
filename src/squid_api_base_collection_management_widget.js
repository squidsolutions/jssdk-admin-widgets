(function (root, factory) {
    root.squid_api.view.BaseCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_base_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : template,
        collection : null,
        selectedModel : null,
        config : null,
        type : null,
        typeLabelPlural : null,
        comparator : null,
        parentType : null,
        modelView : null,
        cancelCallback : null,
        collectionLoading : false,

        initialize: function(options) {
            this.config = squid_api.model.config;
            this.status = squid_api.model.status;
            var me = this;

            if (options) {
                if (options.type) {
                    this.type = options.type;
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
                if (options.cancelCallback) {
                    this.cancelCallback = options.cancelCallback;
                }
                if (options.onSelect) {
                    this.onSelect = options.onSelect;
                }
            }
            
            this.initModel();
            
            this.init(options);
        },
        
        /**
         * Init the Model : selectedModel, collection and listeners
         */
        initModel : function() {
            var me = this;
            // listen for config changes
            this.config.on("change", function (config) {
                var selectedId = config.get(me.configSelectedId);
                if (me.configParentId) {
                    if (config.hasChanged(me.configParentId)) {
                        // parent has changed
                        var parentId = config.get(me.configParentId);
                        me.collectionLoading = true;
                        me.render();
                        if (parentId) {
                            // set the collection to listen to
                            if (me.collection) {
                                me.stopListening(me.collection);
                            }
                            me.loadCollection(parentId).done(function(collection) {
                                me.collection = collection;
                                me.listenTo(me.collection, "sync remove", me.render);
                                if (config.hasChanged(me.configSelectedId)) {
                                    // selected also changed
                                    me.setSelectedModel(selectedId);
                                } else {
                                    me.collectionLoading = false;
                                    me.render();
                                }
                            }).fail(function() {
                                me.collectionLoading = false;
                                me.render();
                            });
                        }
                    } else if (config.hasChanged(me.configSelectedId)) {
                        // selection only has changed
                        me.setSelectedModel(selectedId);
                    }
                } else if (config.hasChanged(me.configSelectedId)) {
                    // no parent but selection has changed
                    me.collectionLoading = true;
                    me.render();
                    // set collection
                    if (me.collection) {
                        me.stopListening(me.collection);
                    }
                    me.loadCollection(null).done(function(collection) {
                        me.collection = collection;
                        // listen to collection fetch or removed element
                        me.listenTo(me.collection, "sync remove", me.render);
                        me.setSelectedModel(selectedId);
                    }).fail(function() {
                        me.collectionLoading = false;
                        me.render();
                    });
                }
            });
        },
        
        /**
         * Set the selectedModel attribute.
         * Loads the corresponding Model object and listen for its changes.
         */
        setSelectedModel : function(modelId) {
            var me = this;
            if (this.selectedModel) {
                this.stopListening(me.selectedModel);
            }
            if (modelId) {
                me.collection.load(modelId).then(function(model) {
                    me.collectionLoading = false;
                    me.selectedModel = model;
                    me.render();
                    me.listenTo(me.selectedModel, "change", me.render);
                });
            } else {
                me.collectionLoading = false;
                me.render();
            }
        },
        
        init: function(options) {
            // may be overridden
        },

        /**
         * Load main collection
         * @return Promise
         */
        loadCollection : function() {
            console.error("loadCollection must be overridden");
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

        originalEvents: {
            'mouseenter tr': function(event) {
                $(event.target).parent('tr').parent('table').find(".collection-option i").hide();
                var elements = $(event.target).parent('tr').find(".collection-option i");
                elements.show();
            },
            'mouseleave tr': function(event) {
                var elements = $(event.target).parent('tr').find(".collection-option i");
                elements.hide();
            },
            // select
            "click .select": function(event) {
                var value = $(event.target).parent('tr').attr('data-attr');
                this.config.set(this.type.toLowerCase(), value);
                if (this.onSelect) {
                    this.onSelect.call();
                }
            },
            "click .refresh": function(event) {
                var id = $(event.target).parents('tr').attr("data-attr");
                var model = this.collection.get(id);
                squid_api.refreshObjectType(model);
            },
            "click .create" : function() {
                var me = this;
                // create a new model
                var model = new this.collection.model();
                model.set("id", this.collection.parent.get("id"));
                // listen for new model changes
                me.listenTo(model, "sync", function() {
                    me.collection.add(model);
                    me.render();
                });
                
                this.renderModelView(new this.modelView({
                    model : model,
                    cancelCallback : function() {
                        me.render();
                    }
                }));
            },
            "click .edit" : function(event) {
                var me = this;
                var id = $(event.target).parents('tr').attr("data-attr");
                var model = this.collection.get(id);
                // listen for model changes
                me.listenTo(model, "change", function() {
                    me.render();
                });
                this.renderModelView(new this.modelView({
                    model : model,
                    cancelCallback : function() {
                        me.render();
                    }
                }));
            },
            "click .delete": function(event) {
                var me = this;
                var id = $(event.target).parents('tr').attr("data-attr");
                var model = this.collection.get(id);
                if (confirm("are you sure you want to delete the " + model.definition.toLowerCase() + " " + model.get("name") + "?")) {
                    if (true) {
                        model.destroy({
                            wait : true,
                            success:function(model) {
                                // set status
                                var message = model.get("objectType") + " with name " + model.get("name") + " has been successfully deleted";
                                me.status.set({'message' : message});
                            },
                            error : function(collection, response) {
                                me.status.set({'error' : response});
                            }
                        });
                    }
                }
            }
        },

        // Additional Events to be overridden
        additionalEvents: {

        },

        events : function() {
            return _.extend({},this.originalEvents,this.additionalEvents);
        },

        getCreateRole: function() {
            var role = false;
            if (this.collection) {
                if (this.collection.parent) {
                    var parentRole = this.collection.parent.get("_role");
                    // write role
                    if (parentRole === "OWNER" || parentRole === "WRITE") {
                        role = true;
                    }
                }
            }
            return role;
        },

        getModelRoles: function(model) {
            var roles;
            var role = model.get("_role");
            if (!role || (role === "OWNER" || role === "WRITE")) {
                roles = {"edit" : true, "delete" : true, "refresh" : true};
            } else {
                roles = {"edit" : false, "delete" : false, "refresh" : false};
            }
            return roles;
        },
        
        getModelLabel: function(model) {
            return model.get("name");
        },

        renderModelView: function(modelView) {
            this.$el.html(modelView.el);
        },

        render: function() {
            console.log("render CollectionManagementWidget "+this.type);
            var jsonData = {
                collectionLoaded : !this.collectionLoading,
                collection : this.collection,
                roles : null,
                createRole : null,
                typeLabelPlural : this.typeLabelPlural,
                modalHtml : true,
                type : this.type
            };
            if (this.collection) {
                jsonData.collection = {"models" : []};
                jsonData.createRole = this.getCreateRole();

                for (i=0; i<this.collection.size(); i++) {
                    var item = this.collection.at(i);
                    var model = {};
                    model.label = this.getModelLabel(item);
                    model.value = item.get("oid");
                    model.roles = this.getModelRoles(item);

                    // detect selected model
                    if (model.value === this.config.get(this.type.toLowerCase())) {
                        model.selected = true;
                    }
                    jsonData.collection.models.push(model);
                }
            }
            // print template
            var html = this.template(jsonData);
            this.$el.html(html);
            return this;
        }
    });

    return View;
}));
