(function (root, factory) {
    root.squid_api.view.ProjectCollectionManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api) {

    var View = squid_api.view.BaseCollectionManagementWidget.extend({
        type : "Project",
        typeLabel : "Project",
        typeLabelPlural : "Projects",
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
        
        render : function() {
            // useful for debugging
            squid_api.view.BaseCollectionManagementWidget.prototype.render.call(this);
        }

    });

    return View;
}));
