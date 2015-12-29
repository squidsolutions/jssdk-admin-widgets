(function (root, factory) {
    root.squid_api.view.ProjectCollectionManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api) {

    var View = squid_api.view.BaseCollectionManagementWidget.extend({

        typeLabelPlural : "Projects",
        type : "project",
        modelView : null,
        configSelectedId : "project",
        configParentId : "customer",

        init : function() {
            var me = this;
            this.modelView = squid_api.view.ProjectModelManagementWidget;
            me.render();
        },
        
        loadCollection : function() {
            return squid_api.getCustomer().then(function(customer) {
                return customer.get("projects").load();
            });
        },

    });

    return View;
}));
