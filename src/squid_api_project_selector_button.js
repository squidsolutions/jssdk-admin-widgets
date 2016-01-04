(function (root, factory) {
    root.squid_api.view.ProjectSelectorButton = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_button_view);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.ProjectCollectionManagementWidget.extend({
        
        template : template,
        
        render : function() {
            squid_api.view.CollectionSelectorUtils.renderButton.call(this);
        }

    });

    return View;
}));
