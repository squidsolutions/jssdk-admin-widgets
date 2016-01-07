(function (root, factory) {
    root.squid_api.view.ProjectCreatorButton = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_button_view);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.ProjectCollectionManagementWidget.extend({

        init : function() {
            var me = this;
            this.listenTo(this.config,"change", this.configCompare);
        },

        render: function() {
            var label = this.typeLabelPlural;
            var jsonData = {
                label : "Create a new one",
                visible : this.getCreateRole(),
                collectionLoaded : !this.collectionLoading,
                collection : this.collection,
                typeLabelPlural : this.typeLabelPlural
            };

            this.$el.html(template(jsonData));

            return this;
        }

    });

    return View;
}));
