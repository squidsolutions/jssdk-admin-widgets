(function (root, factory) {
    root.squid_api.view.ProjectManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        
        initialize: function(options) {
            this.render();
        },

        render: function() {
            var projectSelect = new api.view.CollectionManagementWidget({
                el : this.$el,
                type : "Project",
                changeEventHandler : function(value){
                    value = value || null;
                    config.set({
                        "project" : value,
                        "domain" : null
                    });
                },
                model : squid_api.model.project,
                parent : squid_api.model.login
            });

            return this;
        }

    });

    return View;
}));
