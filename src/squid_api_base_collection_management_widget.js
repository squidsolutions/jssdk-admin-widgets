(function (root, factory) {
    root.squid_api.view.BaseCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_base_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : template,
        collection : null,
        config : null,
        type : null,
        typeLabelPlural : null,
        comparator : null,
        parentType : null,
        modelView : null,

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
                if (options.resetParentView) {
                    this.resetParentView = options.resetParentView;
                }
            }

            this.init();
        },

        initListeners: function() {
            var me = this;
            this.selectedModel = new this.collection.model();
            this.selectedModel.set("id", this.collection.parent.get("id"));
            console.log(this.selectedModel.urlRoot());
            this.listenTo(this.collection, "sync remove", this.render);
            this.listenTo(this.selectedModel, "change", function(model) {
                this.collection.add(model, { merge : true });
                this.render();
            });
            this.listenTo(this.config, "change:" + this.type, this.render);
            this.$el.find("button").html("<span class='glyphicon glyphicon-refresh'></span> fetching " + this.typeLabelPlural);
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
            // select
            "click .select": function(event) {
                var value = $(event.target).parent('tr').attr('data-attr');
                this.config.set(this.type.toLowerCase(), value);
            },
            "click .create": function() {
                var me = this;
                this.selectedModel.clear({"silent" : true});
                this.selectedModel.set({"id": this.collection.parent.get("id")}, {"silent" : true});
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

        getRoles: function() {
            // roles
            var roles = {"create" : false, "edit" : false, "delete" : false, "refresh" : false};
            if (this.collection.parent) {
                var parentRole = this.collection.parent.get("_role");
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
            console.log("render CollectionManagementWidget "+this.type);
            // store models
            if (this.collection) {
                var jsonData = {
                    models : [],
                    roles : this.getRoles(),
                    typeLabelPlural : this.typeLabelPlural,
                    modalHtml : true
                };
                for (i=0; i<this.collection.size(); i++) {
                    var model = {};
                    model.label = this.collection.at(i).get("name");
                    model.value = this.collection.at(i).get("oid");
                    model.roles = this.getRoles();

                    // detect selected model
                    if (model.value === this.config.get(this.type.toLowerCase())) {
                        model.selected = true;
                    }
                    jsonData.models.push(model);
                }

                // print template
                var html = this.template(jsonData);
                this.$el.html(html);
            }

            return this;
        }
    });

    return View;
}));
