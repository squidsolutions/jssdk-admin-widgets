(function (root, factory) {
    root.squid_api.view.ModalView = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        internalView : null,
        template : null,
        views : [],
        el : "body",
        fadeAnimation : false,
        header: null,
        footer: null,
        headerTitle: null,

        initialize: function(options) {
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_modal_view;
            }
            if (options.view) {
                this.view = options.view;
            }
            if (options.fadeAnimation) {
                this.fadeAnimation = options.fadeAnimation;
            }
            if (options.header) {
                this.header = options.header;
            }
            if (options.headerTitle) {
                this.headerTitle = options.headerTitle;
            }
            if (options.footer) {
                this.footer = options.footer;
            }
            // output base html
            this.renderBase();
        },

        close: function() {
            this.$el.modal("toggle");
        },

        renderBase: function() {
            var viewData = {
                modalCount : $(".squid-api-modal-view").length,
                fadeAnimation : this.fadeAnimation,
                header: this.header,
                footer: this.footer,
                headerTitle: this.headerTitle
            };
            var html = this.template(viewData);
            // print template
            this.$el.append(html);
            // set el
            this.setElement(this.$el.find(".squid-api-modal-view-" + viewData.modalCount));
        },

        render: function() {
            var me = this;

            // insert template
            if (! this.viewInserted) {
                this.$el.find(".content").html(this.view.el);
                this.viewInserted = true;
            }

            this.$el.modal();
            me.view.render();

            return this;
        }
    });

    return View;
}));
