(function (root, factory) {
    root.squid_api.view.ButtonView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_button_view);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        model : null,

        initialize: function(options) {
            this.config = squid_api.model.config;
        	if (options.model) {
                this.model = options.model;
            }
            this.listenTo(this.config, "change:" + this.model, this.render);
            this.render();
        },

        render: function() {
            var configValue = this.config.get(this.model);
            var jsonData = {
                value : this.model
            };
            if (configValue) {
                jsonData.value = configValue;
            }
        	this.$el.html(template(jsonData));

            return this;
        }
    });

    return View;
}));
