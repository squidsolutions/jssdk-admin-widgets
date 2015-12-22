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

            this.collectionManagementView = new squid_api.view.MetricCollectionManagementWidget();
            
            this.listenTo(this.config,"change:chosenMetrics", this.render);

            // listen for global status change
            this.listenTo(squid_api.model.status,"change:status", this.handleStatus);

        },

        events: squid_api.view.CollectionSelectorUtils.events,

        render: squid_api.view.CollectionSelectorUtils.render,

        showConfiguration: squid_api.view.CollectionSelectorUtils.showConfiguration,

        sort: squid_api.view.CollectionSelectorUtils.sort,

        isChosen : squid_api.view.CollectionSelectorUtils.isChosen

    });

    return View;
}));
