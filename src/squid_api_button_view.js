(function (root, factory) {
    root.squid_api.view.ButtonView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_button_view);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        configAttribute : null,
        parent : null,

        initialize: function(options) {
            this.config = squid_api.model.config;
        	if (options.configAttribute) {
                this.configAttribute = options.configAttribute;
            }
            if (options.parent) {
                this.parent = options.parent;
            }
            if (this.parent) {
                this.listenTo(this.config, "change:" + this.parent.toLowerCase(), this.render);
            } else {
                this.render();
            }
            this.listenTo(this.config, "change:" + this.configAttribute.toLowerCase(), this.render);
        },

        render: function() {
            var label = this.configAttribute;
            var jsonData = {
                label : label
            };
        	this.$el.html(template(jsonData));

            return this;
        }
    });

    return View;
}));
