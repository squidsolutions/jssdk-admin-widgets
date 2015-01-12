(function (root, factory) {
    root.squid_api.view.UserAdminView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_useradmin_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        format : null,
        d3Formatter : null,
        appRenderedInto : null,

        initialize: function(options) {
            var me = this;

            // init the users
            this.model.on("reset sync", this.render, this);

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_user_admin_widget;
            }
            
            if (options.format) {
                this.format = options.format;
            } else {
                // default number formatter
                if (this.d3Formatter) {
                    this.format = function(f){
                        if (isNaN(f)) {
                            return f;
                        } else {
                            return me.d3Formatter(f);
                        }
                    };
                } else {
                    this.format = function(f){
                        return f;
                    };
                }
            }
        },

        setModel: function(model) {
            this.model = model;
            this.initialize();

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
                            data += g[i] + "<br />";
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
