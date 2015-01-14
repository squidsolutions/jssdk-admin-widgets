this["squid_api"] = this["squid_api"] || {};
this["squid_api"]["template"] = this["squid_api"]["template"] || {};

this["squid_api"]["template"]["squid_api_users_admin_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class='sq-loading' style='position:absolute; width:100%; top:40%; z-index: 1;'>\n    <div class=\"spinner\">\n    <div class=\"rect5\"></div>\n    <div class=\"rect4\"></div>\n    <div class=\"rect3\"></div>\n    <div class=\"rect2\"></div>\n    <div class=\"rect1\"></div>\n    <div class=\"rect2\"></div>\n    <div class=\"rect3\"></div>\n    <div class=\"rect4\"></div>\n    <div class=\"rect5\"></div>\n    </div>\n</div>\n<table id=\"squid-api-admin-widgets-user-table\" class=\"sq-table\">\n    <thead>\n        <tr>\n            <th>Login</th>\n            <th>Email</th>\n            <th>Name</th>\n            <th>Groups</th>\n            <th>Action</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td></td>\n            <td></td>\n            <td></td>\n            <td></td>\n            <td></td>\n        </tr>\n    </tbody>\n</table>";
  });
(function (root, factory) {
    root.squid_api.view.UsersAdminView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_usersadmin_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_users_admin_widget;
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

            this.model.on("reset sync", this.render, this);
        },

        render: function() {
            var me = this;
            this.$el.html(this.template());

            var globalID;
            var users = this.model.models;

            if (this.$el.attr("id")) {
                globalID = "#" + this.$el.attr('id');
            } else {
                console.log("No ID assigned to DOM element for User Table");
            }

            if (users) {
                var tableRows = d3.select(globalID + " tbody").selectAll("tr")
                    .data(users).enter().append("tr");

                var loginValue = tableRows.append("td")
                    .text(function(d) {
                        return d.get("objectType");
                    });

                var emailValue = tableRows.append("td")
                    .text(function(d) {
                        return d.get("email");
                    });

                var nameValue = tableRows.append("td")
                    .text(function(d) {
                        return d.get("login");
                    });

                var groupValues = tableRows.append("td")
                    .html(function(d) {
                        var g = d.get("groups");
                        var data = "";
                        for (i=0; i<g.length; i++) {
                            if (g[i] === "admin") {
                                data += "<div class='red'>" + g[i] + "</div>";
                            } else {
                                var pattern = /admin_/;
                                if (pattern.test(g[i])) {
                                    data += "<div class='orange'>" + g[i] + "</div>";
                                } else {
                                    data += "<div>" + g[i] + "</div>";
                                }
                            }    
                        }
                        return data;
                    });

                var actionValues = tableRows.append("td")
                    .html(function(d) {
                        return "";
                    });
            }

            this.$el.find("#squid-api-admin-widgets-user-table").DataTable({
                "lengthChange": false
            });

        }

    });

    return View;
}));
