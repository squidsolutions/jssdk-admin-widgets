(function (root, factory) {
    root.squid_api.view.ModalView = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        internalView : null,
        template : null,

        initialize: function(options) {
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_modal_view;
            }
            if (options.internalView) {
                this.internalView = options.internalView;
            }
            // output base html
            this.renderBase();
            // show modal
            this.initializeModal();
            // update view
            this.render(this.internalView);
        },

        renderBase: function() {
            var html = this.template();
            this.$el.html(html);
        },
        initializeModal: function() {
            this.$el.find(".modal").modal();
        },
        render: function(view) {
            // insert template
            this.$el.find(".modal-body").html(view.el);

            return this;
        }
    });

    return View;
}));
