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
                // Connect to the api to retrieve user/group collections
                var users = new squid_api.model.UserCollection({"id" : {"customerId" : squid_api.customerId}});
                var groups = new squid_api.model.GroupCollection({"id" : {"customerId" : squid_api.customerId}});

                // Make these collections accessible
                this.model = users;
                this.groups = groups;

                // Retrieve collections
                squid_api.model.login.on('change:login', function(model) {
                    // Performed when login is updated
                    if (model.get("login")) {
                        // Init the users
                        users.fetch({
                            success : function(model, response) {

                            },
                            error : function(model, response) {
                                console.log(model);
                            }
                        });
                        // Init the groups
                        groups.fetch({
                            success : function(model, response) {

                            },
                            error : function(model, response) {
                                console.log(model);
                            }
                        });
                    }
                });
            }

            // Collection change events
            this.model.on("reset change remove sync", this.render, this);
            this.groups.on("reset change sync", this.render, this);
        },

        events: {
            'click td'  : 'edit',
            'click .save'  : 'saveUser',
            'click .delete'  : 'deleteUser',
            'blur .edit' : 'close',
            'click .group-value' : 'deleteGroup',
            'mouseover .group-value' : 'groupMouseOver',
            'mouseout .group-value' : 'groupMouseOut'
        },

        groupMouseOver: function(item) {
            this.groupColor = $(item.currentTarget).css('background-color');
            $(item.currentTarget).animate({backgroundColor:'#e74c3c'}, "fast");
        },

        groupMouseOut: function(item) {
            $(item.currentTarget).animate({backgroundColor: this.groupColor});      
        },

        deleteGroup: function(item) {

            // Obtain current groupId
            var groupItems = $(item.currentTarget).siblings('div');
            var groups = [];
            for (i=0; i<groupItems.length; i++) {
                groups.push($(groupItems[i]).attr('attr-value'));
            }

            // Get the ID to find model in collection
            var modelId = $(item.currentTarget).parents('tr').attr('data-id');

            // Model to remove
            var model = this.model.get(modelId);

            // Create new object for model
            var data = {};
            data.groups = groups;

            // Save onto the server
            model.save(data);
        },

        deleteUser: function(item) {
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
            // Show text inputs
            $(".editing").removeClass("editing");
            $(item.currentTarget).addClass("editing");
            $(item.currentTarget).find("input").focus();
        },

        close: function(item) {
            /*
                Called after input areas have been manually focused by the user
            */

            // Variable setup
            var previousValue;
            var groupData;
            var groupArray = [];

            // Retrieve previous value from label / div fields
            if (this.$('.editing label').length > 0) {
                previousValue = this.$('.editing label').text();
            }
            else {
                groupData = this.$('.editing div');
                for (i=0; i<groupData.length; i++) {
                    groupArray.push($(groupData[i]).attr('attr-value'));
                }
                previousValue = "";
            }

            // Model Attribute to update
            var modelAttr = this.$('.editing .edit').attr('data-attribute');

            // Updated Value
            var value;
            if (this.$('.editing select.edit').length === 0) {
                value = this.$('.editing input.edit').val();
            } else {
                value = this.$('.editing select.edit option:selected').val();
            }

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

                    if (modelAttr === 'groups') {
                        groupArray.push(value);
                        data[modelAttr] = groupArray;
                    } else {
                        data[modelAttr] = value;  
                    }
                    
                    // Update model (which also updates collection)
                    model.set(data);

                    // Update on server
                    model.save();
                }
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
            var groups = this.groups.toJSON();

            // If users exist then create data table in D3
            if (users && groups) {
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
                                data += "<div class='red group-value' attr-id='groupId' class='red' attr-value='" + g[i] + "></div>";
                            } else {
                                var pattern = /admin_/;
                                if (pattern.test(g[i])) {
                                    data += "<div class='orange group-value' attr-id='groupId' class='orange' attr-value='" + g[i] + "'></div>";
                                } else {
                                    data += "<div class='group-value' attr-id='groupId' attr-value='" + g[i] + "'></div>";
                                }
                            }    
                        }
                        data += "<select class='edit form-control input-sm' data-attribute='groups'>";
                            for (var key in groups) {
                                if (groups[key].id) {
                                    data += "<option value='" + groups[key].id.userGroupId + "'>" + groups[key].name + "</option>";
                                }
                            }
                        data += "</select>";
                        return data;
                    });
                
                // Print group names instead of their Id's
                this.assignGroupNames();

                var actionValues = tableRows.append("td")
                    .html(function(d) {
                        return "<button class='delete btn btn-default'>x</button>";
                    });
            }

            // Instantiate Data Table Plugin
            this.$el.find("#squid-api-admin-widgets-user-table").DataTable({
                "lengthChange": false
            });

            console.log('render end');

        },

        assignGroupNames: function() {
            /*
                Retrive groupId / attribute values and match with api group data
                If we have a match, print the name of the group directly as the dom el.
            */
            var groupIds = $('div[attr-id="groupId"]');
            var groups = this.groups.toJSON();
            if (groupIds.length > 0) {
                for (i=0; i<groupIds.length; i++) {
                    for (var key in groups) {
                        if (groups[key].oid === $(groupIds[i]).attr('attr-value')) {
                            $(groupIds[i]).text(groups[key].name);
                        }
                    }
                    var id = $(groupIds[i]).attr('attr-value');
                }
            }
        }
    });

    return View;
}));
