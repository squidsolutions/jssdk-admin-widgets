(function (root, factory) {
    root.squid_api.view.ColumnsManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_columns_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseCollectionManagementWidget.extend({
        modelView : squid_api.view.ColumnsModelManagementWidget,
        configParentId : "domain",
        
        events: {
            "change select" : function(event) {
                var me = this;
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
                var changeCount = 0;
                for (i=0; i<nonDynamic.length; i++) {
                    model = this.collection.get($(nonDynamic[i]).val());
                    if (model.get("dynamic") === true) {
                        changeCount++;
                        model.set({"dynamic":false},{silent: true});
                    }
                }
                // check dynamic Data
                for (i=0; i<dynamic.length; i++) {
                    model = this.collection.get($(dynamic[i]).val());
                    if (model.get("dynamic") === false) {
                        changeCount++;
                        model.set({"dynamic":true},{silent: true});
                    }
                }

                // update all models at the same time
                if (changeCount > 0) {
                    this.collection.saveAll(this.collection.models).then(function() {
                        // TODO fetch the parent as it may have changed from non dynamic to dynamic
                        // but this resets the parent collections as the API returns an empty array
                        // me.collection.parent.fetch().done(function() {
                        me.collection.parent.set("dynamic", false);
                        
                        // force a filters re-computation because dimension selector uses it
                        // TODO do not trigger if the collection is metrics
                        me.config.trigger("change:selection");
                        
                    });
                }
            },
            "click .create": function() {
                var me = this;
                // create a new model
                var model = new this.collection.model();
                model.set("id", this.collection.parent.get("id"));
                // listen for new model changes
                me.listenTo(model, "sync", function() {
                    me.collection.add(model);
                    me.render();
                });
                
                this.renderModelView(new this.modelView({
                    model : model,
                    cancelCallback : function() {
                        me.render();
                    }
                }));
            },
            "click .edit": function(event) {
                var me = this;
                var id = $(event.target).attr("data-value");
                var model = this.collection.findWhere({"oid" : id});
                // listen for model changes
                me.listenTo(model, "change", function() {
                    me.render();
                });
                this.renderModelView(new this.modelView({
                    model : model,
                    cancelCallback : function() {
                        me.render();
                    }
                }));
            },
            "click .refresh": function(event) {
                var id = $(event.target).attr("data-value");
                var model = this.collection.get(id);
                squid_api.refreshObjectType(model);
            },
            "click .delete": function(event) {
                var me = this;
                var id = $(event.target).attr("data-value");
                var model = this.collection.findWhere({"oid" : id});
                if (confirm("are you sure you want to delete the " + model.definition.toLowerCase() + " " + model.get("name") + "?")) {
                    if (true) {
                        model.destroy({
                            wait : true,
                            success:function(model) {
                                // set status
                                var message = me.type + " with name " + model.get("name") + " has been successfully deleted";
                                me.status.set({'message' : message});
                            },
                            error : function(collection, response) {
                                me.status.set({'error' : response});
                            }
                        });
                    }
                }
            }
        },
        
        loadCollection : function(parentId) {
            var me = this;
            return squid_api.getCustomer().then(function(customer) {
                return customer.get("projects").load(me.config.get("project")).then(function(project) {
                    return project.get("domains").load(parentId).then(function(domain) {
                        return domain.get(me.typeLabelPlural.toLowerCase()).load();
                    });
                });
            });
        },

        init : function() {
            var me = this;
            this.modelView = squid_api.view.ColumnsModelManagementWidget;
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
        activatePlugin: function() {
            this.$el.find("select").bootstrapDualListbox({
                moveOnSelect: false,
                showFilterInputs: false,
                filterTextClear : " ",
                selectedListLabel: "Active",
                nonSelectedListLabel: "Inactive",
                infoText: '({0})',
                infoTextEmpty: "(0)",
                selectorMinimalHeight: 250
            });
        },
        viewData: function() {
            var viewData = {"dynamic" : [], "nonDynamic" : [], "typeLabelPlural" : this.typeLabelPlural};
            if (this.collection) {
                var models = this.collection.models;
                for (i=0; i<models.length; i++) {
                    var obj = {};
                    obj.name = models[i].get("name");
                    obj.id = models[i].get("oid");

                    if (models[i].get("parentId")) {
                        obj.parentId = models[i].get("parentId")[this.type.toLowerCase() + "Id"];
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
            }
            return viewData;
        },
        render : function() {
            this.$el.html(template(this.viewData()));
            this.activatePlugin();
            return this;
        }
    });

    return View;
}));
