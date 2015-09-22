(function (root, factory) {
    root.squid_api.view.RelationModelManagementView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_relation_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.ModelManagementView.extend({

        successHandler: null,
        errorHandler: null,
        modalElementClassName : "squid-api-admin-widgets-modal-form",
        buttonLabel : null,
        autoOpen: null,
        parent: null,
        suggestionHandler : null,
        schemasCallback : null,
        beforeRenderHandler : null,
        modalTitle : null,
        collection : null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            if (options.successHandler) {
                this.successHandler = options.successHandler;
            }
            if (options.errorHandler) {
                this.errorHandler = options.errorHandler;
            }
            if (options.buttonLabel) {
                this.buttonLabel = options.buttonLabel;
            }
            if (options.autoOpen) {
                this.autoOpen = options.autoOpen;
            }
            if (options.parent) {
                this.parent = options.parent;
            }
            if (options.suggestionHandler) {
                this.suggestionHandler = options.suggestionHandler;
            }
            if (options.schemasCallback) {
                this.schemasCallback = options.schemasCallback;
            }
            if (options.beforeRenderHandler) {
                this.beforeRenderHandler = options.beforeRenderHandler;
            }
            if (options.modalTitle) {
                this.modalTitle = options.modalTitle;
            }
            if (options.createOnlyView) {
                this.createOnlyView = options.createOnlyView;
            }

            // Set Form Schema
            this.setSchema();

            if (this.collection) {
                this.collection.on("reset change remove sync", this.updateForm, this);
            }
            if (this.model) {
                this.listenTo(this.model, 'change', this.setSchema);
            }
            if (this.parent) {
                this.listenTo(this.parent, "change:id", this.render);
            }
            if (this.autoOpen) {
                this.prepareForm();
            }
        },

        updateForm : function() {
            var jsonData = {"models" : this.viewData()};
            this.relationView.$el.html(this.template(jsonData));
        },

        viewData: function() {
            var models = squid_api.utils.getDomainRelations(this.collection.models, config.get("domain"));
            var arr = [];
            for (i=0; i<models.length; i++) {
                var obj = {};
                obj.oid = models[i].get("oid");
                obj.leftName = models[i].get("leftName");
                obj.rightName = models[i].get("rightName");

                // set cardinality booleans for handlebar display
                var leftCardinality = models[i].get("leftCardinality");
                var rightCardinality = models[i].get("rightCardinality");
                if (leftCardinality == "MANY") {
                    obj.leftMany = true;
                } else if (leftCardinality == "ZERO_OR_ONE") {
                    obj.leftZeroOrOne = true;
                } else if (leftCardinality == "ONE") {
                    obj.leftOne = true;
                }
                if (rightCardinality == "MANY") {
                    obj.rightMany = true;
                } else if (rightCardinality == "ZERO_OR_ONE") {
                    obj.rightZeroOrOne = true;
                } else if (rightCardinality == "ONE") {
                    obj.rightOne = true;
                }
                arr.push(obj);
            }

            return arr;
        },

        renderForm : function() {
            var me = this;
            var jsonData = {"models" : this.viewData()};

            // render the form into a backbone view
            this.relationView = Backbone.View.extend({
                events: {
                    "click .edit" : function(event) {
                        var oid = $(event.target).parents("tr").attr("data-value");
                        var model = me.collection.get(oid);
                        new api.view.ModelManagementView({
                            el : $(this),
                            model : model,
                            parent : me.parent,
                            autoOpen : true,
                            beforeRenderHandler : me.beforeRenderHandler,
                            suggestionHandler : this.suggestionHandler,
                            buttonLabel : "edit",
                            successHandler : function() {
                                var message = "relation successfully modified";
                                squid_api.model.status.set({'message' : message});
                            }
                        });
                    },
                    "click .delete" : function(event) {
                        var oid = $(event.target).parents("tr").attr("data-value");
                        var model = me.collection.get(oid);
                        if (confirm("are you sure you want to delete this relation?")) {
                            if (true) {
                                model.destroy({
                                    success:function() {
                                        squid_api.model.status.set({'message' : "relation successfully deleted"});
                                        me.collection.trigger("change");
                                    }
                                });
                            }
                        }
                    },
                    "click .add" : function(event) {
                        new api.view.ModelManagementView({
                            el : $(this),
                            model : me.model,
                            parent : me.parent,
                            autoOpen : true,
                            beforeRenderHandler : me.beforeRenderHandler,
                            suggestionHandler : this.suggestionHandler,
                            buttonLabel : "edit",
                            successHandler : function() {
                                squid_api.model.status.set({'message' : "relation successfully created"});
                                me.collection.create(this);
                            }
                        });
                    }
                },
                suggestionHandler: function() {
                    var me = this;
                    var relationEl = this.formContent.$el.find(".suggestion-box");
                    var request = $.ajax({
                        type: "GET",
                        url: squid_api.apiURL + "/projects/" + squid_api.model.project.get("id").projectId + "/relations-suggestion",
                        dataType: 'json',
                        data: {
                            "expression" : relationEl.val(),
                            "offset" : relationEl.prop("selectionStart") + 1,
                            "leftDomainId" : this.formContent.getValue().leftId.domainId,
                            "rightDomainId" : this.formContent.getValue().rightId.domainId,
                            "access_token" : squid_api.model.login.get("accessToken")
                        },
                        success:function(response) {
                            // detemine if there is an error or not
                            if (response.validateMessage.length === 0) {
                                relationEl.removeClass("invalid-expression").addClass("valid-expression");
                            } else {
                                relationEl.removeClass("valid-expression").addClass("invalid-expression");
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
                                relationEl.after("<div class='squid-api-pre-domain-suggestions squid-api-dialog'><ul></ul></div>");
                                for (i=0; i<definitions.length; i++) {
                                    relationEl.siblings(".squid-api-pre-domain-suggestions").find("ul").append("<li>" + definitions[i] + "</li>");
                                }

                                relationEl.siblings(".squid-api-pre-domain-suggestions").find("li").click(me, function(event) {
                                    var item = $(event.target).html();
                                    var str = relationEl.val().substring(0, offset) + item.substring(0);
                                    relationEl.val(str);
                                    me.suggestionHandler.call(me);
                                });

                                // show dialog
                                relationEl.siblings(".squid-api-pre-domain-suggestions").dialog({
                                    open: function(e, ui) {
                                        e.preventDefault();
                                    },
                                    dialogClass: "squid-api-domain-suggestion-dialog squid-api-dialog",
                                    position: { my: "center top", at: "center bottom+4", of: relationEl },
                                    closeText: "x"
                                });
                            } else {
                                // set message
                                squid_api.model.status.set("message", response.validateMessage);
                            }

                            // place the focus back onto the domain suggestionElement
                            relationEl.focus();
                        },
                        error: function(response) {
                            squid_api.model.status.set({'message' : response.responseJSON.error});
                        }
                    });
                },
                render: function() {
                    this.$el.html(template(jsonData));
                    return this;
                }
            });

            // instantiate relation view
            this.relationView = new this.relationView();

            // modal title
            modalTitle = "Domain Relations";

            // instantiate a new modal view, set the content & automatically open
            this.formModal = new Backbone.BootstrapModal({
                content: this.relationView,
                cancelText: "close",
                title: modalTitle
            }).open();

            // modal wrapper class
            $(this.formModal.el).addClass(this.modalElementClassName);

            // modal definition class
            $(this.formModal.el).find(".modal-dialog").addClass(me.model.definition);

            // on cancel
            this.formModal.on('cancel', function() {
                $(".squid-api-dialog").remove();
            });

            /* bootstrap doesn't remove modal from dom when clicking outside of it.
               Check to make sure it has been removed whenever it isn't displayed.
            */
            $(this.formModal.el).on('hidden.bs.modal', function () {
                this.remove();
            });
        }
    });

    return View;
}));
