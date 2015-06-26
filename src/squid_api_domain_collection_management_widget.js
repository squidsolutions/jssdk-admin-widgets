(function (root, factory) {
    root.squid_api.view.DomainCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_domain_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.CollectionManagementWidget.extend({

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
            if (options.domainSuggestionHandler) {
                this.domainSuggestionHandler = options.domainSuggestionHandler;
            }
            if (options.projectSchemasCallback) {
                this.projectSchemasCallback = options.projectSchemasCallback;
            }
            if (options.beforeRenderHandler) {
                this.beforeRenderHandler = options.beforeRenderHandler;
            }
            if (options.afterRenderHandler) {
                this.afterRenderHandler = options.afterRenderHandler;
            }
            if (options.renderEl) {
                this.renderEl = options.renderEl;
            }

            // set base then update
            this.collection = new squid_api.model.BaseCollection();
            this.updateCollection();

            this.config.on("change", this.render, this);
            this.collection.on("reset change remove sync", this.render, this);

            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.parent, "change:id", function(parent) {
                me.collectionAvailable = true;
                me.collection.parentId = parent.get("id");
                me.collection.fetch();
            });

            this.relations = new squid_api.model.RelationCollection();

            // fetch relations
            config.on("change:project", function(parent) {
                me.relations.collectionAvailable = true;
                me.relations.parentId = {};
                me.relations.parentId.projectId = parent.get("project");
                me.relations.fetch();
            });

            this.render();
        },

        actionEvents: function(roles) {
            var me = this;

            // select
            $(".squid-api-" + this.type + "-model-widget-popup .select").on("click", function() {
                var value = $(this).parent('tr').attr('data-attr');

                if (me.changeEventHandler) {
                    $(".squid-api-" + this.type + "-model-widget-popup").dialog("close");
                    me.changeEventHandler.call(this, value);
                } else {
                    console.log('no change handler defined');
                }

                // set the selected model
                var models = me.collection.models;
                var model;
                for (i=0; i<models.length; i++) {
                    if (models[i].get("oid") == value) {
                        model = models[i];
                        break;
                    }
                }
                me.model.set(model);
            });

            if (roles.create) {
                 // create base model for create
                var baseModel = new squid_api.model[ this.type + "Model"]();

                // create
                new api.view.ModelManagementView({
                    el : $(".squid-api-" + this.type + "-model-widget-popup .create"),
                    model : baseModel,
                    parent : me.parent,
                    domainSuggestionHandler : me.domainSuggestionHandler,
                    projectSchemasCallback : me.projectSchemasCallback,
                    beforeRenderHandler : me.beforeRenderHandler,
                    buttonLabel : "<i class='fa fa-plus'></i>",
                    successHandler : function() {
                        me.collection.create(this);
                        var message = me.type + " with name " + this.get("name") + " has been successfully created";
                        squid_api.model.status.set({'message' : message});
                    }
                });
            }

            // edit
            $(".squid-api-" + this.type + "-model-widget-popup .edit").on("click", function() {
                var id = this.parentElement.dataset.attr;
                var model = me.collection.get(id);
                new api.view.ModelManagementView({
                    el : $(this),
                    model : model,
                    parent : me.parent,
                    autoOpen : true,
                    domainSuggestionHandler : me.domainSuggestionHandler,
                    projectSchemasCallback : me.projectSchemasCallback,
                    beforeRenderHandler : me.beforeRenderHandler,
                    buttonLabel : "edit",
                    successHandler : function() {
                        var message = me.type + " with name " + this.get("name") + " has been successfully modified";
                        squid_api.model.status.set({'message' : message});
                    }
                });
            });

            // relations
            $(".squid-api-" + this.type + "-model-widget-popup .relation").on("click", function() {
                var relations = me.relations.models;
                var domain = config.get("domain");
                var models = squid_api.utils.getDomainRelations(relations, domain);

                var relationSelect = new api.view.RelationModelManagementView({
                    el : this.el,
                    buttonLabel : "<i class='fa fa-arrows-h'></i>",
                    type : "Relation",
                    modalTitle : "Relation for domain: " + this.domainName,
                    changeEventHandler : function(value){

                    },
                    collection : models,
                    model : new squid_api.model.RelationModel(),
                    parent : this.parent,
                    autoOpen : true,
                    successHandler : function() {
                        var message = me.type + " with name " + this.get("name") + " has been successfully modified";
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
                                var message = me.type + " with name " + collection.get("name") + " has been successfully deleted";
                                squid_api.model.status.set({'message' : message});
                            }
                        });
                    }
                }
            });
        }

    });

    return View;
}));
