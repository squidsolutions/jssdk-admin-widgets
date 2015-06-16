(function (root, factory) {
    root.squid_api.view.CollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        collection : null,
        config : null,
        type : null,
        collectionAvailable : false,

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

            // set base then update
            this.collection = new squid_api.model.BaseCollection();
            this.updateCollection();

            this.config.on("change", this.render, this);
            this.collection.on("reset change remove sync", this.render, this);

            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.parent, "change:id", function(parent) {
                me.collectionAvailable = true;
                me.collection.parentId = parent.get("id");
                me.collection.fetch();
            });
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

        actionEvents: function() {
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
            
            // create base model for create
            var baseModel = new squid_api.model[ this.type + "Model"]();
            
            // create
            new api.view.ModelManagementView({
                el : $(".squid-api-" + this.type + "-model-widget-popup .new-model"),
                model : baseModel,
                buttonLabel : "<i class='fa fa-pencil'></i>",
                successHandler : function() {
                    me.collection.create(this);
                    var message = me.type + " with name " + this.get("name") + " has been successfully created";
                    squid_api.model.status.set({'message' : message});
                }
            });

            // edit
            $(".squid-api-" + this.type + "-model-widget-popup .edit").on("click", function() {
                var id = this.parentElement.dataset.attr;
                var model = me.collection.get(id);
                new api.view.ModelManagementView({
                    el : $(this),
                    model : model,
                    autoOpen : true,
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

                if (confirm("are you sure you want to delete this " + this.type + "?")) {
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

        render: function() {
            var me = this;

            var jsonData = {"selAvailable" : false, "type" : this.type, "options" : [], selectedName : "Select " + this.type, collectionAvailable : this.collectionAvailable};
            var models = this.collection.models;

            // populate view data
            for (i=0; i<models.length; i++) {
                jsonData.selAvailable = true;
                var selected = false;

                // obtain name from model
                if (models[i].get("id")) {
                    if (models[i].get("id")[this.type.toLowerCase() + "Id"]) {
                        if (this.config.get(this.type.toLowerCase()) === models[i].get("id")[this.type.toLowerCase() + "Id"]) {
                            jsonData.selectedName = models[i].get("name");
                            selected = true;
                        }
                    }
                }
                var option = {"label" : models[i].get("name"), "value" : models[i].get("oid"), "selected" : selected};
                jsonData.options.push(option);
            }

            // remove old dialog's
            $(".squid-api-" + this.type + "-model-widget-popup").remove();

            // print template
            var html = this.template(jsonData);
            this.$el.html(html);

            // set button value
            this.$el.find("button.selected-model").text(jsonData.selectedName);

            // set dialog
            this.$el.find(".squid-api-" + this.type + "-model-widget-popup").dialog({
                dialogClass: "squid-api-model-widget-popup",
                clickOutside: true, // clicking outside the dialog will close it
                clickOutsideTrigger: this.$el.find("button"), // Element (id or class) that triggers the dialog opening
                autoOpen: false,
                closeText: "x",
                show: {
                    effect: "fade",
                    duration: 350
                },
                hide: {
                    effect: "fade",
                    duration: 350
                },
                position: { 
                    my: "left top", at: "left bottom", of: this.$el.find("button")
                }
            });

            // select, edit, delete events
            this.actionEvents();

            return this;
        }

    });

    return View;
}));
