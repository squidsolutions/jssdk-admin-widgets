(function (root, factory) {
    root.squid_api.view.ModelManagementView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_model_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        successHandler: null,
        errorHandler: null,
        modalElementClassName : "squid-api-admin-widgets-modal-form",

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

            // Set Form Schema
            this.setSchema();
        },

        manipulateData : function(data) {
            // remove empty strings
            for (var x in data) {
                if (data[x].length === 0) {
                    data[x] = undefined;
                }
            }
            // store id
            var id = data.id;
            // create id obj
            data.id = {};
            // store id in correct format
            data.id[this.model.definition.toLowerCase() + "Id"] = parseInt(id);

            return data;
        },

        events: {
            "click button" : function() {
                var me = this;

                var formContent = new Backbone.Form({
                    schema: me.schema
                }).render();

                var formView = Backbone.View.extend({
                    render: function() {
                        this.$el.html(formContent.el);
                        return this;
                    }
                });

                var formModal = new Backbone.BootstrapModal({ 
                    content: new formView(),
                    animate: true,
                }).open();

                // modal wrapper class
                $(formModal.el).addClass(this.modalElementClassName);

                // modal definition class
                $(formModal.el).find(".modal-dialog").addClass(me.model.definition);

                // form events
                formModal.on('ok', function() {
                    var validForm = formContent.validate();
                    if (validForm) {
                        formModal.preventClose();
                    } else {
                        var data = me.manipulateData(formContent.getValue());
                        me.model.save(data, {
                            type: 'POST',
                            success: function (collection, response, options) {
                                var msg = response.objectType + " successfully saved with name " + response.name;
                                squid_api.model.status.set('message', msg);
                                me.model.set('data', collection);

                                if (me.successHandler) {
                                    me.successHandler.call(collection);
                                } 
                            },
                            error: function (collection, response, options) {
                                var msg = response.objectType + " error saving with name " + response.name;
                                squid_api.model.status.set('message', msg);

                                if (me.errorHandler) {
                                    me.errorHandler.call(collection);
                                }
                            }
                        });
                    }
                });
            },
        },

        getPropertyType: function(type) {
            switch(type) {
                case "string":
                    return "Text";
                case "int32":
                    return "Number";
                case "array":
                    return "List";
                default:
                    return "Text";
            }
        },

        setSchema: function(def) {
            var me = this;
            
            squid_api.getSchema().done(function(data) {
                var schema = {};
                var modelData = {};
                var definition = data.definitions[me.model.definition];
                var properties = definition.properties;

                // replace properties with non ignored properties
                if (me.model.ignoredAttributes) {
                    var ignoredAttributes = me.model.ignoredAttributes;
                    var updatedProperties = {};
                    for (var ix in properties) {
                        var count = 0;
                        for (i=0; i<ignoredAttributes.length; i++) {
                            if (ignoredAttributes[i] == ix) {
                                count++;
                            }
                        }
                        if (count === 0) {
                            updatedProperties[ix] = properties[ix];
                        }
                    }
                    properties = updatedProperties;
                }

                // create schema
                for (var property in properties) {
                    if (properties[property].readOnly !== true) {
                        schema[property] = {};
                        if (properties[property].items && properties[property].items.$ref) {
                            var nestedModel = {};
                            // obtain reference values
                            var refValue = properties[property].items.$ref;
                            var ref = properties[property].items.$ref.substr(refValue.lastIndexOf("/") + 1);
                            var subProp = data.definitions[ref].properties;

                            // apply sub-properties (if exist)
                            for (var subProperty in subProp) {
                                nestedModel[subProperty] = {};
                                if (subProp[subProperty].enum) {
                                    nestedModel[subProperty].type = "Text";
                                    nestedModel[subProperty].options = subProp[subProperty].enum;
                                } else {
                                    nestedModel[subProperty].type = me.getPropertyType(subProp[subProperty].type);
                                }
                                nestedModel[subProperty].editorClass = "form-control";
                            }
                            
                            schema[property].type = "List";
                            schema[property].itemType = "Object";
                            schema[property].subSchema = nestedModel;
                        } else {
                            type = me.getPropertyType(properties[property].type);
                            schema[property].type = type;
                            schema[property].editorClass = "form-control";
                        }
                    }
                }

                // validation
                var required;
                if (data.definitions[me.model.definition].required) {
                    required = data.definitions[me.model.definition].required;
                }
                for (i=0; i<required.length; i++) {
                    schema[required[i]].validators = ['required'];
                }

                // set schema
                me.schema = schema;

                // Render View
                me.render();
            });
        },

        render: function(currentView) {
            var me = this;
            var jsonData = {"view" : "squid-api-admin-widgets-" + me.model.definition, "definition" : me.model.definition};

            // Print Template
            this.$el.html(this.template(jsonData));
        }
    });

    return View;
}));
