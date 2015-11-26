(function (root, factory) {
    root.squid_api.view.BookmarksManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        config : null,
        createOnlyView : false,
        autoOpen : null,
        parent : null,
        changeEventHandler : null,
        type : "Bookmark",
        typeLabel : null,
        typeLabelPlural : null,
        collectionView : null,

        initialize: function(options) {
            this.config = squid_api.model.config;

            if (options) {
                if (options.autoOpen) {
                    this.autoOpen = true;
                }
                if (options.changeEventHandler) {
                    this.changeEventHandler = options.changeEventHandler;
                }
                if (options.typeLabel) {
                    this.typeLabel = options.typeLabel;
                }
                if (options.typeLabelPlural) {
                    this.typeLabelPlural = options.typeLabelPlural;
                }
                if (options.comparator) {
                    this.comparator = options.comparator;
                }
            }

            if (!this.typeLabel) {
                this.typeLabel = this.type;
            }
            if (!this.typeLabelPlural) {
                this.typeLabelPlural = this.typeLabel + "s";
            }

            if (!this.changeEventHandler) {
                this.changeEventHandler = function(value) {
                    if (value) {
                        squid_api.setBookmarkId(value);
                    }
                };
            }

            this.model = new squid_api.model.BookmarkModel();
            this.parent = new squid_api.model.ProjectModel();

            this.listenTo(this.config, "change:bookmark", this.setModel);
            this.listenTo(this.config, "change:project", this.setParent);
            this.listenTo(this.config, "change", this.configCompare);

            this.render();
        },

        getRoles: function() {
            // roles
            var roles = {"create" : false, "edit" : false, "delete" : false, "refresh" : false};

            var parentRole = this.parent.get("_role");

            // write role
            if (parentRole == "OWNER" || parentRole == "WRITE" || parentRole == "READ") {
                roles.create = true;
                roles.edit = true;
                roles.delete = true;
            }

            return roles;
        },

        configCompare : function() {
            var match = true;
            var el = this.$el.find("button");
            var model = this.model.get("config");

            // omit project / bookmark properties from comparison
            var config = _.omit(this.config.toJSON(), "project", "bookmark");

            if (! this.model.isNew()) {
                // get order of keys to compare
                var atts = Object.keys(config);

                for (i=0; i<atts.length; i++) {
                    // compare in raw state
                    if (JSON.stringify(model[atts[i]]) !== JSON.stringify(config[atts[i]])) {
                        match = false;
                    }
                }
                if (match) {
                    el.addClass("same");
                    el.removeClass("different");
                } else {
                    el.addClass("different");
                    el.removeClass("same");
                }
            }
        },

        comparator : function(a,b) {
            // default is : sort by alpha path + name
            var va = a.get("path")+a.get("name").toLowerCase();
            var vb = b.get("path")+b.get("name").toLowerCase();
            if (va < vb) {
                return -1;
            }
            if (va > vb) {
                return 1;
            }
            return 0;
        },

        beforeRenderHandler : function(model) {
            if (model.isNew()) {
                // set config to current state when creating a new model
                var config = this.config.toJSON();
                delete config.bookmark;
                delete config.project;
                model.set("config", config);
            }
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

        labelHandler : function(model) {
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
        },

        render: function() {
            var me = this;

            // Build the CollectionManagementWidget
            var viewOptions = {
                "el" : this.$el,
                "type" : "Bookmark",
                "typeLabel" : this.typeLabel,
                "typeLabelPlural" : this.typeLabelPlural,
                "model" : this.model,
                "parent" : this.parent,
                "autoOpen" : this.autoOpen,
                "changeEventHandler" : this.changeEventHandler,
                "comparator" : this.comparator,
                "beforeRenderHandler" : this.beforeRenderHandler,
                "afterRenderHandler" : this.configCompare,
                "labelHandler" : this.labelHandler,
                "displaySelected" : false,
                "getRoles" : this.getRoles
            };

            this.collectionView = new squid_api.view.CollectionManagementWidget(viewOptions);

            return this;
        }

    });

    return View;
}));
