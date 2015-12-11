(function (root, factory) {
    root.squid_api.view.ColumnsManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_columns_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.CollectionManagementWidget.extend({
        modelView : squid_api.view.ModelManagementWidget,
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
                    this.collection.saveAll(this.collection.models).then(function(collection, model) {
                        me.refreshCollection();
                    });
                }
            }
        },

        initCollection : function() {
            var me = this;
            // listen for project/domain change

            this.config.on("change:domain", function (config) {
                squid_api.getSelectedDomain().always( function(domain) {
                    me.collection = domain.get(me.typeLabelPlural.toLowerCase());
                    me.collection.parentId = {
                        "projectId" : me.config.get("project"),
                        "domainId" : me.config.get("domain")
                    };
                    me.initListeners();
                });
            });
        },

        refreshCollection: function() {
            this.config.trigger("change:domain", this.config);
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
                selectedListLabel: "Selected " + this.typeLabelPlural + " -",
                nonSelectedListLabel: "Available " + this.typeLabelPlural + " -",
                selectorMinimalHeight: 250
            });
        },
        viewData: function() {
            var models = this.collection.models;
            var viewData = {"dynamic" : [], "nonDynamic" : [], "typeLabelPlural" : this.typeLabelPlural};
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
