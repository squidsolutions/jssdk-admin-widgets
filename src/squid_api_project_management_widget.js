(function (root, factory) {
    root.squid_api.view.ProjectManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        createOnlyView : null,

        initialize: function(options) {
            if (options.createOnlyView) {
                this.createOnlyView = true;
            }
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
                    error: function(data) {
                        me.setStatusMessage(data.responseJSON.error);
                    }
                });
            }
        },

        render: function() {
            var viewOptions = {"el" : this.$el, type : "Project", "schemasCallback" : this.getDbSchemas, "model" : squid_api.model.project, "parent" : squid_api.model.login};

            if (this.createOnlyView) {
                viewOptions.successHandler = function() {
                    me.collection.create(this);
                    var message = me.type + " with name " + this.get("name") + " has been successfully created";
                    squid_api.model.status.set({'message' : message});
                };
                viewOptions.buttonLabel = "Create a new one";
                viewOptions.createOnlyView = this.createOnlyView;
                var modelView = new api.view.ModelManagementView(viewOptions);
            } else {
                viewOptions.changeEventHandler = function(value){
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
                };
                var collectionView = new api.view.CollectionManagementWidget(viewOptions);
            }

            return this;
        }

    });

    return View;
}));
