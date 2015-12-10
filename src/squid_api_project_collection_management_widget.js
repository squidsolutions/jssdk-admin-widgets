(function (root, factory) {
    root.squid_api.view.ProjectCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.CollectionManagementWidget.extend({

        typeLabelPlural : "Projects",
        type : "project",
        modelView : null,

        initCollection : function() {
            var me = this;

            // listen for project/domain change
            squid_api.model.customer.on("change", function () {
                me.collection = squid_api.model.customer.get("projects");
                me.initListeners();
            });
        },

        initModelView: function() {
            this.modelView = squid_api.view.ProjectModelManagementWidget;
        }

    });

    return View;
}));
