(function (root, factory) {
    root.squid_api.view.ProjectSelectorButton = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_button_view);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.ProjectCollectionManagementWidget.extend({
        
        render: function() {
            var label = this.typeLabelPlural;
            var jsonData = {
                label : label,
                visible : true,
                collectionLoaded : !this.collectionLoading,
                collection : this.collection,
                typeLabelPlural : this.typeLabelPlural
            };
            if (this.collection) {
                if (this.selectedModel) {
                    if (this.selectedModel.get("oid")) {
                        jsonData.label = this.selectedModel.get("name");
                    }
                }
            }

            this.$el.html(template(jsonData));

            return this;
        }

    });

    return View;
}));
