(function (root, factory) {
    root.squid_api.view.DomainManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        createOnlyView : null,
        config : null,
        domain : new squid_api.model.DomainModel(),
        project : new squid_api.model.ProjectModel(),

        initialize: function(options) {
            this.config = squid_api.model.config;
            if (options) {
                if (options.createOnlyView) {
                    this.createOnlyView = true;
                }
                if (options.options) {
                    this.config = options.config;
                }
            }
            this.listenTo(this.config, "change:domain", this.setDomain);
            this.listenTo(this.config, "change:project", this.setProject);
            this.render();
        },

        setProject : function() {
            var me = this;
            var projectId = this.config.get("project");
            this.project.set({"id" : {"projectId" : projectId}});
            this.project.fetch();
        },

        setDomain : function() {
            var me = this;
            var projectId = this.config.get("project");
            var domainId = this.config.get("domain");
            this.domain.set({"id" : {"projectId" : projectId, "domainId" : domainId}});
            this.domain.fetch({
                error: function(xhr) {
                    squid_api.model.status.set({"error":xhr});
                }
            });
        },

        render: function() {
            var viewOptions = {
                    "el" : this.$el,
                    type : "Domain",
                    "model" : this.domain,
                    "parent" : this.project,
                    suggestionHandler : this.domainSuggestionHandler
            };

            if (this.createOnlyView) {
                viewOptions.successHandler = function(value) {
                    var collection = new squid_api.model.DomainCollection();
                    collection.create(this);
                    var message = me.type + " with name " + this.get("name") + " has been successfully created";
                    squid_api.model.status.set({'message' : message});

                    if (!value) {
                        value = this.get("id").domainId;
                    }
                    squid_api.model.config.set({
                        "domain" : value
                    });
                };
                viewOptions.buttonLabel = "Create a new one";
                viewOptions.createOnlyView = this.createOnlyView;
                var modelView = new squid_api.view.ModelManagementView(viewOptions);
            } else {
                viewOptions.changeEventHandler = function(value){
                    if (!value) {
                        value = this.get("id").domainId;
                    }
                    squid_api.model.config.set({
                        "domain" : value
                    });
                };
                // DomainCollectionManagementWidget
                var collectionView = new squid_api.view.DomainCollectionManagementWidget(viewOptions);
            }

            return this;
        },
        domainSuggestionHandler: function() {
            var me = this;
            var domainEl = this.formContent.$el.find(".suggestion-box");
            var request = $.ajax({
                type: "GET",
                url: squid_api.apiURL + "/projects/" + me.model.get("id").projectId + "/domains-suggestion",
                dataType: 'json',
                data: {
                    "expression" : domainEl.val(),
                    "offset" : domainEl.prop("selectionStart") + 1,
                    "access_token" : squid_api.model.login.get("accessToken")
                },
                success:function(response) {
                    // detemine if there is an error or not
                    if (response.validateMessage.length === 0) {
                        domainEl.removeClass("invalid-expression").addClass("valid-expression");
                    } else {
                        domainEl.removeClass("valid-expression").addClass("invalid-expression");
                    }

                    // append box if definitions exist
                    if (response.definitions && response.definitions.length > 0) {

                        var definitions = response.definitions;

                        // store offset
                        var offset = response.filterIndex;

                        // remove existing dialog's
                        $(".squid-api-pre-domain-suggestions").remove();
                        $(".squid-api-domain-suggestion-dialog").remove();

                        // append div
                        domainEl.after("<div class='squid-api-pre-domain-suggestions squid-api-dialog'><ul></ul></div>");

                        for (i=0; i<definitions.length; i++) {
                            domainEl.siblings(".squid-api-pre-domain-suggestions").find("ul").append("<li>" + definitions[i] + "</li>");
                        }

                        domainEl.siblings(".squid-api-pre-domain-suggestions").find("li").click(me, function(event) {
                            var item = $(event.target).html();
                            var str = domainEl.val().substring(0, offset) + item.substring(0);
                            domainEl.val(str);
                            $(".squid-api-pre-domain-suggestions").dialog("close");
                            me.suggestionHandler.call(me);
                        });

                        // // show dialog
                        domainEl.siblings(".squid-api-pre-domain-suggestions").dialog({
                            open: function(e, ui) {
                                e.preventDefault();
                            },
                            dialogClass: "squid-api-domain-suggestion-dialog squid-api-dialog",
                            position: { my: "center top", at: "center bottom+4", of: domainEl },
                            closeText: "x"
                        });
                    } else {
                        // set message
                        squid_api.model.status.set("message", response.validateMessage);
                    }

                    // place the focus back onto the domain suggestionElement
                    domainEl.focus();
                },
                error: function(response) {
                    squid_api.model.status.set({'message' : response.responseJSON.error});
                }
            });
        },
    });

    return View;
}));
