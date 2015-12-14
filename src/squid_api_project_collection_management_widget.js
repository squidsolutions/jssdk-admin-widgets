(function (root, factory) {
    root.squid_api.view.ProjectCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.CollectionManagementWidget.extend({

        typeLabelPlural : "Projects",
        type : "project",
        modelView : null,

        init : function() {
            var me = this;

            this.modelView = squid_api.view.ProjectModelManagementWidget;
            
            // listen for customer change
            squid_api.getCustomer().done(function (customer) {
                me.collection = customer.get("projects");
                me.collection.fetch().always( function() {
                    me.initListeners();
                    me.render();
                });
            });
        }

    });

    return View;
}));
