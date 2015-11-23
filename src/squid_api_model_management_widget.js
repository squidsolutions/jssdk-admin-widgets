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
            if (options.collection) {
                this.collection = options.collection;
            }

            if (this.model) {
                this.listenTo(this.model, 'change', this.setSchema);
            }
            if (this.parent) {
                this.listenTo(this.parent, "change:id", this.render);
            }

            // Set Form Schema
            this.setSchema();
            
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

            // validate form ()
            var errors = this.formContent.validate();
            if (errors) {
                // if errors, display them & keep modal open
                me.formModal.preventClose();
            } else if (! invalidExpression) {
                // remove all dialogs
                $(".squid-api-dialog").remove();

                // Save
                var data = me.manipulateData(this.formContent.getValue());
                me.model.save(data, {
                    success: function (collection, response) {
                        // set project ID
                        me.formContent.setValue("id", {"projectId" : collection.get("id").projectId});

                        if (me.model.definition == "Project") {
                            if (data.dbSchemas.length !== 0) {
                                $(me.formModal.el).trigger("hidden.bs.modal");
                            }
                        } else {
                            $(me.formModal.el).trigger("hidden.bs.modal");
                        }

                        // project exception
                        if (me.model.definition == "Project") {
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
                schema: me.schema,
                model: me.model
            }).render();

            this.formContent.on('dbUrl:change', function(form, dbUrlEditor) {
                $('#btn-check').removeClass("btn-danger");
                $('#btn-check').removeClass("btn-success");
                $('.dbSchemas').hide();
                //$('.modal-footer').find('.btn-warning').addClass("ok");
                $('.modal-footer').find('.btn-warning').removeClass("btn-warning");
            });

            this.formContent.on('dbPassword:change', function(form, dbPasswordEditor) {
                $('#btn-check').removeClass("btn-danger");
                $('#btn-check').removeClass("btn-success");
                $('.dbSchemas').hide();
                //$('.modal-footer').find('.btn-warning').addClass("ok");
                $('.modal-footer').find('.btn-warning').removeClass("btn-warning");

            });

            this.formContent.on('dbUser:change', function(form, dbUserEditor) {
                $('#btn-check').removeClass("btn-danger");
                $('#btn-check').removeClass("btn-success");
                $('.dbSchemas').hide();
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
                        me.suggestionBox(me);
                    },
                    "click .suggestion-box" : function(e) {
                        me.suggestionBox(me);
                    },
                    "click #btn-check" : function(e) {
                        var me1 = this;
                        me1.$el.find('#btn-check').addClass("in-progress");
                        console.log("Validating DB password");
                        var dburl = this.$el.find('.dbUrl').find('.form-control').val();
                        var dbPassword =  this.$el.find('.dbPassword').find('.form-control').val();
                        var dbUser = this.$el.find('.dbUser').find('.form-control').val();
                        var projectId = squid_api.model.config.has("project")?squid_api.model.config.get("project"):"";
                        
                        $.ajax({
                            type: "GET",
                            url: squid_api.apiURL + "/connections/validate" + "?access_token="+squid_api.model.login.get("accessToken")+"&projectId="+projectId+"&url="+dburl+"&username="+ dbUser +"&password=" + encodeURIComponent(dbPassword),
                            dataType: 'json',
                            contentType: 'application/json',
                            success: function (response) {
                                squid_api.model.status.set({"error":null});
                                if (me.schemasCallback) {
                                    me.schemasCallback.call(me);
                                }
                                me1.$el.find('#btn-check').removeClass("in-progress");
                                me1.$el.find('#btn-check').removeClass("btn-danger");
                                me1.$el.find('#btn-check').addClass("btn-success");
                                me1.$el.find('.dbSchemas').show();
                                me1.$el.find('.modal-footer .btn-warning').removeClass("btn-warning");
                                incorrectCredentials = false;
                            },
                            error: function(xhr, textStatus, error){
                                squid_api.model.status.set({"error":xhr});
                                me1.$el.find('#btn-check').removeClass("in-progress");
                                me1.$el.find('#btn-check').removeClass("btn-success");
                                me1.$el.find('#btn-check').addClass("btn-danger");
                                console.log("Validation failed");
                                me1.$el.find('.dbSchemas').hide();
                                me1.$el.find('.modal-footer').find('.ok').addClass("btn-warning");
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
            
            // auto focus on the first enabled input element
            $(this.formContent.el).find('input[type=text],textarea,select').filter(':visible:first').focus();

            // saveForm on 'ok' click
            $(this.formModal.el).find(".ok").on("click", function() {
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
                    }).open();

                    $(confirmationModal.el).one('hidden.bs.modal', function () {
                        confirmationModal.close();
                        confirmationModal.remove();
                    });
                    $(confirmationModal.el).find(".close").one("click", function() {
                        $(confirmationModal.el).trigger("hidden.bs.modal");
                    });
                    $(confirmationModal.el).find(".cancel").one("click", function() {
                        $(confirmationModal.el).trigger("hidden.bs.modal");
                    });
                    $(confirmationModal.el).find(".ok").one("click", function() {
                        me.saveForm();
                        $(confirmationModal.el).trigger("hidden.bs.modal");
                    });
                } else {
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
            $(this.formModal.el).one('hidden.bs.modal', function () {
                me.closeModal();
                if ($(".squid-api-pre-suggestions").hasClass('ui-dialog-content')) {
                    $(".squid-api-pre-suggestions").dialog("destroy").remove();
                }
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
        },

        prepareForm: function() {
            // obtain schema values if project
            if (this.schemasCallback) {
                this.schemasCallback.call(this);
            }
            if (this.beforeRenderHandler) {
                this.beforeRenderHandler(this.model);
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

        suggestionBox: function() {
            var me = this;
            var suggestionEl = this.formContent.$el.find(".suggestion-box");
            var url = "";
            var data = {"expression" : suggestionEl.val(), "offset" : suggestionEl.prop("selectionStart") + 1, "access_token" : squid_api.model.login.get("accessToken")};
            if (me.model.definition == "Relation") {
                url = squid_api.apiURL + "/projects/" + squid_api.model.project.get("id").projectId + "/relations-suggestion";
                data.leftDomainId = this.formContent.getValue().leftId.domainId;
                data.rightDomainId = this.formContent.getValue().rightId.domainId;
            } else if (me.model.definition == "Domain") {
                url = squid_api.apiURL + "/projects/" + squid_api.model.config.get("project") + "/domains-suggestion";
            } else if (me.model.definition == "Metric") {
                url = squid_api.apiURL + "/projects/" + squid_api.model.config.get("project") + "/domains/" + squid_api.model.config.get("domain") + "/metrics-suggestion";
            } else if (me.model.definition == "Dimension") {
                url = squid_api.apiURL + "/projects/" + squid_api.model.config.get("project") + "/domains/" + squid_api.model.config.get("domain") + "/dimensions-suggestion";
            }

            var request = $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                data: data,
                success:function(response) {
                    // detemine if there is an error or not
                    if (response.validateMessage.length === 0) {
                        suggestionEl.removeClass("invalid-expression").addClass("valid-expression");
                    } else {
                        suggestionEl.removeClass("valid-expression").addClass("invalid-expression");
                    }

                    if ($(".squid-api-pre-suggestions").hasClass('ui-dialog-content')) {
                        $(".squid-api-pre-suggestions").dialog("destroy").remove();
                    }

                    $(".squid-api-suggestion-dialog").dialog("destroy").remove();

                    // append box if definitions exist
                    if (response.suggestions && response.suggestions.length > 0) {

                        // store offset
                        var offset = response.filterIndex;

                        // append div
                        suggestionEl.after("<div class='squid-api-pre-suggestions squid-api-dialog'><ul></ul></div>");
                        for (i=0; i<response.suggestions.length; i++) {
                            suggestionEl.siblings(".squid-api-pre-suggestions").find("ul").append("<li class=\"" + response.suggestions[i].objectType.toString() + " " + response.suggestions[i].valueType.toLowerCase() + "\"><span class='suggestion'>" +  response.suggestions[i].suggestion + "</span><span class='valueType'>(" + response.suggestions[i].valueType.toLowerCase() + ")</span></li>");
                        }

                        suggestionEl.siblings(".squid-api-pre-suggestions").find("li").click(me, function(event) {
                        	var item;
                        	if ($(event.target).is("li")) {
                        		item = $(event.target).find(".suggestion").html();
                        	} else {
                        		item = $(event.target).parent().find(".suggestion").html();
                        	}
                            var str = suggestionEl.val().substring(0, offset) + item.substring(0);
                            suggestionEl.val(str);
                            me.suggestionBox(me);
                        });

                        // show dialog
                        suggestionEl.siblings(".squid-api-pre-suggestions").dialog({
                            open: function(e, ui) {
                                e.preventDefault();
                            },
                            dialogClass: "squid-api-suggestion-dialog squid-api-dialog",
                            position: { my: "center top", at: "center bottom+4", of: suggestionEl }
                        });
                    } else {
                        // set message
                        squid_api.model.status.set("message", response.validateMessage);
                    }

                    // place the focus back onto the suggestionElement
                    suggestionEl.focus();
                },
                error: function(response) {
                    if (response.responseJSON.error) {
                        squid_api.model.status.set({'message' : response.responseJSON.error});
                    } else {
                        squid_api.model.status.set({'error' : response});
                    }
                }
            });
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
                if (me.model.definition == "Relation") {
                    if ((x == "leftId" || x == "rightId")) {
                    	var domains = me.parent.models;
                    	var domainArray = [];
                        //reset left & rightId
                        me.model.schema[x].subSchema.domainId.options = [];
                        if (me.model.isNew()) {
                            for (i = 0; i < domains.length; i++) {
                                domainObj = {};
                                domainObj.val = domains[i].get("oid");
                                domainObj.label = domains[i].get("name");
                                domainArray.push(domainObj);
                            }
                            me.model.schema[x].subSchema.domainId.options = domainArray;
                        } else {
                        	for (i = 0; i < domains.length; i++) {
                        		if (me.model.get(x).domainId == domains[i].get("oid")) {
                        			domainObj = {};
                        			domainObj.val = domains[i].get("oid");
                        			domainObj.label = domains[i].get("name");
                        			domainArray.push(domainObj);
                        			break;
                        		}
                            }
                            me.model.schema[x].subSchema.domainId.options = domainArray;
                        }
                    }
                }
                if (me.model.definition == "Project") {
                    if (me.model.isNew()) {
                        if (x == "dbSchemas") {
                            me.model.schema[x].options = [];
                        }
                    }
                }
                if (me.model.definition === "Project" && x === "dbPassword") {
                    /*jshint multistr: true */
                    var checkConnectionText = "Connect To Database";
                    if (! me.model.isNew()) {
                        checkConnectionText = "Refresh Schemas";
                    }
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
                                          <button class="btn btn-default" id="btn-check" type="button"><span class="glyphicon glyphicon-refresh"></span>' + checkConnectionText + '</button>\
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
