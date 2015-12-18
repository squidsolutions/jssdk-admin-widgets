(function (root, factory) {
    root.squid_api.view.DomainSelectorButton = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_button_view);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.DomainCollectionManagementWidget.extend({
        
        render: function() {
            var label = this.typeLabelPlural;
            var jsonData = {
                label : label,
                visible : false,
                collectionLoaded : !this.collectionLoading,
                collection : this.collection,
                typeLabelPlural : this.typeLabelPlural
            };
            if (this.collection || this.collectionLoading) {
                jsonData.visible = true;
                if (this.selectedModel) {  
                    if (this.selectedModel.get("oid")) {
                        jsonData.label = this.selectedModel.get("name");
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
