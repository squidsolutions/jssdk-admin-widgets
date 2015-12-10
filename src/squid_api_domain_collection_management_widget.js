(function (root, factory) {
    root.squid_api.view.DomainCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.CollectionManagementWidget.extend({

        typeLabelPlural : "Domains",
        type : "domain",
        modelView : squid_api.view.ModelManagementWidget,

        initCollection : function() {
            var me = this;
            // listen for project/domain change

            this.config.on("change:project", function (config) {
                if (config.get("project")) {
                    squid_api.getSelectedProject().always( function(project) {
                        me.collection = project.get("domains");
                        me.initListeners();
                    });
                }
            });
        }

    });

    return View;
}));
