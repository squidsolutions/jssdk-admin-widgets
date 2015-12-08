(function (root, factory) {
    root.squid_api.view.ModelManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_model_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        model : null,
        collectionPluralLabel : null,

        initialize: function(options) {
            this.status = squid_api.model.status;

            if (options.model) {
                this.model = options.model;
            }
            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            if (options.resetParentView) {
                this.resetParentView = options.resetParentView;
            }
            this.render();
        },

        dataManipulation: function(data) {
            for (var x in data) {
                if (typeof(data[x]) == "object") {
                    for (var y in data[x]) {
                        if (data[x][y] !== null) {
                            if (data[x][y].length === 0) {
                                data[x][y] = null;
                            }
                        }
                    }
                } else if (data[x].length === 0) {
                    data[x] = null;
                }
            }
            if (this.model.isNew()) {
                data.id[this.model.definition.toLowerCase() + "Id"] = null;
            }
            return data;
        },

        customDataManipulation: function(data) {
            return data;
        },

        events: {
            "click .btn-cancel": function() {
                // add handler
                if (this.resetParentView) {
                    this.resetParentView.call();
                }
            },
            "click .btn-save-form" : function() {
                var me = this;
                var error = this.formContent.validate();
                if (! error) {
                    // global data manipulation
                    var data = this.dataManipulation(this.formContent.getValue());

                    // for any custom model manipulation before save
                    data = this.customDataManipulation(data);

                    // save model
                    this.model.save(data, {
                        wait: true,
                        success: function() {
                            // status update
                            if (me.resetParentView) {
                                me.resetParentView.call();
                            }
                            me.status.set("message", "Sucessfully saved");
                        },
                        error: function(xhr) {
                            me.status.set("error", xhr);
                        }
                    });
                }
            }
        },

        render: function() {
            var me = this;
            var jsonData = {};

            if (this.model.isNew()) {
                jsonData.headerLabel = "Creating a new " + this.model.definition.toLowerCase();
            } else {
                jsonData.headerLabel = "Editing " + this.model.definition.toLowerCase() + " with name '" + this.model.get("name") + "'";
            }

            // create form
            this.formContent = new Backbone.Form({
                schema: me.model.schema,
                model: me.model
            }).render();

            // append save buttons
            this.$el.html(this.template(jsonData));

            // place the form into a backbone view
            this.$el.find(".modal-body").html(this.formContent.el);

            return this;
        }

    });

    return View;
}));
