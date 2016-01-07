(function (root, factory) {
    root.squid_api.view.BookmarkCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_columns_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseCollectionManagementWidget.extend({
        type : "Bookmark",
        typeLabelPlural : "Bookmarks",
        modelView : null,
        configSelectedId : "bookmark",
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
        
        events : {
            "click .select" : function(event) {
                var value = $(event.target).parent('tr').attr('data-attr');
                squid_api.setBookmarkId(value);

                if (this.onSelect) {
                    this.onSelect.call();
                }
            },
            "click .create" : function() {
                var me = this;
                // create a new model
                var model = new this.collection.model();
                model.set("id", this.collection.parent.get("id"));
                var config = this.config.toJSON();
                delete config.bookmark;
                delete config.project;
                model.set("config",config);
                // listen for new model changes
                me.listenTo(model, "sync", function() {
                    me.collection.add(model);
                    me.render();
                });
                
                this.renderModelView(new this.modelView({
                    model : model,
                    cancelCallback : function() {
                        me.render();
                    }
                }));
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
        }
    });

    return View;
}));
