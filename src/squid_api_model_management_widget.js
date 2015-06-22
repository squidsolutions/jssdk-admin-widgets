(function (root, factory) {
    root.squid_api.view.ModelManagementView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_model_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        successHandler: null,
        errorHandler: null,
        modalElementClassName : "squid-api-admin-widgets-modal-form",
        buttonLabel : null,
        autoOpen: null,
        parent: null,
        domainSuggestionHandler : null,
        projectSchemasCallback : null,

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
            if (options.domainSuggestionHandler) {
                this.domainSuggestionHandler = options.domainSuggestionHandler;
            }
            if (options.projectSchemasCallback) {
                this.projectSchemasCallback = options.projectSchemasCallback;
            }

            // Set Form Schema
            this.setSchema();

            if (this.model) {
                this.listenTo(this.model, 'change', this.setSchema);
            }

            if (this.autoOpen) {
                this.prepareForm();
            }
        },

        manipulateData : function(data) {
            var me = this;
            var project = squid_api.model.project.get("id");

            // manipuldate data before save
            if (this.model.get("id")) {
                data.id = {};
                data.id[this.model.definition.toLowerCase() + "Id"] = parseInt(this.model.get("id")[this.model.definition.toLowerCase() + "Id"]);
            } else {
                var id = data.id;
                data.id = {};
                data.id[this.model.definition.toLowerCase() + "Id"] = parseInt(id);
            }

            // add project id
            if (project) {
                if (project.projectId && me.model.definition !== "Project") {
                    data.id.projectId = project.projectId;
                }
            }

            return data;
        },

        setStatusMessage: function(message) {
            setTimeout(function() {
                squid_api.model.status.set({'message' : message});
            }, 500);
        },

        saveForm : function(formContent) {
            var me = this;

            /*
                1. validate form (if errors, display them & keep modal open)
                2. save data
            */

            var validForm = this.formContent.validate();
            if (validForm) {
                me.formModal.preventClose();
            } else {
                // remove all dialog's
                $(".squid-api-dialog").remove();

                if (this.model.definition == "Project" && me.schema.dbSchemas.options.length === 0) {
                    me.formModal.preventClose();
                }

                var data = me.manipulateData(this.formContent.getValue());
                me.model.save(data, {
                    success: function (collection, response) {
                        // project exception 
                        if (me.model.definition == "Project") {
                            me.schema.id.type = "Hidden";
                            if (me.projectSchemasCallback) {
                                me.projectSchemasCallback.call(me);
                            } else {
                                var msg = response.objectType + " successfully saved with name " + response.name;
                                me.setStatusMessage(msg);
                            }
                            if (me.successHandler) {
                                me.successHandler.call(collection);
                            }
                        } else {
                            if (me.successHandler) {
                                me.successHandler.call(collection);
                            } 
                        }
                    },
                    error: function (collection, response) {
                        var msg = response.objectType + " error saving with name " + response.name;
                        me.setStatusMessage(msg);

                        if (me.errorHandler) {
                            me.errorHandler.call(collection);
                        }
                    }
                });
            }
        },

        renderForm : function() {
            // called when we want to set the model / schema & render the form via a modal
            var me = this;
            
            // set base schema & modal into form
            this.formContent = new Backbone.Form({
                schema: me.schema,
                model: me.model
            }).render();

            // render the form into a backbone view
            this.formView = Backbone.View.extend({
                model: me.model,
                parent: me.parent,
                // domain subject exception
                events: {
                    "keypress .domain-subject" : function() {
                        me.domainSuggestionHandler.call(me);
                    },
                    "click .domain-subject" : function() {
                        me.domainSuggestionHandler.call(me);
                    }
                },
                render: function() {
                    this.$el.html(me.formContent.el);
                    return this;
                }
            });

            // modal title
            var modalTitle;
            if (me.model.get("id")) {
                modalTitle = "Editing " + me.model.definition + ": " + me.model.get("name");
            } else {
                modalTitle = "Creating a new " + me.model.definition;
            }

            // instantiate a new modal view, set the content & automatically open
            this.formModal = new Backbone.BootstrapModal({ 
                content: new this.formView(),
                animate: true,
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
        },

        prepareForm: function() {
            // obtain schema values if project
            if (this.projectSchemasCallback) {
                this.projectSchemasCallback(this);
            }
            this.renderForm();
        },

        events: {
            "click button" : function() {
                this.prepareForm();
            }
        },

        getPropertyType: function(type) {
            switch(type) {
                case "string":
                    return "Text";
                case "int32":
                    return "Number";
                case "array":
                    return "Checkboxes";
                default:
                    return "Text";
            }
        },

        remove: function() {
            this.undelegateEvents();
            this.$el.empty();
            this.stopListening();
            return this;
        },

        setSchema: function(property) {
            var me = this;
            
            squid_api.getSchema().done(function(data) {
                
                // base variables
                var definition = data.definitions[me.model.definition];
                var properties = definition.properties;
                schema = modelData = {};

                // delete ignored properties from schema
                if (me.model.ignoredAttributes) {
                    var obj = {};
                    for (var ix in properties) {
                        for (i=0; i<me.model.ignoredAttributes.length; i++) {
                            if (me.model.ignoredAttributes[i] == ix) {
                                delete properties[ix];
                            }
                        }
                    }
                }

                // create schema
                for (var property in properties) {
                    if (! properties[property].readOnly) {
                        // base field object
                        schema[property] = {};
                        var refValue, ref, subProp;

                        // obtain reference property values
                        if (properties[property].items) {
                            if (properties[property].items.$ref) {
                                subProp = data.definitions[properties[property].items.$ref.substr(properties[property].items.$ref.lastIndexOf("/") + 1)].properties;
                            }
                        }

                        if (properties[property].items && properties[property].items.$ref) {
                            // base nested model
                            var nm = {};

                            // apply sub-properties (if exist)
                            for (var subProperty in subProp) {
                                nm[subProperty] = {};
                                if (subProp[subProperty].enum) {
                                    nm[subProperty].type = "Text";
                                    nm[subProperty].options = subProp[subProperty].enum;
                                } else {
                                    nm[subProperty].options = [];
                                    nm[subProperty].type = me.getPropertyType(subProp[subProperty].type);
                                }
                                nm[subProperty].editorClass = "form-control";
                                nm[subProperty].disabled = true;
                            }
                            
                            schema[property].type = "List";
                            schema[property].itemType = "Object";
                            schema[property].subSchema = nm;
                        } else {
                            // domain exception
                            if (me.model.definition == "Domain" && property == "subject") {
                                refValue = properties.subject.$ref;
                                ref = properties.subject.$ref.substr(refValue.lastIndexOf("/") + 1);
                                subProp = data.definitions[ref].properties;

                                schema[property].type = "Object";
                                schema[property].subSchema = subProp;
                                schema[property].subSchema[Object.keys(subProp)[0]].type = "TextArea";
                                schema[property].subSchema[Object.keys(subProp)[0]].editorClass = "form-control domain-subject";
                            } else if (schema[property].type !== "Checkboxes") {
                                type = me.getPropertyType(properties[property].type);
                                schema[property].type = type;
                                schema[property].editorClass = "form-control";
                            }
                            // if select
                            if (schema[property].type == "Checkboxes") {
                                schema[property].editorClass = " ";
                                if (me.model.get(property)) {
                                    schema[property].options = me.model.get(property);
                                } else {
                                    schema[property].options = [];
                                }
                            }
                        }
                    }
                }

                // validation
                var required;
                if (data.definitions[me.model.definition]) {
                    required = data.definitions[me.model.definition].required;
                }
                for (i=0; i<required.length; i++) {
                    schema[required[i]].validators = ['required'];
                }

                // set schema
                me.schema = schema;

                // if schema already set, hide id
                if (me.model.get("id")) {
                    me.schema.id.type = "Hidden";
                }

                // Render View
                me.render();
            });
        },

        render: function(currentView) {
            var me = this;

            var jsonData = {
                "view" : "squid-api-admin-widgets-" + me.model.definition, 
                "definition" : me.model.definition, 
                "buttonLabel" : me.buttonLabel
            };

            // Print Button to trigger management widget
            if (! this.autoOpen) {
                this.$el.html(this.template(jsonData));
            }
        }
    });

    return View;
}));
