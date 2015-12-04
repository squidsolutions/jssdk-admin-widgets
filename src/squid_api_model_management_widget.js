(function (root, factory) {
    root.squid_api.view.ModelManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        model : null,

        initialize: function(options) {
            if (options.model) {
                this.model = options.model;
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

        // contentView: function(formContent) {
        //     var me = this;
        //     this.contentView = Backbone.View.extend({
        //         initialize: function() {
        //             this.bind("ok", this.saveForm);
        //             this.render();
        //         },
        //         saveForm: function () {
        //             var error = formContent.validate();
        //             var isNew = me.model.isNew();
        //             if (! error) {
        //                 var data = me.formLengthCheck(formContent.getValue());
        //
        //                 // save model
        //                 me.model.save(data, {
        //                     success: function() {
        //                         alert("success");
        //                     },
        //                     error: function() {
        //                         alert("error");
        //                     }
        //                 });
        //             }
        //         },
        //         render: function() {
        //             this.$el.html(formContent.render().el);
        //             return this;
        //         }
        //     });
        // },

        render: function() {
            var me = this;

            // create form
            var formContent = new Backbone.Form({
                schema: me.model.schema,
                model: me.model
            });

            // place the form into a backbone view
            this.$el.html(formContent.render().el);

            return this;
        }

    });

    return View;
}));
