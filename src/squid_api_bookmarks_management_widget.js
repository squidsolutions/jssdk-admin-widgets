(function (root, factory) {
    root.squid_api.view.BookmarksManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        config : null,
        createOnlyView : false,
        autoOpen : null,
        parent : null,

        initialize: function(options) {
            this.config = squid_api.model.config;
            if (options.autoOpen) {
                this.autoOpen = true;
            }
            this.model = new squid_api.model.BookmarkModel();
            this.parent = new squid_api.model.ProjectModel();
            
            this.listenTo(this.config, "change:bookmark", this.setModel);
            this.listenTo(this.config, "change:project", this.setParent);
            this.render();
        },

        setParent : function() {
            var me = this;
            var projectId = this.config.get("project");
            this.parent.set({"id" : {"projectId" : projectId}});
            this.parent.fetch();
        },
           
        setModel : function() {
            var me = this;
            var projectId = this.config.get("project");
            var bookmarkId = this.config.get("bookmark");
            if (bookmarkId) {
                this.model.set({"id" : {"projectId" : projectId, "bookmarkId" : bookmarkId}});
                this.model.fetch({
                    error: function(xhr) {
                        squid_api.model.status.set({"error":xhr});
                    }
                });
            } else {
                this.model.set({"id" : null});
            }
        },
        
        render: function() {
            var me = this;

            var viewOptions = {
                "el" : this.$el,
                "type" : "Bookmark",
                "model" : this.model,
                "parent" : this.parent,
                "createOnlyView" : this.createOnlyView,
                "autoOpen" : this.autoOpen,
            };

            var successHandler = function(value) {
                if (value) {
                    squid_api.model.config.set({
                        "bookmark" : value
                    });
                }
            };
            
            viewOptions.changeEventHandler  = successHandler;
            var collectionView = new squid_api.view.CollectionManagementWidget(viewOptions);
            
            return this;
        }

    });

    return View;
}));
