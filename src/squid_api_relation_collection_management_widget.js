(function (root, factory) {
    root.squid_api.view.RelationCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_relation_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseCollectionManagementWidget.extend({
        type : "Relation",
        typeLabelPlural : "Relations",
        modelView : null,
        template: template,

        additionalEvents: {
            "click .cancel": function() {
                // reset parent view if cancel button clicked
                if (this.resetParentView) {
                    this.resetParentView.call();
                }
            }
        },

        init : function() {
            var me = this;
            this.modelView = squid_api.view.BaseModelManagementWidget;

            // TODO: implement project change listening if used immediately within the app
            squid_api.getSelectedProjectCollection(me.typeLabelPlural.toLowerCase()).done( function(collection) {
                me.collection = collection;
                me.initListeners();
                me.render();
            });
        }
    });

    return View;
}));
