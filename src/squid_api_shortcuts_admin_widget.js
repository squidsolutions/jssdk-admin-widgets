(function (root, factory) {
    root.squid_api.view.ShortcutsAdminView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_shortcuts_admin_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        onSave : null,

        initialize: function(options) {

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            
            if (options.onSave) {
                this.onSave = options.onSave;
            }
            
            if (!this.model) {
                this.model = squid_api.model.status;
            }

            this.render();
        },

        events: {
            'click #saveBtn'  : 'saveShortcut',
        },

        render: function() {
            var me = this;
            this.$el.html(this.template());
        },
        
        saveShortcut : function(event) {
            event.preventDefault();
            var me = this;
            var shortcutId = this.$el.find("#shortcutId").val();
            if (shortcutId === "") {
                shortcutId =  null;
            }
            var shortcutName = this.$el.find("#shortcutName").val();
            var currentStateId = this.model.get("state").get("oid");
            var shortcutModel = new squid_api.model.ShortcutModel();
            var data = {
                "id" : {
                    "customerId" : this.customerId,
                    "shortcutId" : shortcutId
                },
                "name" : shortcutName,
                "stateId" : currentStateId
            };
            shortcutModel.save(data, {
                success : function(model, response, options) {
                    me.model.set("message", "Shortcut successfully saved with Id : "+model.get("oid"));
                    if (me.onSave) {
                        me.onSave.call();
                    }
                },
                error : function(model, response, options) {
                    me.model.set('error', 'Shortcut save failed');
                }
            });
        }
    });

    return View;
}));
