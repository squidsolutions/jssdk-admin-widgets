(function (root, factory) {
    root.squid_api.view.ColumnsModelManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_model_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseModelManagementWidget.extend({

        customDataManipulation: function(data) {
            if (data.type.length === 0) {
                data.type = "INDEX";
            } else {
                data.type = data.type[0];
            }
            return data;
        },

        onSave: function(model) {
            // to be overridden from other model management widgets
            console.log("once saved");
        },

        formEvents: function() {
            // to be overridden from other model management widgets
        }

    });

    return View;
}));
