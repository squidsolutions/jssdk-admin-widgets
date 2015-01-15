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

            this.model.on("reset change remove sync", this.render, this);
        },

        events: {
            'click td'  : 'edit',
            'click .save'  : 'saveUser',
            'click .delete'  : 'delete',
            'blur .edit' : 'close'
        },

        delete: function(item) {
            // Get the ID to find model in collection
            var modelId = $(item.currentTarget).parents('tr').attr('data-id');

            // Model to remove
            var model = this.model.get(modelId);

            // Remove from collection
            this.model.remove(modelId);

            // Delete on the server
            model.destroy();
        },

        edit: function(item) {
            // Show text inputs and focus on the clicked field
            $(".editing").removeClass("editing");
            $(item.currentTarget).addClass("editing");
            $(item.currentTarget).find("input").focus();
        },

        close: function(item) {
            // Previous Value
            var previousValue = this.$('.editing label').text();

            // Updated Value
            var value = this.$('.editing .edit').val();

            // Model Attribute to update
            var modelAttr = this.$('.editing .edit').attr('data-attribute');

            // Get the ID to find model in collection
            var modelId = this.$('.editing').parent("tr").attr('data-id');

            // Trim the value
            var trimmedValue = value.trim();

            if (trimmedValue) {
                if (previousValue !== trimmedValue) {
                    // Get model to update
                    var model = this.model.get(modelId);

                    // Create new object for model
                    var data = {};
                    data[modelAttr] = value;

                    // Update model (which also updates collection)
                    model.set(data);

                    // Update on server
                    model.save();
                }
            } else {
                this.clear();
            }

            $(".editing").removeClass("editing");
        },

        render: function() {
            var me = this;

            // Render Template
            this.$el.html(this.template());

            // Set ID for Table Render
            var globalID;

            if (this.$el.attr("id")) {
                globalID = "#" + this.$el.attr('id');
            } else {
                console.log("No ID assigned to DOM element for User Table");
            }

            // Collection models as an array of objects
            var users = this.model.toJSON();

            // If users exist then create data table in D3
            if (users) {
                var tableRows = d3.select(globalID + " tbody").selectAll("tr")
                    .data(users)
                    .enter()
                    .append("tr") 
                    .attr("data-id", function(d) {
                        return d.id.userId; //So backbone recognises the model on update
                    });

                var loginValue = tableRows.append("td")
                    .html(function(d) {
                        return "<label>" + d.login + "</label><input class='edit form-control input-sm' data-attribute='login' value='" + d.login + "'/>" ;
                    });

                var emailValue = tableRows.append("td")
                    .html(function(d) {
                        return "<label>" + d.email + "</label><input class='edit form-control input-sm' data-attribute='email' value='" + d.email + "'/>" ;
                    });

                var nameValue = tableRows.append("td")
                    .html(function(d) {
                        return "N/A";
                    });

                var groupValues = tableRows.append("td")
                    .html(function(d) {
                        var g = d.groups;
                        var data = "";

                        // Groups colour logic
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
                        return "<button class='delete btn btn-default'>x</button>";
                    });
            }

            // Instantiate Data Table Plugin
            this.$el.find("#squid-api-admin-widgets-user-table").DataTable({
                "lengthChange": false
            });

        }

    });

    return View;
}));
