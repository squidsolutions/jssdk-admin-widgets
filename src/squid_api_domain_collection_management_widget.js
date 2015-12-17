(function (root, factory) {
    root.squid_api.view.DomainCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_domain_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseCollectionManagementWidget.extend({

        typeLabelPlural : "Domains",
        type : "domain",
        modelView : null,
        template : template,
        collectionLoading : false,

        init : function() {
            var me = this;

            this.modelView = squid_api.view.BaseModelManagementWidget;
            this.relationView = squid_api.view.RelationCollectionManagementWidget;

            // listen for project/domain change
            var setSelectedModel = function(projectId, domainId) {
                if (projectId && domainId) {
                    // set selected model
                    squid_api.getCustomer().then(function(customer) {
                        customer.get("projects").load(projectId).then(function(project) {
                            project.get("domains").load(domainId).done(function(model) {
                                me.selectedModel = model;
                                me.initListeners();
                            });
                        });
                    });
                } else {
                    me.selectedModel = null;
                    me.initListeners();
                }
            };

            this.config.on("change", function (config) {
                var projectId = config.get("project");
                var domainId = config.get("domain");
                if (config.hasChanged("project")) {
                    // project has changed
                    me.collectionLoading = true;
                    if (projectId) {
                        // set domain collection
                        squid_api.getCustomer().then(function(customer) {
                            customer.get("projects").load(projectId).then(function(project) {
                                project.get("domains").load().done(function(collection) {
                                    me.collectionLoading = false;
                                    me.collection = collection;
                                    setSelectedModel(projectId, domainId);
                                }).fail(function() {
                                    me.collectionLoading = false;
                                    me.render();
                                });
                            });
                        });
                    }
                    me.render();
                } else if (config.hasChanged("domain")) {
                    // domain only has changed
                    setSelectedModel(projectId, domainId);
                }
            });
        },

        additionalEvents: {
            "click .relation": function(event) {
                var me = this;
                var modelValue = $(event.target).parents('tr').attr("data-attr");
                this.renderRelationView(new this.relationView({
                    modelValue : modelValue,
                    cancelCallback : function() {
                        me.render();
                    }
                }));
            }
        },

        renderRelationView: function(relationView) {
            this.$el.html(relationView.el);
        },
        
        getModelLabel: function(model) {
            if (model.get("dynamic")) {
                return "~ " + model.get("name");
            } else {
                return model.get("name");
            }
        }

    });

    return View;
}));
