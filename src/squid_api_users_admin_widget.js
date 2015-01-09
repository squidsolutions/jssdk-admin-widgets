(function (root, factory) {
    root.squid_api.view.UsersAdmin = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_users_admin_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }

            // init the model
            if (!this.model) {
                var users = new squid_api.model.UserCollection({"id" : {"customerId" : squid_api.customerId}});
                this.model = users;
                squid_api.model.login.on('change:login', function(model) {
                    // performed when login is updated
                    if (model.get("login")) {
                        //init the users
                        users.fetch({
                            success : function(model, response) {
                                // console.log(model);
                            },
                            error : function(model, response) {
                                console.log(model);
                            }
                        });
                    }
                });
            }
            this.model.on("reset sync", this.process, this);
            
        },

        events: {
        },
        
        process : function() {
            this.render();
        },

        render: function() {
            // display

            var user, jsonData = {"users" : []};

            for (var i=0; i<this.model.size(); i++) {
                user = this.model.at(i);
                if (user) {
                    // add to display
                    jsonData.users.push(user.toJSON());
                }
            }

            var html = this.template(jsonData);
            this.$el.html(html);
            this.$el.show();

            return this;
        }

    });

    return View;
}));
