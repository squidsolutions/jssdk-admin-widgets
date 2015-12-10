(function (root, factory) {
    root.squid_api.view.ProjectModelManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.ModelManagementWidget.extend({
        formEvents: function() {
            // to be overridden from other model management widgets
            
        }
    });

    return View;
}));
