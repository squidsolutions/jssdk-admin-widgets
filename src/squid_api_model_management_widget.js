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
            if (options.collection) {
                this.collection = options.collection;
            }

            // Set Form Schema
            this.setSchema();

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

        manipulateData : function(data) {
            var modelDefinitionId = this.model.definition.toLowerCase() + "Id";

            if (data.id) {
                if (data.id.projectId.length === 0) {
                    data.id.projectId = null;
                }
                if (squid_api.model.config.get("domain") && (this.model.definition == "Metric" || this.model.definition == "Dimension")) {
                    data.id.domainId = squid_api.model.config.get("domain");
                }
            }
            if (typeof data.id[modelDefinitionId] !== "undefined" && this.model.definition !== "Project") {
                if (data.id[modelDefinitionId].length === 0) {
                    data.id[modelDefinitionId] = null;
                }
            }

            // if the definition isn't project, add the projectId
            if (squid_api.model.config.get("project") && this.model.definition !== "Project") {
                var projectId =  squid_api.model.config.get("project");
                data.id.projectId = projectId;

                if (data.parentId) {
                    if (data.parentId[this.model.definition.toLowerCase() + "Id"].length === 0) {
                        data.parentId = null;
                    } else {
                        data.parentId.domainId = squid_api.model.config.get("domain");
                        data.parentId.projectId = projectId;
                    }
                }
            }

            // password exception
            if (typeof data.dbPassword !== "undefined") {
                if (data.dbPassword.length === 0) {
                    data.dbPassword = null;
                }
            }

            // dimensions exception
            if (data.type) {
                if (data.type.length === 0) {
                    data.type = "INDEX";
                } else {
                    data.type = data.type[0];
                }
            }

            for (var x in data) {
                if (x !== "id" && typeof data[x]=="object" && data[x] !== null) {
                    if (data[x].projectId !== undefined) {
                        if (data[x].projectId.length === 0) {
                            data[x].projectId = squid_api.model.config.get("project");
                        }
                    } else {
                        if (data[x].domainid !== undefined) {
                            if (data[x].domainid.length === 0) {
                                data[x].domainid = squid_api.model.config.get("domain");
                            }
                        }
                    }
                }
            }

            return data;
        },

        setStatusMessage: function(message) {
            setTimeout(function() {
                squid_api.model.status.set({'message' : message});
            }, 1000);
        },

        saveForm : function(formContent) {
            var me = this;
            var invalidExpression = this.formContent.$el.find(".invalid-expression").length > 0;

            /*
                1. validate form (if errors, display them & keep modal open)
                2. save data
            */

            var validForm = this.formContent.validate();
            if (validForm) {
                me.formModal.preventClose();
            } else if (! invalidExpression) {
                // remove all dialog's
                $(".squid-api-dialog").remove();

                if (this.model.definition == "Project" && me.schema.dbSchemas.options.length === 0) {
                    me.formModal.preventClose();
                }

                var data = me.manipulateData(this.formContent.getValue());
                me.model.save(data, {
                    success: function (collection, response) {
                        // set project ID

                        me.formContent.setValue("id", {"projectId" : collection.get("id").projectId});

                        // project exception
                        if (me.model.definition == "Project") {
                            me.schema.id.type = "Hidden";
                            if (me.schemasCallback) {
                                me.schemasCallback.call(me);
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
            } else {
                me.formModal.preventClose();
            }
        },
        resetStatusMessage : function() {
            this.setStatusMessage("");
        },
        renderForm : function() {
            // called when we want to set the model / schema & render the form via a modal
            var me = this;

            /*var modelWithValidation = (me.model).extend({
                validation: {
                    dbUrl: {
                        fn: function(value, attr, computedState) {
                            if(value !== 'something') {
                                return 'Name is invalid';
                            }
                        }
                    }
                }
            });*/

            // set base schema & modal into form
            this.formContent = new Backbone.Form({
                /*jshint multistr: true */
                /*template: _.template('\
                    <form>\
                     <div data-fieldsets></div>\
                     <button type="button">Check</button>\
                      <% if (submitButton) { %>\
                        <button type="submit"><%= submitButton %></button>\
                      <% } %>\
                    </form>\
                  ', null, this.templateSettings),

                templateSettings: {
                    evaluate: /<%([\s\S]+?)%>/g,
                    interpolate: /<%=([\s\S]+?)%>/g,
                    escape: /<%-([\s\S]+?)%>/g
                },*/
                schema: me.schema,
                model: me.model
            }).render();

            this.formContent.on('dbUrl:change', function(form, dbUrlEditor) {
                console.log(dbUrlEditor.getValue());
                $('#btn-check').removeClass("btn-danger");
                $('#btn-check').removeClass("btn-success");
                $('.dbSchemas').css("visibility", "hidden");
                //$('.modal-footer').find('.btn-warning').addClass("ok");
                $('.modal-footer').find('.btn-warning').removeClass("btn-warning");
            });

            this.formContent.on('dbPassword:change', function(form, dbPasswordEditor) {
                console.log(dbPasswordEditor.getValue());
                $('#btn-check').removeClass("btn-danger");
                $('#btn-check').removeClass("btn-success");
                $('.dbSchemas').css("visibility", "hidden");
                //$('.modal-footer').find('.btn-warning').addClass("ok");
                $('.modal-footer').find('.btn-warning').removeClass("btn-warning");

            });

            this.formContent.on('dbUser:change', function(form, dbUserEditor) {
                console.log(dbUserEditor.getValue());
                $('#btn-check').removeClass("btn-danger");
                $('#btn-check').removeClass("btn-success");
                $('.dbSchemas').css("visibility", "hidden");
                //$('.modal-footer').find('.btn-warning').addClass("ok");
                $('.modal-footer').find('.btn-warning').removeClass("btn-warning");
            });

            this.formContent.on('leftId:change', function(form) {
                var rightText = form.$el.find(".leftId").find("select option:selected").text();
                form.$el.find(".leftName input").val(rightText);
            });

            this.formContent.on('rightId:change', function(form) {
                var rightText = form.$el.find(".rightId").find("select option:selected").text();
                form.$el.find(".rightName input").val(rightText);
            });

            var incorrectCredentials = false;


            // render the form into a backbone view
            this.formView = Backbone.View.extend({
                model: me.model,
                parent: me.parent,

            // domain subject exception
                events: {
                    "keyup .suggestion-box" : function(e) {
                        me.suggestionHandler.call(me);
                    },
                    "click .suggestion-box" : function(e) {
                        me.suggestionHandler.call(me);
                    },
                    "click #btn-check" : function(e) {
                        var me = this;

                        console.log("Validating DB password");
                        var dburl = this.$el.find('.dbUrl').find('.form-control').val();
                        var dbPassword =  this.$el.find('.dbPassword').find('.form-control').val();
                        var dbUser = this.$el.find('.dbUser').find('.form-control').val();
                        var projectId = squid_api.model.config.get("project");

                        $.ajax({
                            type: "GET",
                            url: squid_api.apiURL + "/connections/validate" + "?access_token="+squid_api.model.login.get("accessToken")+"&projectId="+projectId+"&url="+dburl+"&username="+ dbUser +"&password=" + dbPassword,
                            dataType: 'json',
                            contentType: 'application/json',
                            success: function (response) {
                                me.$el.find('#btn-check').removeClass("btn-danger");
                                me.$el.find('#btn-check').addClass("btn-success");
                                me.$el.find('.dbSchemas').removeAttr('style');
                                me.$el.find('.modal-footer .btn-warning').removeClass("btn-warning");
                                incorrectCredentials = false;
                            },
                            error: function(xhr, textStatus, error){
                                squid_api.model.status.set({"message":JSON.parse(xhr.responseText).error}, {silent:true});
                                squid_api.model.status.set("error",true);
                                me.$el.find('#btn-check').removeClass("btn-success");
                                me.$el.find('#btn-check').addClass("btn-danger");
                                console.log("Validation failed");
                                me.$el.find('.dbSchemas').css("visibility", "hidden");
                                me.$el.find('.modal-footer').find('.ok').addClass("btn-warning");
                                incorrectCredentials = true;
                            }

                        });

                    }
                },
                render: function() {
                    this.$el.html(me.formContent.el);

                    // detect and add dbPassword placeholder
                    if (me.model.definition == "Project" && me.model.get("dbPasswordLength")) {
                        var placeholder = "";
                        for (i=0; i<me.model.get("dbPasswordLength"); i++) {
                            placeholder = placeholder + "*";
                        }
                        this.$el.find("input[name*='dbPassword']").attr("placeholder", placeholder);
                    }
                    if (this.model.definition == "Relation") {
                        if (this.model.isNew()) {
                            // by default set the current domain as the leftId
                            this.$el.find(".leftId select").val(squid_api.model.config.get("domain"));

                            var leftName = this.$el.find(".leftId select option:selected").text();
                            this.$el.find(".leftName input").val(leftName);
                            var rightName = this.$el.find(".rightId select option:selected").text();
                            this.$el.find(".rightName input").val(rightName);
                        }
                    }
                    return this;
                }
            });

            // modal title
            var modalTitle;
            if (this.modalTitle) {

            } else {
                if (me.model.get("id")) {
                    modalTitle = "Editing " + me.model.definition;
                    if (me.model.get("name")) {
                        modalTitle = modalTitle + ": " + me.model.get("name");
                    }
                } else {
                    modalTitle = "Creating a new " + me.model.definition;
                }
            }

            // instantiate a new modal view, set the content & automatically open
            if (this.formModal) {
                this.formModal.open();
            } else {
                this.formModal = new Backbone.BootstrapModal({
                    content: new this.formView(),
                    title: modalTitle
                });
                this.formModal.open();
            }

            // modal wrapper class
            $(this.formModal.el).addClass(this.modalElementClassName);

            // modal definition class
            $(this.formModal.el).find(".modal-dialog").addClass(me.model.definition);

            // saveForm on 'ok' click
            this.formModal.on('ok', function() {
                if(incorrectCredentials === true) {
                    console.log("Warning popup");
                    // Show warning.
                    var PopupView = Backbone.View.extend({
                        render: function () {
                            this.$el.html('The connection settings are incorrect. Are you sure you want to continue?');
                            return this;
                        }
                    });

                    var confirmationModal = new Backbone.BootstrapModal({
                        content: new PopupView(),
                        title: "Confirmation"
                    });
                    confirmationModal.on('ok', function () {
                        me.saveForm();
                        me.formModal.close();
                        confirmationModal.close();

                    });

                    confirmationModal.on('cancel', function () {
                        me.formModal.preventClose();
                        confirmationModal.close();
                    });

                    //confirmationModal.render();
                    me.formModal.preventClose();
                    confirmationModal.open();
                }else{
                    me.saveForm();
                }

            });

            // hide first div (id)
            $(this.formModal.el).find("fieldset").first().find("div").first().hide();

            // on cancel
            this.formModal.on('cancel', function() {
                $(".squid-api-dialog").remove();
                me.resetStatusMessage();
            });

            /* bootstrap doesn't remove modal from dom when clicking outside of it.
               Check to make sure it has been removed whenever it isn't displayed.
            */
            $(this.formModal.el).on('hidden.bs.modal', function () {
                this.remove();
            });
        },

        prepareForm: function() {
            // obtain schema values if project
            if (this.schemasCallback) {
                this.schemasCallback.call(this);
            }
            if (this.beforeRenderHandler) {
                this.beforeRenderHandler.call(this);
            }
            this.renderForm();
        },

        events: {
            "click button" : function() {
                if (! this.autoOpen) {
                    // reset model defaults
                    this.model.clear().set(this.model.defaults);
                    this.prepareForm();
                }
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

            if (this.formContent) {
                this.formContent.model = me.model;
            }

            for (var x in me.model.schema) {
                if (me.model.definition == "Relation" && (x == "leftId") || x == "rightId") {
                    var domains = me.parent.models;
                    var domainArray = [];

                    for (i = 0; i < domains.length; i++) {
                        domainObj = {};
                        domainObj.val = domains[i].get("oid");
                        domainObj.label = domains[i].get("name");
                        domainArray.push(domainObj);
                    }
                    me.model.schema[x].subSchema.domainId.options = domainArray;
                }
                if (me.model.definition === "Project" && x === "dbUrl") {
                    /*jshint multistr: true */
                    me.model.schema[x].template = _.template('\
                                    <div>\
                                      <label for="<%= editorId %>">\
                                        <% if (titleHTML){ %><%= titleHTML %>\
                                        <% } else { %><%- title %><% } %>\
                                      </label>\
                                      <div>\
                                        <span data-editor></span>\
                                        <div class="error-text" data-error></div>\
                                        <div class="error-help"><%= help %></div>\
                                      </div>\
                                      <div>\
                                          <button class="btn btn-default" id="btn-check" type="button">Check Connection</button>\
                                      </div>\
                                    </div>\
                                  ', null, null);
                }
                if (me.model.definition == "Dimension" && x == "parentId") {
                    me.model.schema[x].subSchema.dimensionId.type = "Select";
                    me.model.schema[x].subSchema.dimensionId.options = [{val : null, label : " "}];
                    for (i=0; i<me.collection.models.length; i++) {
                        if (me.collection.models[i].get("oid") !== me.model.get("oid")) {
                            if (me.collection.models[i].get("dynamic") === false) {
                                var objD = {};
                                objD.val = me.collection.models[i].get("oid");
                                objD.label = me.collection.models[i].get("name");
                                me.model.schema[x].subSchema.dimensionId.options.push(objD);
                            }
                        }
                    }
                }
            }

            // set schema
            me.schema = me.model.schema;

            // Render View
            me.render();
        },

        render: function(currentView) {
            var me = this;

            var jsonData = {
                "view" : "squid-api-admin-widgets-" + me.model.definition,
                "definition" : me.model.definition,
                "buttonLabel" : me.buttonLabel,
                "accessible" : false,
            };

            // Print Button to trigger management widget
            if (! this.autoOpen) {
                if (this.parent) {
                    if (this.parent.get("_role") == "WRITE" || this.parent.get("_role") == "OWNER") {
                        jsonData.accessible = true;
                    }
                    // print template
                    this.$el.html(this.template(jsonData));
                }
            }
        }
    });

    return View;
}));
