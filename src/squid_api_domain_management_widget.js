(function (root, factory) {
    root.squid_api.view.DomainManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        
        initialize: function(options) {
            this.render();
        },

        render: function() {
            var domainSelect = new api.view.CollectionManagementWidget({
                el : '#domain',
                type : "Domain",
                changeEventHandler : function(value){
                    value = value || null;
                    config.set({
                        "domain" : value
                    });
                },
                domainSuggestionHandler : this.domainSuggestions,
                parent : squid_api.model.project
            });

            return this;
        },
        domainSuggestions: function() {
            var me = this;
            var domainEl = this.formContent.$el.find(".domain-subject");
            var request = $.ajax({
                type: "GET",
                url: squid_api.apiURL + "/projects/" + me.parent.get("id").projectId + "/domains-suggestion",
                dataType: 'json',
                data: {
                    "expression" : domainEl.val(),
                    "offset" : domainEl.prop("selectionStart") + 1,
                    "access_token" : squid_api.model.login.get("accessToken")
                },
                success:function(response) {
                    // remove existing dialog's
                    domainEl.siblings(".suggestions").remove();
                    $(".squid-api-domain-suggestion-dialog").remove();

                    // append box if definitions exist
                    if (response.definitions && response.definitions.length > 0) {

                        var definitions = response.definitions;
                        
                        // store offset
                        var offset = response.filterIndex;

                        // append div
                        domainEl.after("<div class='suggestions squid-api-dialog'><ul></ul></div>");
                        
                        for (i=0; i<definitions.length; i++) {
                            domainEl.siblings(".suggestions").find("ul").append("<li>" + definitions[i] + "</li>");
                        }

                        domainEl.siblings(".suggestions").find("li").on("click", function(event) {
                            var item = $(event.target).html();
                            var str = domainEl.val().substring(0, offset) + item.substring(0);
                            domainEl.focus().val(str);
                        });

                        // show dialog
                        domainEl.siblings(".suggestions").dialog({
                            dialogClass: "squid-api-domain-suggestion-dialog squid-api-dialog",
                            position: { my: "center top", at: "center bottom", of: domainEl },
                            closeText: "close"
                        });
                    } else {
                        // remove existing dialog's
                        domainEl.siblings(".suggestions").remove();
                        $(".squid-api-domain-suggestion-dialog").remove();
                        
                        // set message
                        squid_api.model.status.set("message", response.validateMessage);
                    }

                    domainEl.focus();
                },
                error: function(response, hello) {
                    console.log(response);
                }
            });
        },
    });

    return View;
}));
