(function (root, factory) {
    root.squid_api.view.BookmarkModelManagementWidget = factory(root.Backbone, root.squid_api);

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
    var setConfigEditor = Backbone.Form.editors.Base.extend({

        initialize: function(options) {
            // Call parent constructor
            Backbone.Form.editors.Base.prototype.initialize.call(this, options);
            this.$el.attr("rows", 3);
        },

        setValue: function(value) {
            // beautify json value
            var val;
            if (value) {
                val = JSON.stringify(value, null, 4);
            }
            this.$el.val(val);
        },

        getValue: function() {
            // transform text value to json
            var json;
            var val = this.$el.val();
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
            "click" : "setConfig"
        },

        setConfig: function(event) {
            var me = this;
            // prevent redirect
            event.preventDefault();
            // set config to current state
            var config = squid_api.model.config.toJSON();
            delete config.bookmark;
            delete config.project;
            this.form.fields.config.setValue(config);
        },
        
        render: function() {
            var id = this.$el.attr("id");
            var name = this.$el.attr("name");
            this.$el.removeAttr("id");
            this.$el.removeAttr("name");
            this.$el.removeAttr("class");
            this.$el.append("<button></button>");
            this.$el.append("<textarea rows=3 id='"+id+"'></textarea>");
            this.setValue(this.value);
            return this;
        }
    });

    // Define "jsonTextArea" Custom Editor
    var jsonTextArea = Backbone.Form.editors.Text.extend({

        tagName: 'textarea',

        /**
         * Override Text constructor so type property isn't set (issue #261)
         */
        initialize: function(options) {
            // Call parent constructor
            Backbone.Form.editors.Base.prototype.initialize.call(this, options);
            this.$el.attr("rows", 3);
        },

        setValue: function(value) {
            // beautify json value
            var val;
            if (value) {
                val = JSON.stringify(value, null, 4);
            }
            this.$el.val(val);
        },

        getValue: function() {
            // transform text value to json
            var json;
            var val = this.$el.val();
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
    });
    
    Backbone.Form.editors.JsonTextArea = jsonTextArea;
    Backbone.Form.editors.SetConfig = setConfigEditor;

    var View = squid_api.view.BaseModelManagementWidget.extend({

        customDataManipulation: function(data) {
            return data;
        }
    });

    return View;
}));
