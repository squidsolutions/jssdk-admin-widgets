(function (root, factory) {
    root.squid_api.view.CollectionSelectorUtils = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api) {

    var Utils = {

        handleStatus: function() {
            var select = this.$el.find("select");
            var multiSelectDropdown = this.$el.find(".multiselect-container");
            if (select) {
                var isMultiple = true;
                var running = (squid_api.model.status.get("status") !== squid_api.model.status.STATUS_DONE);
                if (running) {
                    // computation is running : disable input
                    select.attr("disabled","disabled");
                    if (isMultiple) {
                        select.multiselect('disable');
                        multiSelectDropdown.append("<div class='dropdownDisabled'></div>");
                    }
                } else {
                    // computation is done : enable input
                    select.removeAttr("disabled");
                    if (isMultiple) {
                        select.multiselect('enable');
                        multiSelectDropdown.find(".dropdownDisabled").remove();
                    }
                }
            }
        },

        events: {
            "change": function() {
                var oid = this.$el.find("select option:selected");
                // Remove Button Title Tag
                this.$el.find("button").removeAttr('title');

                var chosen = this.config.get(this.chosen);
                var selected = [];

                // build the selection array
                for (i = 0; i < oid.length; i++) {
                    var selectedOid = $(oid[i]).val();
                    selected.push(selectedOid);
                }

                // check for additions
                chosenNew = _.intersection(_.union(chosen, selected), selected);

                // Update
                this.config.set(this.chosen,chosenNew);
            }
        },

        render: function() {
            if (this.collection) {
                var me = this, isMultiple = true;

                var jsonData = {"selAvailable" : true, "options" : [], "multiple" : isMultiple};

                // iterate through all domains items
                var items = this.collection;
                var domain = this.collection.parent;
                var noneSelected = true;
                for (var idx=0; idx<items.models.length; idx++) {
                    var item = items.models[idx];

                    // check if selected
                    var selected = me.isChosen(item);
                    if (selected === true) {
                        noneSelected = false;
                    }
                    
                    var option = {
                            "label" : item.get("name"), 
                            "value" : item.get("oid"), 
                            "selected" : selected
                    };
                    
                    // check dynamic rules
                    if ((domain.get("dynamic") === true) || (item.get("dynamic") === false)) {
                        jsonData.options.push(option);
                    }
                }

                // Alphabetical Sorting
                jsonData.options = me.sort(jsonData.options);

                // check if empty
                if (jsonData.options.length === 0) {
                    jsonData.empty = true;
                }

                if ((!me.selector) || (jsonData.options.length === 0)) {
                    // fist render or no data to display
                    var html = me.template(jsonData);
                    me.$el.html(html);
                    me.$el.show();

                    // Initialize plugin
                    me.selector = me.$el.find("select");
                    if (isMultiple) {
                        me.selector.multiselect({
                            "buttonContainer": '<div class="squid-api-data-widgets-metric-selector-open" />',
                            "buttonText": function() {
                                return 'Items';
                            },
                            "onDropdownShown": function() {
                                me.showConfiguration();
                            }
                        });
                    }

                    // Remove Button Title Tag
                    me.$el.find("button").removeAttr('title');
                } else {
                    // update render
                    me.selector.multiselect("dataprovider", jsonData.options);
                    me.showConfiguration();
                }
            }
            return this;
        },

        showConfiguration: function() {
            var me = this;
            squid_api.getSelectedProject().done( function(project) {
                if (project.get("_role") === "WRITE" || project.get("_role") === "OWNER") {

                    // place dimension collection in modal view
                    var dimensionModal = new squid_api.view.ModalView({
                        view : me.collectionManagementView
                    });

                    me.$el.find("li").first().before("<li class='configure'> configure</option>");
                    me.$el.find("li").first().on("click", function() {
                        // trigger dimension management view
                        dimensionModal.render();
                    });
                }
            });
        },

        sort: function(items) {
            return items.sort(function(a, b) {
                var labelA=a.label.toLowerCase(), labelB=b.label.toLowerCase();
                if (labelA < labelB) {
                    return -1;
                }
                if (labelA > labelB) {
                    return 1;
                }
                return 0; // no sorting
            });
        },

        isChosen : function(item) {
            var selected = false;
            var items = this.config.get(this.chosen);

            if (items) {
                for (var j=0; j<items.length; j++) {
                    if (item.get("oid") === items[j]) {
                        selected = true;
                    }
                }
            }
            return selected;
        }

    };

    return Utils;
}));
