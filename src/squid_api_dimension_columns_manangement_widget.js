(function (root, factory) {
    root.squid_api.view.DimensionColumnsManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_columns_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.ColumnsManagementWidget.extend({
        type : "Dimension",
        typeLabelPlural : "Dimensions"
    });

    return View;
}));
