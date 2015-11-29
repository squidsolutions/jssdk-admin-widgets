(function (root, factory) {
    root.squid_api.view.ProjectManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        createOnlyView : null,
        autoOpen : null,

        initialize: function(options) {
            if (options.createOnlyView) {
                this.createOnlyView = true;
            }
            if (options.autoOpen) {
                this.autoOpen = true;
            }
            if (options.config) {
            	this.config = options.config;
            } else {
            	this.config = squid_api.model.config;
            }
            if (options.project) {
            	this.project = options.project;
            } else {
            	this.project = squid_api.model.project;
            }
            if (options.customer) {
            	this.customer = options.customer;
            } else {
            	this.customer = squid_api.model.customer;
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
            } else if (this.formContent) {
                var formData = this.formContent.getValue();
                if (formData.dbUrl.length > 0 && formData.dbUser.length > 0) {
                    $.ajax({
                        type: "GET",
                        url: squid_api.apiURL + "/connections/validate" + "?access_token="+squid_api.model.login.get("accessToken")+"&projectId="+formData.projectId+"&url="+formData.dbUrl+"&username="+ formData.dbUser +"&password=" + encodeURIComponent(formData.dbPassword),
                        dataType: 'json',
                        contentType: 'application/json',
                        success: function (collection) {
                            me.schema.dbSchemas.options = collection.definitions;
                            me.formContent.fields.dbSchemas.editor.setOptions(collection.definitions);
                        },
                        error: function(xhr, textStatus, error){

                        }
                    });
                }
            }
        },

        render: function() {
            var me = this;

            var viewOptions = {
                "el" : this.$el,
                "type" : "Project",
                "model" : this.project,
                "parent" : this.customer,
                "schemasCallback" : this.getDbSchemas,
                "createOnlyView" : this.createOnlyView,
                "autoOpen" : this.autoOpen,
            };

            var successHandler = function(value) {
                if (!value) {
                    value = this.get("id").projectId;
                }
                if (value === me.config.get("project")) {
                    me.config.trigger("change:project", me.config);
                } else {
                    // set domain as null
                    me.config.set({"project" : value, "domain" : null});

                    // unset bookmark which may exist in the config
                    me.config.unset("bookmark");
                    // to prevent passing invalid facets between projects
                    me.config.unset("selection");
                }
                // trigger a customer change
                me.customer.trigger("change");
            };

            /* Creating a new project or managing a collection */
            if (this.createOnlyView) {
                viewOptions.successHandler = successHandler;
                viewOptions.buttonLabel = "Create a new one";
                var modelView = new squid_api.view.ModelManagementView(viewOptions);
            } else {
                viewOptions.changeEventHandler  = successHandler;
                viewOptions.template = squid_api.template.squid_api_project_collection_management_widget;
                var collectionView = new squid_api.view.CollectionManagementWidget(viewOptions);
            }

            return this;
        }

    });

    return View;
}));
