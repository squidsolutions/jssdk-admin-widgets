(function (root, factory) {
    root.squid_api.view.MetricCollectionWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_columns_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseCollectionManagementWidget.extend({
        configParentId : "domain",
        
        loadCollection : function(parentId) {
            var me = this;
            return squid_api.getCustomer().then(function(customer) {
                return customer.get("projects").load(me.config.get("project")).then(function(project) {
                    return project.get("domains").load(parentId).then(function(domain) {
                        // listen to parent in case "dynamic" changes
                        me.listenTo(domain, "change:dynamic", me.render);
                        return domain.get("metrics").load();
                    });
                });
            });
        }
    });

    return View;
}));
