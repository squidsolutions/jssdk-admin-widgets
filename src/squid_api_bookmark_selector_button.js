(function (root, factory) {
    root.squid_api.view.BookmarkSelectorButton = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_button_view);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BookmarkCollectionManagementWidget.extend({
        
        render: function() {
            var label = this.typeLabelPlural;
            var jsonData = {
                label : label,
                visible : false,
                collectionLoaded : !this.collectionLoading,
                collection : this.collection,
                typeLabelPlural : this.typeLabelPlural
            };
            if (this.collection) {
                jsonData.visible = true;
                if (this.selectedModel) {
                    if (this.selectedModel.get("oid")) {
                        // always display default label
                    }
                }
            } else {
                jsonData.visible = false;
            }

            this.$el.html(template(jsonData));

            return this;
        }

    });

    return View;
}));
