(function (root, factory) {
    root.squid_api.view.BookmarkCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_bookmark_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseCollectionManagementWidget.extend({
        template: template,
        type : "Bookmark",
        typeLabel : "Bookmark",
        typeLabelPlural : "Bookmarks",
        configSelectedId : "bookmark",
        modelView : null,
        configParentId : "project",

        init : function() {
            var me = this;
            this.modelView = squid_api.view.BookmarkModelManagementWidget;
        },

        loadCollection : function(parentId) {
            return squid_api.getCustomer().then(function(customer) {
                return customer.get("projects").load(parentId).then(function(project) {
                    return project.get("bookmarks").load();
                });
            });
        },

        createModel : function() {
            var model = new this.collection.model();
            // set config to current state
            var config = this.config.toJSON();
            delete config.bookmark;
            delete config.project;
            model.set("config",config);
            return model;
        },

        eventSelect : function(event) {
            var value = $(event.target).parents("li").attr("data-attr");
            squid_api.setBookmarkId(value);

            if (this.onSelect) {
                this.onSelect.call();
            }
        },

        eventCreate : function() {
            var me = this;
            // create a new model
            var model = new this.collection.model();
            model.set("id", this.collection.parent.get("id"));
            var config = this.config.toJSON();
            delete config.bookmark;
            delete config.project;
            model.set("config",config);

            this.renderModelView(new this.modelView({
                model : model,
                cancelCallback : function() {
                    me.render();
                },
                onSave : function(model) {
                    me.collection.add(model);
                    // call any super onSave
                    me.modelView.prototype.onSave.call(me, model);
                    me.render();
                }
            }));
        },

        events : {
            "click .select" : function(event) {
                this.eventSelect(event);
            },
            "click .create" : function(event) {
                this.eventCreate(event);
            },
            'mouseenter tr': function(event) {
                this.eventMouseEnter(event);
            },
            'mouseleave tr': function(event) {
                this.eventMouseLeave(event);
            },
            "click .edit": function(event) {
                this.eventEdit(event);
            },
            "click .refresh": function(event) {
                this.eventRefresh(event);
            },
            "click .delete": function(event) {
                this.eventDelete(event);
            }
        },

        getSelectedModel : function(event) {
            var id = $(event.target).parents("li").attr("data-attr");
            var model = this.collection.get(id);
            return model;
        },

        getCreateRole: function() {
            // anyone can create a bookmark
            return true;
        },

        getModelLabel : function(model) {
            var name = model.get("name");
            var path = model.get("path");
            if (path) {
                var user = path.indexOf("/USER/");
                if (user === 0) {
                    path = path.substring(6);
                    var userId;
                    if (path.indexOf("/") > -1) {
                        userId = path.substring(0,path.indexOf("/"));
                        path = path.substring(path.indexOf("/"));
                    } else {
                        userId = path;
                        path = "";
                    }
                    if (userId === squid_api.model.login.get("oid")) {
                        // self
                        path = "/My Bookmarks"+path;
                    } else {
                        path = "/Others Bookmarks"+path;
                    }
                } else {
                    var shared = path.indexOf("/SHARED");
                    if (shared === 0) {
                        if (path.length>7) {
                            path = "/Shared Bookmarks/"+path.substring(8);
                        } else {
                            path = "/Shared Bookmarks";
                        }
                    }
                }
                name = path +"/"+ name;
            }
            return name;
        },
        bookmarkFolderState: function(item, action) {
            var project = this.config.get("project");
            var bookmarkFolderState = this.config.get("bookmarkFolderState");
            if (action == "show") {
                if (bookmarkFolderState) {
                    bookmarkFolderState[project] = item;
                } else {
                    var obj = {};
                    obj[project] = item;
                    bookmarkFolderState = obj;
                }
            } else if (action == "hidden") {
                if (bookmarkFolderState) {
                    delete bookmarkFolderState[project];
                }
            }
            this.config.set("bookmarkFolderState", bookmarkFolderState);
        },
        render: function() {
            console.log("render CollectionManagementWidget "+this.type);
            var bookmarkFolderState = this.config.get("bookmarkFolderState");
            var project = this.config.get("project");

            var jsonData = {
                collectionLoaded : !this.collectionLoading,
                collection : this.collection,
                roles : null,
                createRole : null,
                typeLabel : this.typeLabel,
                typeLabelPlural : this.typeLabelPlural,
                modalHtml : true,
                type : this.type
            };
            if (this.collection) {
                var collection = [];
                var models = [];
                jsonData.collection = {};
                jsonData.createRole = this.getCreateRole();

                var selectedId = this.config.get(this.configSelectedId);

                // store model data
                for (i=0; i<this.collection.size(); i++) {
                    var item = this.collection.at(i);
                    var bookmark = {
                        label : item.get("name"),
                        description : item.get("description")
                    };

                    var existingPath = this.getModelLabel(item);
                    var path = existingPath.substr(0, existingPath.lastIndexOf("/"));
                    var friendlyPath = path;

                    // if multiple levels exist, remove the first folder from friendlypath
                    if (friendlyPath.split("/").length > 1) {
                        friendlyPath = friendlyPath.slice(friendlyPath.search(/.\//i) + 2);
                    }

                    // replace all '/' with '>'
                    friendlyPath = friendlyPath.replace(/\//g, ' > ');

                    // split friendlyPath to wrap styling divs
                    var obj = friendlyPath.split(" ");
                    var tmpString = "";
                    for (var str in obj) {
                        if (obj[str] == ">") {
                            tmpString += "<span>" + obj[str] + "</span>";
                        } else {
                            tmpString += obj[str];
                        }
                    }

                    friendlyPath = tmpString;

                    // see if path already exists
                    var pathExists = false;
                    for (ix=0; ix<collection.length; ix++) {
                        if (collection[ix].path.value === path) {
                            pathExists = true;
                        }
                    }
                    if (! pathExists) {
                        // store different paths
                        collection.push({
                            "path" : {
                                "value" : path,
                                "userFriendlyName" : friendlyPath,
                                "type" : path.substr(1).split(" ", 1)[0]
                            },
                            "bookmarks" : []
                        });
                    }

                    // update collection models
                    for (var x in collection) {
                        if (collection[x].path.value == path) {
                            if (bookmark.label !== null) {
                                // copy model attributes
                                for (var att in item.attributes) {
                                    bookmark[att] = item.get(att);
                                }
                                bookmark.roles = this.getModelRoles(item);
                                bookmark.selected = (bookmark.oid === selectedId);
                            }
                            if (bookmark.selected) {
                                collection[x].bookmarks.unshift(bookmark);
                            } else {
                                collection[x].bookmarks.push(bookmark);
                            }
                        }
                    }
                }

                // store model view data
                collection.sort(function(a, b) {
                    if(a.path.value < b.path.value) return -1;
                    if(a.path.value > b.firstname) return 1;
                    return 0;
                });
                jsonData.collection = collection;
            }

            // render template
            var html = this.template(jsonData);
            this.$el.html(html);

            this.templateWidgets();

            // open folder if stored in config
            if (bookmarkFolderState) {
                if (bookmarkFolderState[project]) {
                    this.$el.find("#" + bookmarkFolderState[project]).collapse('toggle');
                }
            }

            return this;
        },
        templateWidgets: function() {
            // hoverover
            this.$el.find("li").tooltip({
                placement: "top",
                trigger: "hover"
            });

            // accordion & events
            this.$el.find(".collapse").collapse('hide');
            this.$el.find(".collapse").on('hidden.bs.collapse', { context: this }, function (event) {
                var item = $(this).attr("id");
                event.data.context.bookmarkFolderState(item, "hidden");
            });
            this.$el.find(".collapse").on('show.bs.collapse', { context: this }, function (event) {
                var item = $(this).attr("id");
                event.data.context.bookmarkFolderState(item, "show");
            });
        }
    });

    return View;
}));
