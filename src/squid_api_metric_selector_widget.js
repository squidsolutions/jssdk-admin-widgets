(function (root, factory) {
    root.squid_api.view.MetricSelectorView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_metric_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.MetricCollectionWidget.extend({
        template : null,
        chosen : "chosenMetrics",
        selected : "selectedMetrics",

        init: function(options) {

            // setup options
            if (options) {
                if (options.template) {
                    this.template = options.template;
                } else {
                    this.template = template;
                }
                if (options.metricIdList) {
                    this.metricIdList = options.metricIdList;
                }
                if (options.metricIndex !== null) {
                    this.metricIndex = options.metricIndex;
                }
            }

            // setup the models
            if (!this.config) {
                this.config = squid_api.model.config;
            }

            this.collectionManagementView = new squid_api.view.MetricColumnsManagementWidget();
            
            this.listenTo(this.config,"change:chosenMetrics", this.render);

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
            if (this.collection) {
                var me = this, isMultiple = true;

                var jsonData = {"selAvailable" : true, "options" : [], "multiple" : isMultiple};

                // iterate through all domains items
                var items = this.collection;
                var domain = this.collection.parent;
                var noneSelected = true;
                for (var idx=0; idx<items.models.length; idx++) {
                    var item = items.models[idx];

                    // check if selected
                    var selected = me.isChosen(item);
                    if (selected === true) {
                        noneSelected = false;
                    }
                    
                    var option = {
                            "label" : item.get("name"), 
                            "value" : item.get("oid"), 
                            "selected" : selected
                    };
                    
                    // check dynamic rules
                    if ((domain.get("dynamic") === true) || (item.get("dynamic") === false)) {
                        jsonData.options.push(option);
                    }
                }

                // Alphabetical Sorting
                jsonData.options = me.sort(jsonData.options);

                // check if empty
                if (jsonData.options.length === 0) {
                    jsonData.empty = true;
                }

                if ((!me.selector) || (jsonData.options.length === 0)) {
                    // fist render or no data to display
                    var html = me.template(jsonData);
                    me.$el.html(html);
                    me.$el.show();

                    // Initialize plugin
                    me.selector = me.$el.find("select");
                    if (isMultiple) {
                        me.selector.multiselect({
                            "buttonContainer": '<div class="squid-api-data-widgets-metric-selector-open" />',
                            "buttonText": function() {
                                return 'Metrics';
                            },
                            "onDropdownShown": function() {
                                me.showConfiguration();
                            }
                        });
                    }

                    // Remove Button Title Tag
                    me.$el.find("button").removeAttr('title');
                } else {
                    // update render
                    me.selector.multiselect("dataprovider", jsonData.options);
                    me.showConfiguration();
                }
            }
            return this;
        },

        events: squid_api.view.CollectionSelectorUtils.events,

        showConfiguration: squid_api.view.CollectionSelectorUtils.showConfiguration,

        sort: squid_api.view.CollectionSelectorUtils.sort,

        isChosen : squid_api.view.CollectionSelectorUtils.isChosen

    });

    return View;
}));
