(function (root, factory) {
    root.squid_api.view.BookmarkCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_columns_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseCollectionManagementWidget.extend({
        type : "Bookmark",
        typeLabelPlural : "Bookmarks",
        modelView : null,

        init : function() {
            var me = this;
            this.modelView = squid_api.view.BaseModelManagementWidget;
            
            // listen for project/bookmark change
            var setSelectedModel = function(projectId, bookmarkId) {
                if (projectId && bookmarkId) {
                    // set selected model
                    squid_api.getCustomer().then(function(customer) {
                        customer.get("projects").load(projectId).then(function(model) {
                            model.get("bookmarks").load(bookmarkId).then(function(model) {
                                me.selectedModel = model;
                                me.initListeners();
                            });
                        });
                    });
                } else {
                    me.initListeners();
                }
            };
            
            this.config.on("change", function (config) {
                var projectId = config.get("project");
                var bookmarkId = config.get("bookmarkId");
                if (config.hasChanged("project")) {
                    // project has changed
                    me.collectionLoading = true;
                    if (projectId) {
                        // set domain collection
                        squid_api.getCustomer().then(function(customer) {
                            customer.get("projects").load(projectId).then(function(project) {
                                project.get("bookmarks").load().done(function(collection) {
                                    me.collectionLoading = false;
                                    me.collection = collection;
                                    me.initListeners();
                                }).fail(function() {
                                    me.collectionLoading = false;
                                    me.render();
                                });
                            });
                        });
                        if (config.hasChanged("bookmark")) {
                            setSelectedModel(projectId, bookmarkId);
                        }
                    }
                    me.render();
                } else if (config.hasChanged("bookmark")) {
                    // domain only has changed
                    setSelectedModel(projectId, bookmarkId);
                }
            });
        },
        
        getModelLabel : function(model) {
            var path = model.get("path");
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
            return path +"/"+ model.get("name");
        }
    });

    return View;
}));
