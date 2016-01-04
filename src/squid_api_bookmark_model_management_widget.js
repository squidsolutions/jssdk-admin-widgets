(function (root, factory) {
    root.squid_api.view.BookmarkModelManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_bookmark_config_editor);

}(this, function (Backbone, squid_api, template) {
    
    squid_api.model.BookmarkModel.prototype.definition = "Bookmark";
    squid_api.model.BookmarkModel.prototype.ignoredAttributes = ['accessRights'];
    squid_api.model.BookmarkModel.prototype.schema = {
        "id" : {
            "title" : " ",
            "type" : "Object",
            "subSchema" : {
                "projectId" : {
                    "options" : [],
                    "type" : "Text",
                    "editorClass" : "hidden"
                },
                "bookmarkId" : {
                    "options" : [],
                    "type" : "Text",
                    "editorClass" : "form-control"
                }
            },
            "editorClass" : "hidden",
            "fieldClass" : "id"
        },
        "name" : {
            "type" : "Text",
            "editorClass" : "form-control",
            "fieldClass" : "name"
        },
        "description" : {
            "type" : "Text",
            "editorClass" : "form-control",
            "fieldClass" : "description"
        },
        "path" : {
            "type" : "Text",
            "editorClass" : "form-control",
            "fieldClass" : "path"
        },
        "config" : {
            "type" : "SetConfig",
            "title" : "Config",
            "fieldClass" : "config",
            "editorClass" : "form-control",
            "validators": [
                 function checkJSON(value, formValues) {
                     try {
                         if (value && (typeof value === "string")) {
                             JSON.parse(value);
                         }
                     } catch (e) {
                         return {
                             type: 'config',
                             message: 'Config must be valid JSON'
                         };
                     }
                 }
             ]
        }
    };
    
    // Define "setConfig" Custom Editor
    var configEditor = Backbone.Form.editors.Base.extend({
        
        template : template,

        initialize: function(options) {
            // Call parent constructor
            Backbone.Form.editors.Base.prototype.initialize.call(this, options);
        },

        setValue: function(value) {
            // beautify json value
            var val;
            if (value) {
                val = JSON.stringify(value, null, 4);
            }
            this.$el.find("textarea").val(val);
        },

        getValue: function() {
            // transform text value to json
            var json;
            var val = this.$el.find("textarea").val();
            if (val) {
                try {
                    json = JSON.parse(val);
                } catch (e) {
                    // parse error, ignore to let validation proceed
                    json = val;
                }
            }
            return json;
        },
        
        events: {
            "click #set" : "setConfig"
        },

        setConfig: function(event) {
            // prevent redirect
            event.preventDefault();
            // set config to current state
            var config = squid_api.model.config.toJSON();
            delete config.bookmark;
            delete config.project;
            this.setValue(config);
        },
        
        render: function() {
            var id = this.$el.attr("id");
            var name = this.$el.attr("name");
            this.$el.removeAttr("id");
            this.$el.removeAttr("name");
            this.$el.removeAttr("class");
            var data = {"id" : id, "name" : name};
            this.$el.append(this.template(data));
            this.setValue(this.value);
            return this;
        }
    });

    Backbone.Form.editors.SetConfig = configEditor;

    var View = squid_api.view.BaseModelManagementWidget.extend({

        customDataManipulation: function(data) {
            return data;
        },
        onSave: function(model) {
            // set bookmark as current
            this.config.set("bookmark", model.get("id").bookmarkId);
        },
    });

    return View;
}));
