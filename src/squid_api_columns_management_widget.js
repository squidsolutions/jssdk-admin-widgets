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
            if (options.config) {
            	this.config = options.config;
            } else {
            	this.config = squid_api.model.config;
            }

            // relations
            me.relations = new squid_api.model.RelationCollection();
            me.relations.collectionAvailable = true;
            me.relations.parentId = {};
            me.relations.parentId.projectId = squid_api.model.config.get("project");
            me.relations.fetch({
                success: function() {
                    me.relations.fetched = true;
                }
            });
            // domains
            me.domains = new squid_api.model.DomainCollection();
            me.domains.collectionAvailable = true;
            me.domains.parentId = {};
            me.domains.parentId.projectId =  squid_api.model.config.get("project");
            me.domains.fetch({
                success: function() {
                    me.domains.fetched = true;
                }
            });

            if (this.collection) {
                this.collection.on("change", function() {
                    squid_api.model.config.trigger("change:domain", squid_api.model.config);
                    this.collection.fetch();
                }, this);
                this.collection.on("add", function(model) {
                	var period = me.config.get("period");
                	if (! period && model.get("valueType") == "DATE") {
                		var obj = {"name":model.get("name"), "val":"@'" + model.get("id").domainId + "'.@'" + model.get("id").dimensionId + "'"};
                        me.config.set("period",obj);
                	}
                });
                this.collection.on("remove", function(model) {
                	var period = me.config.get("period");
                	if (period.val == "@'" + model.get("id").domainId + "'.@'" + model.get("id").dimensionId + "'") {
                		me.config.unset("period");
                	}
                }, this);
                
                if (! this.collection.fetched) {
                    if (squid_api.model.config.get("domain")) {
                        this.collection.parentId = {
                                projectId : squid_api.model.config.get("project"),
                                domainId : squid_api.model.config.get("domain")
                        };
                        this.collection.fetch();
                    }
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
            
        	// build the parent index
        	var lookup = {};
            for (var ix1=0; ix1<data.length; ix1++)  {
            	lookup[data[ix1].id]=data[ix1];
            }
            // build the sort name
            for (var ix2=0; ix2<data.length; ix2++)  {
            	var parentId = data[ix2].parentId;
            	data[ix2].sortName = data[ix2].name;
            	data[ix2].depth = 0;
            	while (parentId) {
            		var parent = lookup[parentId];
            		if (parent) {
	            		data[ix2].sortName = parent.name + "/" + data[ix2].sortName;
	            		if (data[ix2].depth<5) data[ix2].depth++;
	            		parentId = parent.parentId;
            		} else {
            			break;
            		}
            	}
            }

        	// alphabetical sorting         
            data.sort(function(a, b){
				 var nameA = a.sortName.toLowerCase();
				 var nameB = b.sortName.toLowerCase();
				 if (nameA < nameB)  {
					 // sort string ascending        			 
					 return -1;
				 } else if (nameA > nameB) {
					 return 1;
				 } else {
					 return 0; // no sorting
				 }
        	});

            return data;
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
                        selectedListLabel: "Selected " + me.model.definition.toLowerCase() +"s",
                        nonSelectedListLabel: "Available " + me.model.definition.toLowerCase() +"s",
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
                            buttonLabel : "add",
                            successHandler : function() {
                                squid_api.model.status.set({'message' : me.model.definition +  " successfully modified"});
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
                    "click .relations" : function() {
                        new squid_api.view.RelationModelManagementView({
                            el : this.el,
                            buttonLabel : "<i class='fa fa-arrows-h'></i>",
                            type : "Relation",
                            modalTitle : "Relation for domain: " + this.domainName,
                            collection : me.relations,
                            model : new squid_api.model.RelationModel(),
                            parent : me.domains,
                            autoOpen : true,
                            successHandler : function() {
                                var message = me.type + " with name " + this.get("name") + " has been successfully modified";
                                squid_api.model.status.set({'message' : message});
                            }
                        });
                    },
                    "change select" : function(event) {
                        var dynamic = [];
                        var nonDynamic = [];

                        // update edit element
                        var name = $(event.target).find("option:selected:last").html();
                        var value = $(event.target).find("option:selected:last").val();

                        //update edit / delete buttons
                        if (name !== undefined) {
                            this.$el.find(".edit").removeAttr("disabled");
                            this.$el.find(".edit").html("edit " + name);
                            this.$el.find(".edit").attr("data-value", value);

                            this.$el.find(".delete").removeAttr("disabled");
                            this.$el.find(".delete").html("delete " + name);
                            this.$el.find(".delete").attr("data-value", value);
                        }

                        // selected values in the second select box
                        var options1 = $(this.$el.find("select")[1]).find("option");
                        var options2 = $(this.$el.find("select")[0]).find("option");

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
                                model.set({"dynamic":false},{silent: true});
                            }
                        }
                        // check dynamic Data
                        for (i=0; i<dynamic.length; i++) {
                            model = this.collection.get($(dynamic[i]).val());
                            console.log(model.get("name") + " = dynamic");
                            if (model.get("dynamic") === false) {
                                model.set({"dynamic":true},{silent: true});
                            }
                        }
                        // save changed models to the server
                        var changedModels = 0;
                        for (i=0; i<this.collection.models.length; i++) {
                            if (this.collection.models[i].hasChanged()) {
                                changedModels++;
                                this.collection.models[i].save();
                            }
                        }
                        if (changedModels > 0) {
                            this.collection.trigger("change");
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
