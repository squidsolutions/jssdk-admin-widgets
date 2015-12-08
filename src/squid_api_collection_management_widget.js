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
            if (options.modelView) {
                this.modelView = options.modelView;
            }
            if (options.setCollectionParent) {
                this.setCollectionParent = options.setCollectionParent;
            }
            if (options.setParentModel) {
                this.setParentModel = options.setParentModel;
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

            this.setParent();

            // once the parent role changes, initialize the collection
            if (this.parent) {
                this.listenTo(this.config, "change:"+this.parent.toLowerCase(), function() {
                    me.initParent();
                    me.initCollection();
                });
            } else {
                this.listenTo(squid_api.model.login, "change", function() {
                    me.initParent();
                    me.initCollection();
                });
            }

            this.listenTo(this.parentModel, "change:_role", this.render);

            this.selectedModel = new squid_api.model[this.type + "Model"]();
            this.listenTo(this.selectedModel, "change", function(model) {
                this.collection.add(model, { merge : true });
            });

            this.listenTo(this.config, "change:" + this.type.toLowerCase(), this.render);
        },

        setParent: function() {
            if (this.parent) {
                // match a base model
                for (var modelItem in squid_api.model) {
                    var str = modelItem;
                    var res = str.match(this.parent + "Model");
                    if (res) {
                        this.parentModel = new squid_api.model[res]();
                    }
                }
            } else {
                this.parentModel = squid_api.model.login;
            }
        },

        initParent: function() {
            var me = this;
            if (this.parent) {
                // set & fetch collection
                if (this.setParentModel) {
                    this.setParentModel.call(this);
                }
                // fetch model
                this.parentModel.fetch({
                    error: function(xhr) {
                        me.status.set("error", xhr);
                    }
                });
            }
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
                this.collection.on("sync change add remove", this.render, this);

                // set & fetch collection
                if (this.setCollectionParent) {
                    this.setCollectionParent.call(this);
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
            // select
            "click .select": function(event) {
                var value = $(event.target).parent('tr').attr('data-attr');
                this.config.set(this.type.toLowerCase(), value);
            },
            "click .create": function() {
                var me = this;
                this.selectedModel.clear({"silent" : true});
                this.renderModelView(new this.modelView({
                    model : this.selectedModel,
                    resetParentView : function() {
                        me.render();
                    }
                }));
            },
            "click .edit": function(event) {
                var me = this;
                var id = $(event.target).parents('tr').attr("data-attr");
                var model = this.collection.get(id);
                this.selectedModel.set(model.attributes, {"silent" : true});
                this.renderModelView(new this.modelView({
                    model : this.selectedModel,
                    resetParentView : function() {
                        me.render();
                    }
                }));
            },
            "click .refresh": function(event) {
                var id = $(event.target).parents('tr').attr("data-attr");
                var model = this.collection.get(id);
                squid_api.refreshObjectType(model);
            },
            "click .delete": function(event) {
                var id = $(event.target).parents('tr').attr("data-attr");
                var model = this.collection.get(id);
                if (confirm("are you sure you want to delete the " + model.definition.toLowerCase() + " " + model.get("name") + "?")) {
                    if (true) {
                        model.destroy({
                            wait : true,
                            success:function(model) {
                                // set status
                                var message = me.type + " with name " + model.get("name") + " has been successfully deleted";
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

        getRoles: function() {
            // roles
            var roles = {"create" : false, "edit" : false, "delete" : false, "refresh" : false};
            if (this.parentModel) {
                var parentRole = this.parentModel.get("_role");
                // write role
                if (parentRole == "OWNER" || parentRole == "WRITE") {
                    roles.create = true;
                    roles.edit = true;
                    roles.delete = true;
                }
            }
            return roles;

        },

        renderModelView: function(modelView) {
            this.$el.html(modelView.el);
        },

        render: function() {
            var jsonData = {
                models : [],
                roles : this.getRoles(),
                typeLabelPlural : this.typeLabelPlural,
                modalHtml : true
            };
            // store models
            if (this.collection) {
                for (i=0; i<this.collection.models.length; i++) {
                    var model = {};
                    model.label = this.collection.models[i].get("name");
                    model.value = this.collection.models[i].get("oid");
                    model.roles = this.getRoles();

                    // detect selected model
                    if (model.value == this.config.get(this.type.toLowerCase())) {
                        model.selected = true;
                    }
                    jsonData.models.push(model);
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
