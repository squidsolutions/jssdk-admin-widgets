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

        formLengthCheck: function(data) {
            for (var x in data) {
                if (data[x].length === 0) {
                    data[x] = null;
                }
            }
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
                var isNew = this.model.isNew();
                if (! error) {
                    var data = this.formLengthCheck(this.formContent.getValue());

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
