(function (root, factory) {
    root.squid_api.view.DimensionSelector = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_dimension_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        filters: null,
        chosen : "chosenDimensions",
        selected : "selectedDimensions",

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }

            if (options.filters) {
                this.filters = options.filters;
            } else {
                this.filters = squid_api.model.filters;
            }

            if (options.dimensionIdList) {
                this.dimensionIdList = options.dimensionIdList;
            }
            if (options.dimensionIndex !== null) {
                this.dimensionIndex = options.dimensionIndex;
            }
            if (this.config) {
                this.config = options.model;
            } else {
            	this.config = squid_api.model.config;
            }
            if (this.status) {
            	this.status = options.status;
            } else {
            	this.status = squid_api.model.status;
            }

            // listen for selection change as we use it to get dimensions
            me.listenTo(this.filters,"change:selection", this.render);

            // initilize dimension collection for management view
            this.collectionManagementView = new squid_api.view.DimensionColumnsManagementWidget();

            // listen for global status change
            this.listenTo(this.status,"change:status", this.enable);
        },

        enable: function() {
            if (this.status.get("status") == "RUNNING") {
                this.$el.find("button").prop("disabled", true);
            } else {
                this.$el.find("button").prop("disabled", false);
            }
        },

        render: function() {
            var me = this;

            if ((this.config.get("project")) && (this.config.get("domain"))) {
                var isMultiple = true;

                var jsonData = {"selAvailable" : true, "options" : [], "multiple" : isMultiple};

                // iterate through all filter facets
                var selection = me.filters.get("selection");
                if (selection) {
                    var facets = selection.facets;
                    if (facets) {
                        me.dimensions = [];
                        for (var i=0; i<facets.length; i++){
                            var facet = facets[i];
                            var isBoolean = false;
                            if (facet.dimension.type === "SEGMENTS") {
                                isBoolean = true;
                            }
                            if (facet.items) {
                                if ((facet.items.length === 1) && (facet.items[0].value === "true")) {
                                    isBoolean = true;
                                }
                            }
                            // do not display boolean dimensions
                            if (!isBoolean) {
                                if (me.dimensionIdList) {
                                    // insert and sort
                                    var idx = me.dimensionIdList.indexOf(facet.dimension.oid);
                                    if (idx >= 0) {
                                        me.dimensions[idx] = facet;
                                    }
                                } else {
                                    // default unordered behavior
                                    me.dimensions.push(facet);
                                }
                            }
                            // avoid holes
                            if (!me.dimensions[i]) {
                                me.dimensions[i] = null;
                            }
                        }
                        var noneSelected = true;
                        for (var dimIdx=0; dimIdx<me.dimensions.length; dimIdx++) {
                            var facet1 = me.dimensions[dimIdx];
                            if (facet1) {
                                // check if selected
                                var selected = me.isChosen(facet1);
                                if (selected === true) {
                                    noneSelected = false;
                                }
                                // add to the list
                                var name;
                                if (facet1.name) {
                                    name = facet1.name;
                                } else {
                                    name = facet1.dimension.name;
                                }
                                var option = {"label" : name, "value" : facet1.id, "selected" : selected, "error" : me.dimensions[dimIdx].error};
                                jsonData.options.push(option);
                            }
                        }
                    }


                    jsonData.options = me.sort(jsonData.options);

                    // check if empty
                    if (jsonData.options.length === 0) {
                        jsonData.empty = true;
                    }

                    var html = me.template(jsonData);
                    me.$el.html(html);
                    me.$el.show();

                    // Initialize plugin
                    me.selector = me.$el.find("select");

                    me.selector.multiselect({
                        buttonContainer: '<div class="squid-api-data-widgets-dimension-selector" />',
                        buttonText: function() {
                            return 'Dimensions';
                        },
                        onDropdownShown: function() {
                            me.showConfiguration();
                        }
                    });

                    // Remove Button Title Tag
                    me.$el.find("button").removeAttr('title');
                }
            }
            return this;
        },

        events: squid_api.view.CollectionSelectorUtils.events,

        showConfiguration: squid_api.view.CollectionSelectorUtils.showConfiguration,

        sort: squid_api.view.CollectionSelectorUtils.sort,

        isChosen : function(facet) {
            var selected = false;

            var dimensions = this.config.get("chosenDimensions");

            if (dimensions) {
                for (var j=0; j<dimensions.length; j++) {
                    if (facet.id === dimensions[j]) {
                        selected = true;
                    }
                }
            }
            return selected;
        }

    });

    return View;
}));
