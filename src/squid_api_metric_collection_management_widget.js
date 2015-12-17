(function (root, factory) {
    root.squid_api.view.MetricCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_columns_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.ColumnsManagementWidget.extend({
        type : "Metric",
        typeLabelPlural : "Metrics"
    });

    return View;
}));
