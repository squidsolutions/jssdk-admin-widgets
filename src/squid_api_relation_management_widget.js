(function (root, factory) {
    root.squid_api.view.RelationManagementView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_relation_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.CollectionManagementWidget.extend({

        viewData: function() {
            var models = squid_api.utils.getDomainRelations(this.collection.models, squid_api.model.config.get("domain"));
            var arr = [];
            for (i=0; i<models.length; i++) {
                var obj = {};
                obj.oid = models[i].get("oid");
                obj.leftName = models[i].get("leftName");
                obj.rightName = models[i].get("rightName");

                // set cardinality booleans for handlebar display
                var leftCardinality = models[i].get("leftCardinality");
                var rightCardinality = models[i].get("rightCardinality");
                if (leftCardinality == "MANY") {
                    obj.leftMany = true;
                } else if (leftCardinality == "ZERO_OR_ONE") {
                    obj.leftZeroOrOne = true;
                } else if (leftCardinality == "ONE") {
                    obj.leftOne = true;
                }
                if (rightCardinality == "MANY") {
                    obj.rightMany = true;
                } else if (rightCardinality == "ZERO_OR_ONE") {
                    obj.rightZeroOrOne = true;
                } else if (rightCardinality == "ONE") {
                    obj.rightOne = true;
                }
                arr.push(obj);
            }

            return arr;
        },

        render : function() {
            var me = this;
            var jsonData = {"models" : this.viewData()};
            this.$el.html(template(jsonData));
            return this;
        }
    });

    return View;
}));
