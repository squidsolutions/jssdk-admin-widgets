(function (root, factory) {
    root.squid_api.view.DomainCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.CollectionManagementWidget.extend({

        typeLabelPlural : "Domains",
        type : "domain",
        modelView : null,

        init : function() {
            var me = this;

            this.modelView = squid_api.view.BaseModelManagementWidget;

            // listen for project change
            this.config.on("change:project", function (config) {
                me.collection = null;
                me.render();
                squid_api.getSelectedProjectCollection("domains").done( function(domains) {
                    me.collection = domains;
                    me.initListeners();
                });
            });
        },
        render: function() {
            console.log("render CollectionManagementWidget "+this.type);
            // store models
            if (this.collection) {
                var jsonData = {
                    models : [],
                    roles : this.getRoles(),
                    typeLabelPlural : this.typeLabelPlural,
                    modalHtml : true
                };
                for (i=0; i<this.collection.size(); i++) {
                    var model = {};
                    model.label = this.collection.at(i).get("name");
                    model.value = this.collection.at(i).get("oid");
                    model.roles = this.getRoles();

                    if (this.collection.at(i).get("dynamic")) {
                        model.label = "~ " + model.label;
                    }

                    // detect selected model
                    if (model.value === this.config.get(this.type.toLowerCase())) {
                        model.selected = true;
                    }
                    jsonData.models.push(model);
                }

                // print template
                var html = this.template(jsonData);
                this.$el.html(html);
            }

            return this;
        }

    });

    return View;
}));
