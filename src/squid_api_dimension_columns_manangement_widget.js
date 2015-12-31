(function (root, factory) {
    root.squid_api.view.DimensionColumnsManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_columns_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.ColumnsManagementWidget.extend({
        type : "Dimension",
        typeLabelPlural : "Dimensions",

        init : function() {
            this.modelView = squid_api.view.DimensionModelManagementWidget;
        },

        events: {
            "change select" : function(event) {
                var me = this;
                var changeCount = squid_api.view.ColumnsManagementWidget.prototype.eventSelect.call(this, event);

                // update all models at the same time
                if (changeCount > 0) {
                    this.collection.saveAll(this.collection.models).then(function() {
                        // clone and fetch parent to check dynamic status
                        var parentClone = me.collection.parent.clone();
                        parentClone.fetch({
                            success: function (domain) {
                                me.collection.parent.set("dynamic", domain.get("dynamic"));
                            }
                        });

                        // force a filters re-computation because dimension selector uses it
                        me.config.trigger("change:selection");
                    });
                }
            },
            "click .create" : function(event) {
                this.eventCreate(event);
            },
            "click .edit": function(event) {
                this.eventEdit(event);
            },
            "click .delete": function(event) {
                var me = this;
                var model = this.getSelectedModel(event);
                if (confirm("are you sure you want to delete the " + model.definition.toLowerCase() + " '" + model.get("name") + "'?")) {
                    if (true) {
                        model.destroy({
                            wait : true,
                            success:function(model) {
                                // set status
                                var message = model.get("objectType") + " '" + model.get("name") + "' has been successfully deleted";
                                me.status.set({'message' : message});

                                // reset filter selections
                                var selection = $.extend(true, {}, me.config.get("selection"));
                                if (selection) {
                                    var facets = selection.facets;
                                    var period = me.config.get("period");
                                    if (facets) {
                                        var changed = false;
                                        for (var i=0; i<facets.length; i++) {
                                            var facet = facets[i];
                                            // reset period
                                            if (facet.dimension.type === "CONTINUOUS" && facet.dimension.valueType === "DATE") {
                                                if (model.get("oid") == period[domain]) {
                                                    delete period[domain];
                                                    me.config.set("period", period);
                                                }
                                            }
                                            // reset selected facets
                                            if (model.get("oid") == facet.dimension.id.dimensionId) {
                                                facets.splice(i, 1);
                                            }
                                        }
                                        selection.facets = facets;
                                        me.config.set("selection", selection);
                                    }
                                }
                            },
                            error : function(collection, response) {
                                me.status.set({'error' : response});
                            }
                        });
                    }
                }
            }
        }
    });

    return View;
}));
