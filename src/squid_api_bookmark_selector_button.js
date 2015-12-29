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

            this.configCompare();

            return this;
        },

        configCompare: function() {
            /* add a class when the current config matches the selected models config */
            if (this.selectedModel) {
                if (JSON.stringify(this.selectedModel.get("config")) === JSON.stringify(_.omit(this.config.toJSON(), "project", "bookmark"))) {
                    this.$el.find("button").addClass("match");
                } else {
                    this.$el.find("button").removeClass("match");
                }
            }
        },

        configChangeCallback: function() {
            this.configCompare();
        }

    });

    return View;
}));
