(function (root, factory) {
    root.squid_api.view.BookmarkSelectorButton = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_button_view);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BookmarkCollectionManagementWidget.extend({

        init : function() {
            var me = this;
            this.listenTo(this.config,"change", this.renderButtonState);
        },
        
        render: function() {
            var label = this.typeLabelPlural;
            var jsonData = {
                label : label,
                visible : false,
                collectionLoaded : !this.collectionLoading,
                collection : this.collection,
                typeLabel : this.typeLabel,
                typeLabelPlural : this.typeLabelPlural
            };
            if (this.collection) {
                jsonData.visible = true;
            } else {
                jsonData.visible = false;
            }

            this.$el.html(template(jsonData));

            this.renderButtonState();

            return this;
        },

        renderButtonState: function() {
            /* add a class when the current config matches the selected models config */
            if (this.selectedModel) {
                var match = true;
                var selectedModelConfig = this.selectedModel.get("config");
                var currentConfig = _.omit(this.config.toJSON(), "project", "bookmark");
                // ignore the order of the two configurations
                for (var x in currentConfig) {
                    if (JSON.stringify(selectedModelConfig[x]) !== JSON.stringify(currentConfig[x])) {
                        match = false;
                    }
                }
                if (match) {
                    this.$el.find("button").addClass("match");
                } else {
                    this.$el.find("button").removeClass("match");
                }
            }
        }

    });

    return View;
}));
