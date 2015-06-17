(function (root, factory) {
    root.squid_api.view.DomainManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        
        initialize: function(options) {
            this.render();
        },

        render: function() {
            var domainSelect = new api.view.CollectionManagementWidget({
                el : '#domain',
                type : "Domain",
                changeEventHandler : function(value){
                    value = value || null;
                    config.set({
                        "domain" : value
                    });
                },
                parent : squid_api.model.project
            });

            return this;
        }

    });

    return View;
}));
