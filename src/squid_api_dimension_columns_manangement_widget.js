(function (root, factory) {
    root.squid_api.view.DimensionColumnsManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_columns_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.ColumnsManagementWidget.extend({
        type : "Dimension",
        typeLabel : "Dimension",
        typeLabelPlural : "Dimensions",

        init : function() {
            this.modelView = squid_api.view.DimensionModelManagementWidget;
        },

        onDelete: function(model) {
            // reset filter selections
            var selection = $.extend(true, {}, this.config.get("selection"));
            if (selection) {
                var facets = selection.facets;
                var period = this.config.get("period");
                if (facets) {
                    var changed = false;
                    for (var i=0; i<facets.length; i++) {
                        var facet = facets[i];
                        // reset selected facets
                        if (model.get("oid") == facet.dimension.id.dimensionId) {
                            facets.splice(i, 1);
                        }
                    }
                    selection.facets = facets;
                    this.config.set("selection", selection);
                }
            }
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

                                /* sync config selection with dimension collection */

                                var selection = me.config.get("selection");
                                if (selection) {
                                    var facets = selection.facets;
                                    if (facets) {
                                        for (i=0; i<facets.length; i++) {
                                            for (ix=0; ix<me.collection.size(); ix++) {
                                                var dimension = me.collection.at(ix);
                                                if (dimension) {
                                                    if (dimension.get("oid") == facets[i].dimension.oid) {
                                                        // update dynamic status in config selection
                                                        facets[i].dimension.dynamic = dimension.get("dynamic");
                                                    }
                                                }
                                            }

                                        }
                                        // remove selectedItems from config
                                        for (i=0; i<facets.length; i++) {
                                            if (facets[i].dimension.dynamic && ! domain.get("dynamic") && facets[i].selectedItems.length > 0) {
                                                facets[i].selectedItems = [];
                                            }
                                        }

                                        // reset config silently
                                        me.config.set({"selection" : selection}, {silent : true});
                                    }
                                }

                                // force a filters re-computation
                                me.config.trigger("change:selection");
                            }
                        });
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
                this.eventDelete(event);
            }
        }
    });

    return View;
}));
