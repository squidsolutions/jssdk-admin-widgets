(function (root, factory) {
    root.squid_api.view.RelationModelManagementView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_relation_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.ModelManagementView.extend({

        renderForm : function() {
            // called when we want to set the model / schema & render the form via a modal
            var me = this;
            var models = this.collection;
            var jsonData = {"models" : []};

            // format and push relation collection models
            for (i=0; i<models.length; i++) {
                var obj = {};
                obj.oid = models[i].get("oid");
                obj.leftName = models[i].get("leftName");
                obj.rightName = models[i].get("rightName");
                jsonData.models.push(obj);
            }

            // render the form into a backbone view
            this.relationView = Backbone.View.extend({
                template: this.template,
                events: {
                    "click .edit" : function(event) {
                        var oid = $(event.target).parent().attr("data-value");
                        var models = me.collection;
                        var model;

                        for (i=0; i<models.length; i++) {
                            if (models[i].get("oid") == oid) {
                                model = models[i];
                            }
                        }

                        new api.view.ModelManagementView({
                            el : $(this),
                            model : model,
                            parent : me.parent,
                            autoOpen : true,
                            domainSuggestionHandler : me.domainSuggestionHandler,
                            projectSchemasCallback : me.projectSchemasCallback,
                            beforeRenderHandler : me.beforeRenderHandler,
                            buttonLabel : "edit",
                            successHandler : function() {
                                var message = me.type + " with name " + this.get("name") + " has been successfully modified";
                                squid_api.model.status.set({'message' : message});
                            }
                        });
                    },
                    "click .add" : function(event) {
                        new api.view.ModelManagementView({
                            el : $(this),
                            model : me.model,
                            parent : me.parent,
                            autoOpen : true,
                            domainSuggestionHandler : me.domainSuggestionHandler,
                            projectSchemasCallback : me.projectSchemasCallback,
                            beforeRenderHandler : me.beforeRenderHandler,
                            buttonLabel : "edit",
                            successHandler : function() {
                                var message = me.type + " with name " + this.get("name") + " has been successfully modified";
                                squid_api.model.status.set({'message' : message});
                            }
                        });
                    }
                },
                render: function() {
                    this.$el.html(template(jsonData));
                    return this;
                }
            });

            // modal title
            modalTitle = "Domain Relations";

            // instantiate a new modal view, set the content & automatically open
            this.formModal = new Backbone.BootstrapModal({
                content: new this.relationView(),
                animate: true,
                cancelText: "close",
                title: modalTitle
            }).open();

            // modal wrapper class
            $(this.formModal.el).addClass(this.modalElementClassName);

            // modal definition class
            $(this.formModal.el).find(".modal-dialog").addClass(me.model.definition);

            // saveForm on 'ok' click
            this.formModal.on('ok', function() {
                me.saveForm();
            });

            // on cancel
            this.formModal.on('cancel', function() {
                $(".squid-api-dialog").remove();
            });
        }
    });

    return View;
}));
