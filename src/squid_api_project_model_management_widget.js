(function (root, factory) {
    root.squid_api.view.ProjectModelManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseModelManagementWidget.extend({
        formEvents: function() {
            // to be overridden from other model management widgets
        },
        customDataManipulation: function(data) {
            if (data.dbCheckConnection) {
                delete data.dbCheckConnection;
            }
            return data;
        },
        onceSaved: function(model) {
            // once the form is successfully saved, set the current project as the active one
            if (this.setConfigOnSave) {
                if (model.get("id")) {
                    if (this.$el.parents(".squid-api-modal-view")) {
                        this.$el.parents(".squid-api-modal-view").modal("hide");
                    }
                    this.config.set("project", model.get("id").projectId);
                }
            }
        }
    });

    return View;
}));
