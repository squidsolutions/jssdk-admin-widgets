this["squid_api"] = this["squid_api"] || {};
this["squid_api"]["template"] = this["squid_api"]["template"] || {};

this["squid_api"]["template"]["squid_api_users_admin_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class='sq-loading' style='position:absolute; width:100%; top:40%; z-index: 1;'>\n    <div class=\"spinner\">\n    <div class=\"rect5\"></div>\n    <div class=\"rect4\"></div>\n    <div class=\"rect3\"></div>\n    <div class=\"rect2\"></div>\n    <div class=\"rect1\"></div>\n    <div class=\"rect2\"></div>\n    <div class=\"rect3\"></div>\n    <div class=\"rect4\"></div>\n    <div class=\"rect5\"></div>\n    </div>\n</div>\n<table id=\"squid-api-admin-widgets-user-table\" class=\"sq-table\">\n    <thead>\n        <tr>\n            <th>Login</th>\n            <th>Email</th>\n            <th>Password</th>\n            <th>Name</th>\n            <th>Groups</th>\n            <th>Action</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td><input class=\"add form-control input-sm\" placeholder=\"Login Value...\" data-attribute=\"login\"></td>\n            <td><input class=\"add form-control input-sm\" placeholder=\"Email Value...\" data-attribute=\"email\"></td>\n            <td><input class=\"add form-control input-sm\" placeholder=\"Password...\" data-attribute=\"password\"></td>\n            <td></td>\n            <td></td>\n            <td><button class=\"add btn btn-default\" data-value=\"add\">Add</button></td>\n        </tr>\n    </tbody>\n</table>";
  });
(function (root, factory) {
    root.squid_api.view.UsersAdminView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_usersadmin_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        widgetContainer : '#squid-api-admin-widgets-user-table',

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
            'click td.user-value'  : 'edit',
            'click .save'  : 'saveUser',
            'click .delete'  : 'deleteUser',
            'click button.add'  : 'addUser',
            'blur .edit' : 'close',
            'click .group-value' : 'deleteGroup',
            'mouseover .group-value' : 'groupMouseOver',
            'mouseout .group-value' : 'groupMouseOut'
        },

        addUser: function(item) {
            // Get all input fields
            var inputFields = $(item.currentTarget).parents('tr').find('td input');

            // Set to user Add mode
            if ($(item.currentTarget).attr('data-value') === 'add') {
                // Change add button to save and change attr-value
                $(item.currentTarget).attr('data-value', 'save');
                $(item.currentTarget).text('save');
            
                // Show input fields
                $(inputFields).show();

                // Focus on all input fields
                $(inputFields).focus();
            } else {
                var data = {};
                for(i=0; i<inputFields.length; i++) {
                    var attr = $(inputFields[i]).attr('data-attribute');
                    var value = $(inputFields[i]).val();
                    data[attr] = value;
                }

                // Add to collection and sync
                data.id = {'userId' : null};
                this.model.create(data);
            }
        },

        groupMouseOver: function(item) {
            this.groupColor = $(item.currentTarget).css('background-color');
            $(item.currentTarget).animate({backgroundColor:'#e74c3c'}, "fast");
        },

        groupMouseOut: function(item) {
            $(item.currentTarget).animate({backgroundColor: this.groupColor});    
        },

        deleteGroup: function(item) {
            if (confirm('Are you sure you want to remove this group?')) {
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
            }
        },

        deleteUser: function(item) {
            if (confirm('Are you sure you want to remove this user?')) {
                // Get the ID to find model in collection
                var modelId = $(item.currentTarget).parents('tr').attr('data-id');

                // Model to remove
                var model = this.model.get(modelId);

                // Remove from collection
                this.model.remove(modelId);

                // Delete on the server
                model.destroy();
            }
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
                groupData = this.$(this.widgetContainer + ' .editing div');
                for (i=0; i<groupData.length; i++) {
                    groupArray.push($(groupData[i]).attr('attr-value'));
                }
                previousValue = "";
            }

            // Model Attribute to update
            var modelAttr = this.$(this.widgetContainer + ' .editing .edit').attr('data-attribute');

            // Updated Value
            var value;
            if (this.$(this.widgetContainer + ' .editing select.edit').length === 0) {
                value = this.$(this.widgetContainer + ' .editing input.edit').val();
            } else {
                value = this.$(this.widgetContainer + ' .editing select.edit option:selected').val();
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

            $(this.widgetContainer + ' .editing').removeClass('editing');
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
                    })
                    .attr('class','user-value');

                var emailValue = tableRows.append("td")
                    .html(function(d) {
                        return "<label>" + d.email + "</label><input class='edit form-control input-sm' data-attribute='email' value='" + d.email + "'/>" ;
                    })
                    .attr('class','user-value');

                var passWordValue = tableRows.append("td")
                    .html(function(d) {
                        return "<label>*****</label><input class='edit form-control input-sm' data-attribute='password' value='null'/>" ;
                    })
                    .attr('class','user-value');

                var nameValue = tableRows.append("td")
                    .html(function(d) {
                        return "N/A";
                    })
                    .attr('class','user-value');

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
                    })
                    .attr('class','user-value');
                
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
        },

        assignGroupNames: function() {
            /*
                Retrive groupId / attribute values and match with api group data
                If we have a match, print the name of the group directly as the dom el.
            */
            var groupIds = $(this.widgetContainer + ' div[attr-id="groupId"]');
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
