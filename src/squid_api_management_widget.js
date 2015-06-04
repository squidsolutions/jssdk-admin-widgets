(function (root, factory) {
    root.squid_api.view.ManagementView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        definition : null,
        definitionProperties : null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            if (options.definition) {
                this.definition = options.definition;
            }
            if (options.definitionProperties) {
                this.definitionProperties = options.definitionProperties;
            }

            // Set Form Schema
            this.setSchema(this.definition);
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
            data.id[this.definition.toLowerCase() + "Id"] = parseInt(id);

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

                // Form Events
                formModal.on('ok', function() {
                    var validForm = formContent.validate();
                    if (validForm) {
                        formModal.preventClose();
                    } else {
                        var data = me.manipulateData(formContent.getValue());
                        me.model.save(data, {
                            type: 'POST'
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
                // store definition
                var definition = data.definitions[def];
                // store properties
                var properties = definition.properties;
                // only display certain properties if specified
                if (me.definitionProperties) {
                    var defProperties = me.definitionProperties;
                    var tmp = {};
                    for (i=0; i<defProperties.length; i++) {
                        for (var ix in properties) {
                            if (defProperties[i] == ix) {
                                tmp[ix] = properties[ix];
                            }
                        }
                    }
                    properties = tmp;
                }

                var schema = {};
                var modelData = {};

                // create schema
                for (var property in properties) {
                    schema[property] = {};

                    var type;
                    
                    // obtain references from items
                    if (properties[property].items && properties[property].items.$ref) {
                        // set base obj
                        var nestedModel = {};

                        // obtain path
                        var refTmp = properties[property].items.$ref;
                        var ref = properties[property].items.$ref.substr(refTmp.lastIndexOf("/") + 1);

                        // get properties
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
                        // set nested model
                        schema[property].type = "List";
                        schema[property].itemType = "Object";
                        schema[property].subSchema = nestedModel;
                    } else {
                        type = me.getPropertyType(properties[property].type);
                        schema[property].type = type;
                        schema[property].editorClass = "form-control";
                    }
                }

                // validation
                var required;
                if (data.definitions[def].required) {
                    required = data.definitions[def].required;
                }
                for (i=0; i<required.length; i++) {
                    schema[required[i]].validators = ['required'];
                }

                // try match a base model [or create a new one]
                var baseModel = null;
                for (var apiModel in squid_api.model) {
                    var str = apiModel;
                    var res = str.match(def + "Model");
                    if (res) {
                        baseModel = new squid_api.model[res] ();
                    }
                }
                if (baseModel === null) {
                    baseModel = new squid_api.model.BaseModel();
                }

                // set project id
                me.model = baseModel;

                // set schema
                me.schema = schema;

                // Render View
                me.render();
            });
        },

        render: function(currentView) {
            var me = this;
            var jsonData = {"view" : "squid-api-admin-widgets-" + this.definition, "modal" : this.definition};

            // Print Template
            this.$el.html(this.template(jsonData));
        }
    });

    return View;
}));
