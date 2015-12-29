(function (root, factory) {
    root.squid_api.view.CollectionSelectorUtils = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api) {

    /**
     * Utility class to provide common methods collection selectors
     */
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

        showConfiguration: function() {
            var me = this;
            squid_api.getSelectedProject().done( function(project) {
                if (project.get("_role") === "WRITE" || project.get("_role") === "OWNER") {

                    // place dimension collection in modal view
                    if (! me.columnConfigurationModal) {
                        me.columnConfigurationModal = new squid_api.view.ModalView({
                            view : me.collectionManagementView
                        });
                    }

                    me.$el.find("li").first().before("<li class='configure'> configure</option>");
                    me.$el.find("li").first().on("click", function() {
                        // trigger dimension management view
                       me.columnConfigurationModal.render();
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
        },
        
        renderButton: function() {
            var label = this.typeLabelPlural;
            var jsonData = {
                label : label,
                visible : false,
                collectionLoaded : !this.collectionLoading,
                collection : this.collection,
                typeLabelPlural : this.typeLabelPlural
            };
            if (this.collection || this.collectionLoading) {
                jsonData.visible = true;
                if (this.selectedModel) {  
                    if (this.selectedModel.get("oid")) {
                        jsonData.label = this.selectedModel.get("name");
                    }
                }
            }
            this.$el.html(this.template(jsonData));

            return this;
        }

    };

    return Utils;
}));
