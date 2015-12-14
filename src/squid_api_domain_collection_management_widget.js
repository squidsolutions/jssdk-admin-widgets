(function (root, factory) {
    root.squid_api.view.DomainCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.CollectionManagementWidget.extend({

        typeLabelPlural : "Domains",
        type : "domain",
        modelView : null,

        init : function() {
            var me = this;
            
            this.modelView = squid_api.view.ProjectModelManagementWidget;
            
            // listen for project change
            this.config.on("change:project", function (config) {
                squid_api.getSelectedProjectCollection("domains").done( function(domains) {
                    me.collection = domains;
                    me.initListeners();
                });            
            });
        }
    
    });

    return View;
}));
