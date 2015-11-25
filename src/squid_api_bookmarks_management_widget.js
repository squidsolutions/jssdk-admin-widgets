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
            this.status = squid_api.model.status;
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
                if (options.createOnlyView) {
                    this.createOnlyView = options.createOnlyView;
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

        configCompare : function(model) {
            // if called via callback
            var el = this.$el.find("button");

            // if called via config change
            if (! model && this.createOnlyView.$el) {
                el = this.createOnlyView.$el.find("button");
            }

            if (this.model.get("id")) {
                if (JSON.stringify(this.model.get("config")) == JSON.stringify(_.omit(this.config.toJSON(), "project", "bookmark"))) {
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
                var config = squid_api.model.config.toJSON();
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
                if (this.collectionView) {
                    this.collectionView.triggerFetch();
                }
            } else {
                this.model.set({"id" : null});
            }
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
                "createOnlyView" : this.createOnlyView,
                "autoOpen" : this.autoOpen,
                "changeEventHandler" : this.changeEventHandler,
                "comparator" : this.comparator,
                "beforeRenderHandler" : this.beforeRenderHandler,
                "displaySelected" : false,
                "getRoles" : this.getRoles
            };

            var successHandler = function() {
                if (this.get("id")) {
                    squid_api.setBookmarkId(this.get("id").bookmarkId);
                    me.status.set("message", "successfully created a new bookmark with name: " + this.get("name") );
                }
            };

            if (! this.createOnlyView) {
                this.collectionView = new squid_api.view.CollectionManagementWidget(viewOptions);
            } else {
                // once model has been saved
                viewOptions.successHandler = successHandler;
                // verify model config with current config
                viewOptions.afterRenderHandler = this.configCompare;
                // render model management view
                this.createOnlyView = new squid_api.view.ModelManagementView(viewOptions);
            }

            return this;
        }

    });

    return View;
}));
