(function (root, factory) {
    root.squid_api.view.ProjectCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseCollectionManagementWidget.extend({

        typeLabelPlural : "Projects",
        type : "project",
        modelView : null,

        init : function() {
            var me = this;

            this.modelView = squid_api.view.ProjectModelManagementWidget;
            
            // set the collection
            me.collectionLoading = true;
            squid_api.getCustomer().then(function(customer) {
                customer.get("projects").load().done(function(collection) {
                        me.collectionLoading = false;
                        me.collection = collection;
                        me.initListeners();
                }).fail(function() {
                    me.collectionLoading = false;
                    me.render();
                });
            });

            me.render();
        }

    });

    return View;
}));
