(function (root, factory) {
    root.squid_api.view.RelationCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_columns_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.CollectionManagementWidget.extend({
        type : "Relation",
        typeLabelPlural : "Relations",

        init : function() {
            var me = this;
            this.modelView = squid_api.view.ModelManagementWidget;

            // listen for domain change
            this.config.on("change:domain", function (config) {
                if (config.get("domain")) {
                    squid_api.getSelectedDomainCollection(me.typeLabelPlural.toLowerCase()).done( function(collection) {
                        me.collection = collection;
                        me.initListeners();
                    });
                }
            });
        }
    });

    return View;
}));
