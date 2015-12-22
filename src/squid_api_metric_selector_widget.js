(function (root, factory) {
    root.squid_api.view.MetricSelectorView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_metric_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.MetricCollectionWidget.extend({
        template : null,
        metricIdList : null,
        metricIndex: null,

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

            // initialize dimension collection for management view
            this.metricCollection = new squid_api.view.MetricCollectionManagementWidget();

            this.listenTo(this.config,"change:chosenMetrics", this.render);

            // listen for global status change
            this.listenTo(squid_api.model.status,"change:status", this.handleStatus);

        },

        handleStatus: function() {
            var select = this.$el.find("select");
            var multiSelectDropdown = this.$el.find(".multiselect-container");
            if (select) {
                var isMultiple = true;
                if (this.metricIndex !== null) {
                    isMultiple = false;
                }
                var running = (squid_api.model.status.get("status") !== squid_api.model.status.STATUS_DONE);
                if (running) {
                    // computation is running : disable input
                    select.attr("disabled","disabled");
                    if (isMultiple) {
                        select.multiselect('disable');
                        multiSelectDropdown.append("<div class='dropdownDisabled'></div>");
                    }
                } else {
                    // computation is done : enable input
                    select.removeAttr("disabled");
                    if (isMultiple) {
                        select.multiselect('enable');
                        multiSelectDropdown.find(".dropdownDisabled").remove();
                    }
                }
            }
        },

        events: {
            "change": function() {
                var oid = this.$el.find("select option:selected");
                // Remove Button Title Tag
                this.$el.find("button").removeAttr('title');

                var chosenMetrics = this.config.get("chosenMetrics");
                var selectedMetrics = [];

                // build the selection array
                for (i = 0; i < oid.length; i++) {
                    var selectedOid = $(oid[i]).val();
                    selectedMetrics.push(selectedOid);
                }

                // check for additions
                chosenMetricsNew = _.intersection(_.union(chosenMetrics, selectedMetrics), selectedMetrics);

                // Update
                this.config.set({"chosenMetrics" : chosenMetricsNew});
            }
        },

        render: function() {
            if (this.collection) {
                var me = this, isMultiple = true;

                if (this.metricIndex !== null) {
                    isMultiple = false;
                }

                var jsonData = {"selAvailable" : true, "options" : [], "multiple" : isMultiple};
                var selectorJsonData = [];

                // iterate through all domains metrics
                var metrics = this.collection;
                var domain = this.collection.parent;
                var noneSelected = true;
                for (var idx=0; idx<metrics.models.length; idx++) {
                    var metric = metrics.models[idx];

                    // check if selected
                    var selected = me.isChosen(metric);
                    if (selected === true) {
                        noneSelected = false;
                    }
                    
                    var option = {
                            "label" : metric.get("name"), 
                            "value" : metric.get("oid"), 
                            "selected" : selected
                    };
                    
                    jsonData.options.push(option);
                    
                    // check dynamic rules
                    if ((domain.get("dynamic") === true) || (metric.get("dynamic") === false)) {
                        selectorJsonData.push(option);
                    }
                }

                // Alphabetical Sorting
                jsonData.options = me.sortMetrics(jsonData.options);

                // check if empty
                if (jsonData.options.length === 0) {
                    jsonData.empty = true;
                }

                if (!me.$el.html()) {
                    // fist render
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
                    me.selector.multiselect("dataprovider", selectorJsonData);
                    me.showConfiguration();
                }
            }
            return this;
        },

        showConfiguration: function() {
            var me = this;
            squid_api.getSelectedProject().done( function(project) {
                if (project.get("_role") === "WRITE" || project.get("_role") === "OWNER") {

                    // place dimension collection in modal view
                    var dimensionModal = new squid_api.view.ModalView({
                        view : me.metricCollection
                    });

                    me.$el.find("li").first().before("<li class='configure'> configure</option>");
                    me.$el.find("li").first().on("click", function() {
                        // trigger dimension management view
                        dimensionModal.render();
                    });
                }
            });
        },

        sortMetrics: function(metrics) {
            return metrics.sort(function(a, b) {
                var labelA=a.label.toLowerCase(), labelB=b.label.toLowerCase();
                if (labelA < labelB) {
                    return -1;
                }
                if (labelA > labelB) {
                    return 1;
                }
                return 0; // no sorting
            });
        },

        isChosen : function(item) {
            var selected = false;
            var metrics = this.config.get("chosenMetrics");

            if (metrics) {
                for (var j=0; j<metrics.length; j++) {
                    if (item.get("oid") === metrics[j]) {
                        selected = true;
                    }
                }
            }
            return selected;
        }

    });

    return View;
}));
