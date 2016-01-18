(function (root, factory) {
    root.squid_api.view.BaseCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_base_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : template,
        collection : null,
        selectedModel : null,
        config : null,
        type : null,
        typeLabel : null,
        typeLabelPlural : null,
        configSelectedId : null,
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
                var parentChanged = config.hasChanged(me.configParentId);
                var selectionChanged = config.hasChanged(me.configSelectedId);

                if (me.configParentId) {
                    if (parentChanged) {
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
                                me.listenTo(me.collection, "sync remove add", me.render);
                                me.collectionLoading = false;
                                if (selectionChanged) {
                                    // selected also changed
                                    me.setSelectedModel(selectedId);
                                } else {
                                    me.render();
                                }
                            }).fail(function() {
                                me.collection = null;
                                me.collectionLoading = false;
                                me.setSelectedModel(null);
                            });
                        }
                    } else if (selectionChanged) {
                        // selection only has changed
                        me.setSelectedModel(selectedId);
                    }
                } else if (selectionChanged) {
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
                        me.listenTo(me.collection, "sync remove add", me.render);
                        me.collectionLoading = false;
                        me.setSelectedModel(selectedId);
                    }).fail(function() {
                        me.collection = null;
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
                me.collection.load(modelId).done(function(model) {
                    me.selectedModel = model;
                    me.render();
                    me.listenTo(me.selectedModel, "change", me.render);
                }).fail(function() {
                    me.render();
                });
            } else {
                me.selectedModel = null;
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
            var va;
            var vb;
            if (a.name && b.name) {
                va = a.name.toLowerCase();
                vb = b.name.toLowerCase();
            } else if (a.label && b.label) {
                va = a.label.toLowerCase();
                vb = b.label.toLowerCase();
            }
            if (va < vb) {
                return -1;
            }
            if (va > vb) {
                return 1;
            }
            return 0;
        },

        dynamicComparator : function(a,b) {
            var da = a.dynamic;
            var db = b.dynamic;
            return (da === db) ? 0 : da ? 1 : -1;
        },

        getSelectedModel : function(event) {
            var id = $(event.target).parents('tr').data("attr");
            var model = this.collection.get(id);
            return model;
        },

        eventSelect :  function(event) {
            var model = this.getSelectedModel(event);
            this.config.set(this.configSelectedId, model.get("oid"));
            if (this.onSelect) {
                this.onSelect.call();
            }
        },

        eventCreate : function() {
            var me = this;
            // create a new model
            var model = new this.collection.model();
            model.set("id", this.collection.parent.get("id"));
            
            this.renderModelView(new this.modelView({
                model : model,
                cancelCallback : function() {
                    me.render();
                },
                onSave : function(model) {
                    me.collection.add(model);
                    // call any super onSave
                    me.modelView.prototype.onSave.call(me, model);
                    me.render();
                }
            }));
        },

        eventRefresh : function(event) {
            var me = this;
            var model = this.getSelectedModel(event);
            var objectType = model.get("objectType");
            var url = squid_api.apiURL + "/projects/" + model.get("id").projectId;
            if (objectType === "Project") {
                url = url + "/refreshDatabase";
            } else if (objectType === "Domain") {
                url = url + "/domains/" + model.get("id").domainId + "/cache/refresh";
            }
            url = url + "?access_token=" + squid_api.model.login.get("accessToken");
            if (model) {
                var request = $.ajax({
                    type: "GET",
                    url: url,
                    dataType: 'json',
                    contentType: 'application/json'
                });
                request.done(function () {
                    squid_api.model.status.set("message", objectType + " successfully refreshed");
                });
                request.fail(function () {
                    squid_api.model.status.set("message", objectType + " refresh failed");
                    squid_api.model.status.set("error", "error");
                });
            }
        },

        eventEdit : function(event) {
            var me = this;
            var model = this.getSelectedModel(event);
            // listen for model changes (TODO check this code)
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

        eventDelete : function(event) {
            var me = this;
            var model = this.getSelectedModel(event);
            if (confirm("are you sure you want to delete the " + model.definition.toLowerCase() + " '" + model.get("name") + "'?")) {
                if (true) {
                    model.destroy({
                        wait : true,
                        success:function(model) {
                            // set status
                            var message = model.get("objectType") + " '" + model.get("name") + "' has been successfully deleted";
                            me.status.set({'message' : message});

                            // call once saved
                            if (me.onDelete) {
                                me.onDelete(model);
                            }
                        },
                        error : function(collection, response) {
                            me.status.set({'error' : response});
                        }
                    });
                }
            }
        },

        eventMouseEnter : function(event) {
            // hide all (as sometimes when moving fast, some may still be visible)
            var elements = [$(event.target).parent('tr').find(".collection-option i"), $(event.target).parent('tr').find(".collection-option svg")];
            for (i=0; i<elements.length; i++) {
                elements[i].show();
            }
        },

        eventMouseLeave : function(event) {
            var elements = [$(event.target).parent('tr').parent().find(".collection-option i"), $(event.target).parent('tr').parent().find(".collection-option svg")];
            for (i=0; i<elements.length; i++) {
                elements[i].hide();
            }
        },

        events: {
            'mouseenter tr': function(event) {
                this.eventMouseEnter(event);
            },
            'mouseleave tr': function(event) {
                this.eventMouseLeave(event);
            },
            "click .create" : function(event) {
                this.eventCreate(event);
            },
            "click .edit": function(event) {
                this.eventEdit(event);
            },
            "click .refresh": function(event) {
                this.eventRefresh(event);
            },
            "click .delete": function(event) {
                this.eventDelete(event);
            },
            "click .select": function(event) {
                this.eventSelect(event);
            }
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

        onDelete: function(model) {
            // to be overridden from other collection management widgets
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
            // focus on first element
            this.$el.find('input[type=text],textarea,select').filter(":visible:first").focus();
        },

        render: function() {
            console.log("render CollectionManagementWidget "+this.type);
            var jsonData = {
                collectionLoaded : !this.collectionLoading,
                collection : this.collection,
                roles : null,
                createRole : null,
                typeLabel : this.typeLabel,
                typeLabelPlural : this.typeLabelPlural,
                modalHtml : true
            };
            if (this.collection) {
                var models = [];
                jsonData.collection = {};
                jsonData.createRole = this.getCreateRole();

                // store model data
                for (i=0; i<this.collection.size(); i++) {
                    var item = this.collection.at(i);
                    var model = {};
                    model.label = this.getModelLabel(item);
                    model.value = item.get("oid");
                    model.roles = this.getModelRoles(item);
                    model.dynamic = item.get("dynamic");
                    models.push(model);
                }

                // sort model data
                models.sort(this.comparator);

                // place currently selected model at the top of the list
                for (i=0; i<models.length; i++) {
                    var collectionModel = models[i];
                    if (models[i].value === this.config.get(this.configSelectedId)) {
                        collectionModel.selected = true;
                        // remove model from previous position
                        models.splice(i, 1);
                        // place selected model at the start of the array
                        models.unshift(collectionModel);
                    }
                }
                // store model view data
                jsonData.collection.models = models;
            }
            var html = this.template(jsonData);
            this.$el.html(html);

            return this;
        }
    });

    return View;
}));
