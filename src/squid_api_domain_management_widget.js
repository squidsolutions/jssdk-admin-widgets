(function (root, factory) {
    root.squid_api.view.DomainManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        createOnlyView : null,
        config : null,
        domain : new squid_api.model.DomainModel(),
        project : new squid_api.model.ProjectModel(),

        initialize: function(options) {
            this.config = squid_api.model.config;
            if (options) {
                if (options.createOnlyView) {
                    this.createOnlyView = true;
                }
                if (options.options) {
                    this.config = options.config;
                }
            }
            this.listenTo(this.config, "change:domain", this.setDomain);
            this.listenTo(this.config, "change:project", this.setProject);
            this.render();
        },

        setProject : function() {
            var me = this;
            var projectId = this.config.get("project");
            this.project.set({"id" : {"projectId" : projectId}});
            this.project.fetch();
        },

        setDomain : function() {
            var me = this;
            var projectId = this.config.get("project");
            var domainId = this.config.get("domain");
            if (domainId) {
                this.domain.set({"id" : {"projectId" : projectId, "domainId" : domainId}});
                this.domain.fetch({
                    error: function(xhr) {
                        squid_api.model.status.set({"error":xhr});
                    }
                });
            } else {
                this.domain.set({"id" : null});
            }
        },

        render: function() {
            var viewOptions = {
                    "el" : this.$el,
                    type : "Domain",
                    "model" : this.domain,
                    "parent" : this.project
            };

            if (this.createOnlyView) {
                viewOptions.successHandler = function(value) {
                    var collection = new squid_api.model.DomainCollection();
                    collection.create(this);
                    var message = me.type + " with name " + this.get("name") + " has been successfully created";
                    squid_api.model.status.set({'message' : message});

                    if (!value) {
                        value = this.get("id").domainId;
                    }
                    squid_api.model.config.set({
                        "domain" : value
                    });
                };
                viewOptions.buttonLabel = "Create a new one";
                viewOptions.createOnlyView = this.createOnlyView;
                var modelView = new squid_api.view.ModelManagementView(viewOptions);
            } else {
                viewOptions.changeEventHandler = function(value){
                    if (!value) {
                        value = this.get("id").domainId;
                    }
                    squid_api.model.config.set({
                        "domain" : value
                    });
                };
                // DomainCollectionManagementWidget
                var collectionView = new squid_api.view.CollectionManagementWidget(viewOptions);
            }

            return this;
        }
    });

    return View;
}));
