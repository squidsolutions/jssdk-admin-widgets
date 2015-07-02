(function (root, factory) {
    root.squid_api.view.CollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        collection : null,
        config : null,
        type : null,
        collectionAvailable : false,
        suggestionHandler : null,
        changeEventHandler : null,
        schemasCallback : null,
        beforeRenderHandler : null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            if (options.changeEventHandler) {
                this.changeEventHandler = options.changeEventHandler;
            }
            if (options.type) {
                this.type = options.type;
            }
            if (options.config) {
                this.config = options.config;
            } else {
                this.config = squid_api.model.config;
            }
            if (options.parent) {
                this.parent = options.parent;
            }
            if (!this.model) {
                this.model =  new squid_api.model[this.type + "Model"]();
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

            // set base then update
            this.collection = new squid_api.model.BaseCollection();
            this.updateCollection();

            this.collection.on("reset change remove sync", this.render, this);

            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.parent, "change:id", function(parent) {
                me.collectionAvailable = true;
                me.collection.parentId = parent.get("id");
                me.collection.fetch();
            });

            this.listenTo(config, "change:" + this.model.definition.toLowerCase() , function(parent) {
                me.collectionAvailable = true;
                me.collection.parentId = {};
                me.collection.parentId = me.parent.get("id");
                me.collection.fetch();

                // set model
                var modelDef = config.get(me.model.definition.toLowerCase());
                var modelItem = me.collection.get(modelDef);
                if (modelItem) {
                    me.model.set(modelItem.toJSON());
                }
            });
        },
        
        setModel : function(model) {
            this.model = model;
            this.listenTo(this.model, "change", this.render);
        },

        events: {
            "click button": function() {
                $(".squid-api-" + this.type + "-model-widget-popup").dialog("open");
            }
        },

        updateCollection: function() {
            var me = this;

            // match a base collection and overwrite base
            var collection = null;
            for (var collectionItem in squid_api.model) {
                var str = collectionItem;
                var res = str.match(this.type + "Collection");
                if (res) {
                    this.collection = new squid_api.model[res]();
                }
            }
        },

        actionEvents: function(roles) {
            var me = this;

            // select
            $(".squid-api-" + this.type + "-model-widget-popup .select").on("click", function() {
                var value = $(this).parent('tr').attr('data-attr');

                if (me.changeEventHandler) {
                    $(".squid-api-" + this.type + "-model-widget-popup").dialog("close");
                    me.changeEventHandler.call(this, value);
                } else {
                    console.log('no change handler defined');
                }

                // set the selected model
                var models = me.collection.models;
                var model;
                for (i=0; i<models.length; i++) {
                    if (models[i].get("oid") == value) {
                        model = models[i];
                        break;
                    }
                }
                me.model.set(model);
            });

            if (roles.create) {
                 // create base model for create
                var baseModel = new squid_api.model[ this.type + "Model"]();

                // create
                new api.view.ModelManagementView({
                    el : $(".squid-api-" + this.type + "-model-widget-popup .create"),
                    model : baseModel,
                    parent : me.parent,
                    suggestionHandler : me.suggestionHandler,
                    schemasCallback : me.schemasCallback,
                    beforeRenderHandler : me.beforeRenderHandler,
                    buttonLabel : "<i class='fa fa-plus'></i>",
                    successHandler : function() {
                        if (me.changeEventHandler) {
                            me.changeEventHandler.call(this);
                        }
                        var message = me.type + " with name " + this.get("name") + " has been successfully created";
                        squid_api.model.status.set({'message' : message});
                    }
                });
            }

            // edit
            $(".squid-api-" + this.type + "-model-widget-popup .edit").on("click", function() {
                var id = this.parentElement.dataset.attr;
                var model = me.collection.get(id);
                new api.view.ModelManagementView({
                    el : $(this),
                    model : model,
                    parent : me.parent,
                    autoOpen : true,
                    suggestionHandler : me.suggestionHandler,
                    schemasCallback : me.schemasCallback,
                    beforeRenderHandler : me.beforeRenderHandler,
                    buttonLabel : "edit",
                    successHandler : function() {
                        var message = me.type + " with name " + this.get("name") + " has been successfully modified";
                        squid_api.model.status.set({'message' : message});
                    }
                });
            });

            // delete
            $(".squid-api-" + this.type + "-model-widget-popup .delete").on("click", function() {
                var id = this.parentElement.dataset.attr;
                var model = me.collection.get(id);

                if (confirm("are you sure you want to delete the " + model.definition.toLowerCase() + " " + model.get("name") + "?")) {
                    if (true) {
                        model.destroy({
                            success:function(collection) {
                                var message = me.type + " with name " + collection.get("name") + " has been successfully deleted";
                                squid_api.model.status.set({'message' : message});
                            }
                        });
                    }
                }
            });
        },

        userRoles: function() {
            // roles
            var roles = {"create" : false, "edit" : false, "delete" : false};

            var modelRole = this.model.get("_role");
            var customerRole = squid_api.model.customer.get("_role");

            // write role
            if (modelRole == "WRITE" || modelRole == "OWNER" || customerRole == "OWNER" || customerRole == "WRITE") {
                roles.create = true;
                roles.edit = true;
                roles.delete = true;
            }

            return roles;
        },

        render: function() {
            var me = this;
            var roles = this.userRoles();

            var jsonData = {"selAvailable" : false, "type" : this.type, "options" : [], "valueSelected" : false, "create" : roles.create, "collectionAvailable" : this.collectionAvailable, "renderEl" : this.renderEl};
            var models = this.collection.models;

            // selected obj
            var sel = [];

            // populate view data
            for (i=0; i<models.length; i++) {
                jsonData.selAvailable = true;
                var selected = false;
                // obtain name from model
                var oid = models[i].get("oid");
                if (oid) {
                    if (this.config.get(this.type.toLowerCase()) === oid) {
                        jsonData.selectedName = models[i].get("name");
                        selected = true;
                    }
                }
                var option = {"label" : models[i].get("name"), "value" : oid, "selected" : selected, "edit" : roles.edit, "delete" : roles.delete};
                if (selected) {
                    jsonData.valueSelected = true;
                    sel.push(option);
                } else {
                    jsonData.options.push(option);
                }
            }

            // order data alphabetically
            jsonData.options.sort(function(a, b) {
                var textA = a.label.toUpperCase();
                var textB = b.label.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });

            // place selected obj at start of array
            if (sel[0]) {
                jsonData.options.unshift(sel[0]);
            }

            // remove old dialog's
            $(".squid-api-" + this.type + "-model-widget-popup").remove();

            // print template
            var html = this.template(jsonData);
            this.$el.html(html);

            // set button value
            this.$el.find("button.selected-model").text(jsonData.selectedName);

            // set dialog
            var dialog = this.$el.find(".squid-api-" + this.type + "-model-widget-popup").dialog({
                dialogClass: "squid-api-model-widget-popup",
                clickOutside: true, // clicking outside the dialog will close it
                clickOutsideTrigger: this.$el.find("button"), // Element (id or class) that triggers the dialog opening
                autoOpen: false,
                position: {
                    my: "left top", at: "left bottom", of: this.$el.find("button")
                }
            });

            // select, edit, delete events
            this.actionEvents(roles);

            return this;
        }

    });

    return View;
}));
