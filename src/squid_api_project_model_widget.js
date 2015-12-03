(function (root, factory) {
    root.squid_api.view.ProjectModelWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        model : null,

        initialize: function(options) {
            if (options.model) {
                this.model = options.model;
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

        contentView: function(formContent) {
            var me = this;
            this.contentView = Backbone.View.extend({
                initialize: function() {
                    this.bind("ok", this.saveForm);
                },
                saveForm: function () {
                    var error = me.formContent.validate();
                    var isNew = me.model.isNew();
                    if (! error) {
                        var data = me.formContent.getValue();

                        // save model
                        me.model.save(data, {

                        });
                        console.log(data);
                    }
                },
                render: function() {
                    this.$el.html(formContent.render().el);
                    return this;
                }
            });
        },

        render: function() {
            var me = this;

            // create form
            var formContent = new Backbone.Form({
                schema: me.schema,
                model: me.model
            });

            // place the form into a backbone view
            this.contentView(formContent);

            // render modal
            if (! this.collectionModal) {
                this.collectionModal = new Backbone.BootstrapModal({
                    content: new this.contentView(),
                    title: me.typeLabelPlural
                }).open();

                /* bootstrap doesn't remove modal from dom when clicking outside of it.
                Check to make sure it has been removed whenever it isn't displayed.
                */
                $(this.collectionModal.el).one('hidden.bs.modal', function () {
                    me.collectionModal.close();
                    me.collectionModal.remove();
                });
                $(this.collectionModal.el).find(".close").one("click", function() {
                    $(me.collectionModal.el).trigger("hidden.bs.modal");
                });
                $(this.collectionModal.el).find(".cancel").one("click", function() {
                    $(me.collectionModal.el).trigger("hidden.bs.modal");
                });
            }

            return this;
        }

    });

    return View;
}));
