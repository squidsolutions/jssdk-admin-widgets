(function (root, factory) {
    root.squid_api.view.ProjectModelWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.ModelManagementWidget.extend({

        contentView: function(formContent) {
            var me = this;
            this.contentView = Backbone.View.extend({
                initialize: function() {
                    this.bind("ok", this.saveForm);
                },
                saveForm: function () {
                    var error = formContent.validate();
                    var isNew = me.model.isNew();
                    if (! error) {
                        var data = me.formLengthCheck(formContent.getValue());

                        // me.model.schema[x].template = _.template('\
                        //             <div>\
                        //               <label for="<%= editorId %>">\
                        //                 <% if (titleHTML){ %><%= titleHTML %>\
                        //                 <% } else { %><%- title %><% } %>\
                        //               </label>\
                        //               <div>\
                        //                 <span data-editor></span>\
                        //                 <div class="error-text" data-error></div>\
                        //                 <div class="error-help"><%= help %></div>\
                        //               </div>\
                        //               <div>\
                        //                   <button class="btn btn-default" id="btn-check" type="button"><span class="glyphicon glyphicon-refresh"></span>' + checkConnectionText + '</button>\
                        //               </div>\
                        //             </div>\
                        //           ', null, null);

                        if (isNew) {
                            data.id.projectId = null;
                        }

                        // save model
                        me.model.save(data, {
                            success: function() {
                                alert("success");
                            },
                            error: function() {
                                alert("error");
                            }
                        });
                    }
                },
                render: function() {
                    this.$el.html(formContent.render().el);
                    return this;
                }
            });
        }

    });

    return View;
}));
