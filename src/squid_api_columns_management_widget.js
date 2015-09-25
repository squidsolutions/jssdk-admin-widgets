(function (root, factory) {
    root.squid_api.view.ColumnsManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_columns_management_widget);

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
            if (options.type) {
                this.type = options.type;
            }

            if (this.collection) {
                this.collection.on("change remove", function() {
                    squid_api.model.config.trigger("change:domain", squid_api.model.config);
                }, this);
                if (! this.collection.fetched) {
                    this.collection.parentId = {projectId : squid_api.model.config.get("project"), domainId : squid_api.model.config.get("domain")};
                    this.collection.fetch();
                }
            }
            if (this.parent) {
                this.listenTo(this.parent, "change:id", this.render);
            }
            if (this.autoOpen) {
                this.render();
            }
        },

        updateForm : function() {
            var jsonData = this.viewData();
        },

        sortData : function(data) {
            /*
                sort data into a hierarchy based on parentId
            */
            var updatedArray = [];
            for (var ix=0; ix<data.length; ix++)  {
                if (! data[ix].parentId) {
                    updatedArray.push(data[ix]);
                    for (ix1=0; ix1<data.length; ix1++) {
                        if (data[ix1].parentId == data[ix].id) {
                            updatedArray.push(data[ix1]);
                        }
                    }
                }
            }

            return updatedArray;
        },

        viewData: function() {
            var models = this.collection.models;
            var viewData = {"dynamic" : [], "nonDynamic" : []};
            for (i=0; i<models.length; i++) {
                var obj = {};
                obj.name = models[i].get("name");
                obj.id = models[i].get("oid");

                if (models[i].get("parentId")) {
                    obj.parentId = models[i].get("parentId")[this.model.definition.toLowerCase() + "Id"];
                }

                if (models[i].get("dynamic")) {
                    viewData.dynamic.push(obj);
                } else {
                    viewData.nonDynamic.push(obj);
                }
            }

            // sort data
            viewData.dynamic = this.sortData(viewData.dynamic);
            viewData.nonDynamic = this.sortData(viewData.nonDynamic);

            return viewData;
        },

        columnSuggestionHandler: function() {
            var me = this;
            var relationEl = this.formContent.$el.find(".suggestion-box");

            var request = $.ajax({
                type: "GET",
                url: squid_api.apiURL + "/projects/" + squid_api.model.config.get("project") + "/domains/" + squid_api.model.config.get("domain") + "/" + me.model.definition.toLowerCase() + "s-suggestion",
                dataType: 'json',
                data: {
                    "expression" : relationEl.val(),
                    "offset" : relationEl.prop("selectionStart") + 1,
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

        render : function() {
            var me = this;
            var collection = this.collection;

            this.columnsView = Backbone.View.extend({
                initialize: function() {
                    this.collection = collection;
                    this.collection.on("reset change remove sync", this.render, this);
                },
                activatePlugin: function() {
                    this.$el.find("select").bootstrapDualListbox({
                        moveOnSelect: false,
                        showFilterInputs: false,
                        filterTextClear : " ",
                        selectedListLabel: "Available",
                        nonSelectedListLabel: "Selected",
                        selectorMinimalHeight: 250
                    });
                },
                events: {
                    "click .add" : function() {
                        new squid_api.view.ModelManagementView({
                            model : new squid_api.model[me.model.definition + "Model"](),
                            collection : me.collection,
                            parent : me.parent,
                            autoOpen : true,
                            suggestionHandler : me.columnSuggestionHandler,
                            buttonLabel : "add",
                            successHandler : function() {
                                squid_api.model.status.set({'message' : me.model.definition +  " successfully created"});
                                me.collection.create(this);
                            }
                        });
                    },
                    "click .edit" : function(event) {
                        var id = $(event.target).attr("data-value");
                        var model = me.collection.get(id);
                        new squid_api.view.ModelManagementView({
                            model : model,
                            parent : me.parent,
                            collection : me.collection,
                            autoOpen : true,
                            suggestionHandler : me.columnSuggestionHandler,
                            buttonLabel : "add",
                            successHandler : function() {
                                squid_api.model.status.set({'message' : me.model.definition +  " successfully modified"});
                                me.collection.create(this);
                            }
                        });
                    },
                    "click .delete" : function(event) {
                        var id = $(event.target).attr("data-value");
                        var model = me.collection.get(id);
                        if (confirm("are you sure you want to delete the " + model.definition.toLowerCase() + " " + model.get("name") + "?")) {
                            if (true) {
                                model.destroy({
                                    success:function(collection) {
                                        var message = model.definition + " with name " + model.get("name") + " has been successfully deleted";
                                        squid_api.model.status.set({'message' : message});
                                    }
                                });
                            }
                        }
                    },
                    "change select" : function(event) {
                        var dynamic = [];
                        var nonDynamic = [];

                        // update edit element
                        var name = $(event.target).find("option:selected:last").html();
                        var value = $(event.target).find("option:selected:last").val();

                        // update edit / delete buttons
                        if (name !== undefined) {
                            this.$el.find(".edit").removeAttr("disabled");
                            this.$el.find(".edit").html("edit " + name);
                            this.$el.find(".edit").attr("data-value", value);

                            this.$el.find(".delete").removeAttr("disabled");
                            this.$el.find(".delete").html("delete " + name);
                            this.$el.find(".delete").attr("data-value", value);
                        }

                        // selected values in the second select box
                        var options1 = $(this.$el.find("select")[0]).find("option");
                        var options2 = $(this.$el.find("select")[1]).find("option");

                        // store visually updated attributes
                        for (i=0; i<options1.length; i++) {
                            nonDynamic.push(options1[i]);
                        }
                        for (i=0; i<options2.length; i++) {
                            dynamic.push(options2[i]);
                        }
                        // check nonDynamic Data
                        var model;
                        for (i=0; i<nonDynamic.length; i++) {
                            model = this.collection.get($(nonDynamic[i]).val());
                            console.log(model.get("name") + " = non Dynamic");
                            if (model.get("dynamic") === true) {
                                model.set("dynamic", false);
                                model.save();
                            }
                        }
                        // check dynamic Data
                        for (i=0; i<dynamic.length; i++) {
                            model = this.collection.get($(dynamic[i]).val());
                            console.log(model.get("name") + " = dynamic");
                            if (model.get("dynamic") === false) {
                                model.set("dynamic", true);
                                model.save();
                            }
                        }
                    }
                },
                render: function() {
                    this.$el.html(template(me.viewData()));
                    this.activatePlugin();
                    return this;
                }
            });

            // instantiate a new modal view, set the content & automatically open
            if (this.formModal) {
                this.formModal.open();
            } else {
                this.formModal = new Backbone.BootstrapModal({
                    content: new this.columnsView(),
                    cancelText: "close",
                    title: me.type
                });
                this.formModal.open();
            }

            // modal wrapper class
            $(this.formModal.el).addClass(this.modalElementClassName);

            // modal definition class
            $(this.formModal.el).find(".modal-dialog").addClass(me.model.definition + "-primary");

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
