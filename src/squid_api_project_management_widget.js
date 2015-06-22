(function (root, factory) {
    root.squid_api.view.ProjectManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        
        initialize: function(options) {
            this.render();
        },

        getDbSchemas : function() {
            var me = this;
            if (this.model.get("dbSchemas")) {  
                var request = $.ajax({
                    type: "GET",
                    url: squid_api.apiURL + "/projects/" + me.model.get("id").projectId + "/schemas-suggestion?access_token=" + squid_api.model.login.get("accessToken"),
                    dataType: 'json',
                    success:function(collection) {
                        if (me.model.get("dbSchemas").length === 0) {
                            me.setStatusMessage('please set a db schema');
                        }
                        me.schema.dbSchemas.options = collection.definitions;
                        me.formContent.fields.dbSchemas.editor.setOptions(collection.definitions);
                    },
                    error: function() {
                        me.setStatusMessage('error fetching project database schemas');
                    }
                });
            }
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
                projectSchemasCallback : this.getDbSchemas,
                model : squid_api.model.project,
                parent : squid_api.model.login
            });

            return this;
        }

    });

    return View;
}));
