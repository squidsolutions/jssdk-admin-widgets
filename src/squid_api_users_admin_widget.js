(function (root, factory) {
    root.squid_api.view.UsersAdminView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_usersadmin_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        widgetContainer : '#squid-api-admin-widgets-user-table',
        groupData : {},
        messageToDisplay: '',

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_users_admin_widget;
            }

            if (options.status) {
                this.status = options.status;
            }

            if (! this.model) {
                // Connect to the api to retrieve user/group collections
                this.model = new squid_api.model.UserCollection();
                this.groups = new squid_api.model.GroupCollection();
            }

            this.model.on("reset change remove sync", this.render, this);

            this.render();
        },

        events: {
            'click td.user-value'  : 'modifyUserValue',
            'click .delete'  : 'deleteUser',
            'click button.add'  : 'addUser',
            'blur .edit' : 'close',
            'keypress .edit' : 'close',
            'click .group-value .badge' : 'deleteGroup',
            'mouseenter .group-value' : 'groupMouseOver',
            'mouseleave .group-value' : 'groupMouseOut',
            'mouseover td.user-value' : 'groupIconOver',
            'mouseout td.user-value' : 'groupIconOut',
        },

        groupIconOver: function(item) {
            if ($(item.currentTarget).siblings('.action-section').find('button').attr('data-value') !== 'add') {
                $(item.currentTarget).addClass('field-icon-on');
            }
        },

        groupIconOut: function(item) {
            if ($(item.currentTarget).siblings('.action-section').find('button').attr('data-value') !== 'add') {
                $(item.currentTarget).removeClass('field-icon-on');
            }
        },

        addUser: function(item) {
            var me = this;

            // Get all input fields
            var toShow = $(item.currentTarget).parents('tr').find('td input');
            var inputFields = $(item.currentTarget).parents('tr').find('td .add');

            var data = {};

            // Set to user Add mode
            if ($(item.currentTarget).attr('data-value') === 'add') {
                // Change add button to save and change attr-value
                $(item.currentTarget).attr('data-value', 'save');
                $(item.currentTarget).text('save');
            
                // Show input fields
                $(toShow).show();
                $(item.currentTarget).parents('tr').find('td span.send-email-label').show();

                // Focus on all input fields
                $(toShow).focus();

                // Hide Select
            } else {
                for(i=0; i<inputFields.length; i++) {
                    var attr = $(inputFields[i]).attr('data-attribute');
                    var value = $(inputFields[i]).val();
                    if (attr !== undefined) {
                        if (attr !== 'sendemail') {
                            if (attr === 'groups') {
                                if (value !== null) {
                                    data[attr] = [value];
                                }
                            } else {
                                if (value !== null) {
                                    data[attr] = value;
                                }
                            }
                        }
                    }
                }

                // Add to collection and sync
                data.id = {'userId' : null};

                // Get checkbox status before model refresh
                var sendEmail = $(this.widgetContainer + ' .email-checkbox').is(':checked');

                this.model.create(data, {
                    success: function(model, response){
                        // Should we send an email?
                        if (sendEmail) {
                            var linkUrl = "https://api.squidsolutions.com/release/admin/console/index.html?access_token=" + squid_api.model.login.get("accessToken") + "#!user";
                            $.get(squid_api.apiURL + '/set-user-pwd?' + 'clientId=' + squid_api.clientId + '&email=' + data.email + '&customerId=' + squid_api.customerId + '&link_url=' + linkUrl);
                            me.status.set('message', 'You have successfully saved user with login: ' + data.login + ' and a confirmation email has been sent to:' + data.email + '');
                        } else {
                            me.status.set('message', 'You have successfully saved user with login: ' + data.login);
                        }
                    }
                });
            }
        },

        groupMouseOver: function(item) {
            this.groupData.value = $(item.currentTarget).text();
            $(item.currentTarget).append("<span class='badge'>x</span>");
        },

        groupMouseOut: function(item) {
            $(item.currentTarget).text(this.groupData.value);
            $(item.currentTarget).remove('.badge');
        },

        deleteGroup: function(item) {
            var me = this;

            var itemData = $(item.currentTarget).parents('td');
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
                model.save(data, {
                    success : function(model, response) {
                        me.status.set('message', 'group successfully deleted');
                    }
                });


            } else {
                // To be refactored, (To remove the class after user-value click event)
                setTimeout(function() {
                    $(itemData).removeClass('editing');
                }, 1);
            }
        },

        deleteUser: function(item) {
            var me = this;

            if (confirm('Are you sure you want to remove this user?')) {
                // Get the ID to find model in collection
                var modelId = $(item.currentTarget).parents('tr').attr('data-id');

                // Model to remove
                var model = this.model.get(modelId);

                // Remove from collection
                this.model.remove(modelId);

                // Delete on the server
                model.destroy({success: function(model, response) {
                    me.status.set('message', 'user with login ' + model.get('login') + ' successfully deleted');
                }});
            }
        },

        remove: function() {
            this.$el.empty().off(); /* off to unbind the events */
            this.stopListening();
            return this;
        },

        modifyUserValue: function(item) {
            // Show text inputs
            $(".editing").removeClass("editing");
            $(item.currentTarget).addClass("editing");

            // Focus on input fields
            $(item.currentTarget).find("input").focus();

            // If Select Box
            if ($(item.currentTarget).find('select').length > 0) {
                var groups = this.groups.toJSON();

                // Remove existing select options
                $(item.currentTarget).find("select options").remove();

                // Append groups to dropdown
                for (var key in groups) {
                    if (groups[key].id) {
                        $(item.currentTarget).find("select").append("<option value='" + groups[key].id.userGroupId + "'>" + groups[key].name + "</option>");
                    }
                }
            }
        },

        close: _.throttle(function(item) {
            var me = this;

            if (item.which == 13 || item.type == "focusout") {
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
                        model.save(data, {
                            success : function(model, response) {
                                me.status.set('message', 'successfully updated user with login : ' + model.get('login'));
                            },
                            error: function(model, response) {
                                me.model.fetch();
                            }
                        });
                    }
                }
                $(this.widgetContainer + ' .editing').removeClass('editing');
            }
        }, 100),

        fetchModels: function() {
            var me = this;

            this.groups.fetch({
                success : function(model, response) {
                    me.model.fetch({
                    success : function(model, response) {
                            
                        }
                    });
                }
            });
        },

        render: function() {
            var me = this;

            // Store the role / ability to add
            var role;
            var addUser = true;

            // Obtain the role
            if (squid_api.model.customer) {
                role = squid_api.model.customer.get("_role");
            }

            // Can add user rules
            if (role !== "WRITE" && role !== "OWNER") {
                addUser = false;
            }
            
            // Render Template
            this.$el.html(this.template({
                addUser : addUser
            }));

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
                var tableRows = d3.select(globalID + " tbody").selectAll("tbody")
                    .data(users)
                    .enter()
                    .append("tr") 
                    .attr("data-id", function(d) {
                        return d.id.userId; //So backbone recognises the model on update
                    });

                var loginValue = tableRows.append("td")
                    .html(function(d) {
                        return "<label>" + d.login + "</label><input class='edit form-control input-sm' data-attribute='login' value='" + d.login + "'/><i class='field-icon fa fa-pencil'></i>" ;
                    })
                    .attr('class', function(d) {
                        if (d._role !== "READ") {
                            return 'user-value';
                        }
                    });

                var emailValue = tableRows.append("td")
                    .html(function(d) {
                        return "<label>" + d.email + "</label><input class='edit form-control input-sm' data-attribute='email' value='" + d.email + "'/><i class='field-icon fa fa-pencil'></i>" ;
                    })
                    .attr('class', function(d) {
                        if (d._role !== "READ") {
                            return 'user-value';
                        }
                    });

                var passWordValue = tableRows.append("td")
                    .html(function(d) {
                        return "<label>*****</label><input class='edit form-control input-sm' type='password' data-attribute='password' value='null'/><i class='field-icon fa fa-pencil'></i>" ;
                    })
                    .attr('class', function(d) {
                        if (d._role !== "READ") {
                            return 'user-value';
                        }
                    });

                var groupValues = tableRows.append("td")

                    .html(function(d) {
                        var g = d.groups;
                        var data = "";
                        var canEdit;

                        if (d._role !== "READ") {
                            canEdit = 'group-value';
                        }

                        // Groups colour logic
                        if (g) {
                            for (i=0; i<g.length; i++) {
                                if (g[i] === "admin") {
                                    data += "<div class='red " + canEdit + "' attr-id='groupId' class='red' attr-value='" + g[i] + "></div>";
                                } else {
                                    var pattern = /admin_/;
                                    if (pattern.test(g[i])) {
                                        data += "<div class='orange " + canEdit + "' attr-id='groupId' class='orange' attr-value='" + g[i] + "'></div>";
                                    } else {
                                        data += "<div class='" + canEdit + "' attr-id='groupId' attr-value='" + g[i] + "'></div>";
                                    }
                                }    
                            }
                        }
                        data += "<i class='field-icon fa fa-plus-square'></i> <select class='edit form-control input-sm' data-attribute='groups'></select>";
                        return data;
                    })
                    .attr('class', function(d) {
                        if (d._role !== "READ") {
                            return ['user-value' + ' group-section'];
                        }
                    });
                
                // Print group names instead of their Id's
                this.assignGroupNames();

                var actionValues = tableRows.append("td")
                    .html(function(d) {
                        if (d._role !== "READ") {
                            return "<button class='delete form-control'>Delete</button>";
                        }
                    });
            }

            // Instantiate Data Table Plugin
            this.$el.find("#squid-api-admin-widgets-user-table table").DataTable({
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
