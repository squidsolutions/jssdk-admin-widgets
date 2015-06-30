(function (root, factory) {
    root.squid_api.view.ProjectManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        
        config : null,
        projectSelect : null,
        
        initialize: function(options) {
            if (options) {
                if (options.config) {
                    this.config = options.config;
                }
            }
            if (!this.config) {
                this.config = squid_api.model.config;
            }
            this.listenTo(this.config, "change:project", this.render);
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
            var me = this;
            
            // get the project;
            var project;
            project = new squid_api.model.ProjectModel();
            
            if (!me.projectSelect) {
                me.projectSelect = new api.view.CollectionManagementWidget({
                    el : me.$el,
                    type : "Project",
                    changeEventHandler : function(value){
                        value = value || null;
                        config.set({
                            "project" : value,
                            "domain" : null,
                            "selection" : null,
                            "chosenDimensions" : null,
                            "selectedDimension" : null,
                            "chosenMetrics" : null,
                            "selectedMetric" : null
                        });
                    },
                    projectSchemasCallback : me.getDbSchemas,
                    parent : squid_api.model.login,
                    model : project
                });
            } else {
                me.projectSelect.setModel(project);
            }
            
            var projectOid = me.config.get("project");
            if (projectOid) {
                project.set("id", {
                    projectId : projectOid
                });
                project.fetch();
            }

            return this;
        }

    });

    return View;
}));
