(function (root, factory) {
    root.squid_api.view.DomainCollectionManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api) {

    var View = squid_api.view.BaseCollectionManagementWidget.extend({
        type : "Domain",
        typeLabel : "Domain",
        typeLabelPlural : "Domains",
        modelView : null,
        collectionLoading : false,
        configSelectedId : "domain",
        configParentId : "project",

        init : function() {
            var me = this;
            this.modelView = squid_api.view.BaseModelManagementWidget;
            this.relationView = squid_api.view.RelationCollectionManagementWidget;
        },
        
        loadCollection : function(parentId) {
            return squid_api.getCustomer().then(function(customer) {
                return customer.get("projects").load(parentId).then(function(project) {
                    return project.get("domains").load();
                });
            });
        },

        events: {
            'mouseenter tr': function(event) {
                this.eventMouseEnter(event);
            },
            'mouseleave tr': function(event) {
                this.eventMouseLeave(event);
            },
            "click .create" : function(event) {
                this.eventCreate(event);
            },
            "click .edit": function(event) {
                this.eventEdit(event);
            },
            "click .refresh": function(event) {
                this.eventRefresh(event);
            },
            "click .delete": function(event) {
                this.eventDelete(event);
            },
            "click .select": function(event) {
                this.eventSelect(event);
            },
            "click .copy-id": function(event) {
                this.eventCopy(event);
            },
            "click .relation": function(event) {
                var me = this;
                var modelValue = $(event.target).parents('tr').attr("data-attr");
                this.renderRelationView(new this.relationView({
                    modelValue : modelValue,
                    cancelCallback : function() {
                        me.render();
                    }
                }));
            }
        },

        renderRelationView: function(relationView) {
            this.$el.html(relationView.el);
        },
        
        getModelLabel: function(model) {
            if (model.get("dynamic")) {
                return "~ " + model.get("name");
            } else {
                return model.get("name");
            }
        },
        
        getModelRoles : function(model) {
            var roles = squid_api.view.BaseCollectionManagementWidget.prototype.getModelRoles.call(this, model);
            roles.relation = true;
            return roles;
        }

    });

    return View;
}));
