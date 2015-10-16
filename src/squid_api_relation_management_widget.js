(function (root, factory) {
    root.squid_api.view.RelationModelManagementView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_relation_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.ModelManagementView.extend({

        successHandler: null,
        errorHandler: null,
        modalElementClassName : "squid-api-admin-widgets-modal-form squid-api-admin-widgets-modal-form-collection",
        buttonLabel : null,
        autoOpen: null,
        parent: null,
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
            var models = squid_api.utils.getDomainRelations(this.collection.models, squid_api.model.config.get("domain"));
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
                        new squid_api.view.ModelManagementView({
                            el : $(this),
                            model : model,
                            parent : me.parent,
                            autoOpen : true,
                            beforeRenderHandler : me.beforeRenderHandler,
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
                                        $(me.formModal.el).trigger("hidden.bs.modal");
                                        squid_api.model.status.set({'message' : "relation successfully deleted"});
                                        me.collection.trigger("change");
                                    }
                                });
                            }
                        }
                    },
                    "click .add" : function(event) {
                        new squid_api.view.ModelManagementView({
                            el : $(this),
                            model : me.model,
                            parent : me.parent,
                            autoOpen : true,
                            beforeRenderHandler : me.beforeRenderHandler,
                            buttonLabel : "edit",
                            successHandler : function() {
                                squid_api.model.status.set({'message' : "relation successfully created"});
                                me.collection.create(this);
                            }
                        });
                    }
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

            /* bootstrap doesn't remove modal from dom when clicking outside of it.
               Check to make sure it has been removed whenever it isn't displayed.
            */
            $(this.formModal.el).one('hidden.bs.modal', function () {
                me.closeModal();
            });
            $(this.formModal.el).find(".close").one("click", function() {
                $(me.formModal.el).trigger("hidden.bs.modal");
            });
            $(this.formModal.el).find(".cancel").one("click", function() {
                $(me.formModal.el).trigger("hidden.bs.modal");
            });
        },
        closeModal : function() {
            this.formModal.close();
            this.formModal.remove();
        }
    });

    return View;
}));
