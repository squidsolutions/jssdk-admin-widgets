(function (root, factory) {
    factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    squid_api.model.ProjectModel.prototype.definition = "Project";
    squid_api.model.ProjectModel.prototype.ignoredAttributes = [
                                                                'accessRights', 'config', 'relations', 'domains' ];
    squid_api.model.ProjectModel.prototype.schema = {
            "id" : {
                "title" : " ",
                "type" : "Object",
                "subSchema" : {
                    "projectId" : {
                        "options" : [],
                        "type" : "Text",
                        "editorClass" : "hidden"
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
            "dbUrl" : {
                "title" : "Database URL",
                "type" : "Text",
                "editorClass" : "form-control",
                "position" : 1,
                "fieldClass" : "dbUrl"
            },
            "dbUser" : {
                "title" : "Database User",
                "type" : "Text",
                "editorClass" : "form-control",
                "position" : 2,
                "fieldClass" : "dbUser"
            },
            "dbPassword" : {
                "title" : "Database Password",
                "type" : "Password",
                "editorClass" : "form-control",
                "position" : 3,
                "fieldClass" : "dbPassword"
            },
            "dbSchemas" : {
                "title" : "Database Schemas",
                "type" : "Checkboxes",
                "editorClass" : " ",
                "options" : [],
                "position" : 4,
                "fieldClass" : "dbSchemas"
            }
    };


    squid_api.model.DomainModel.prototype.definition = "Domain";
    squid_api.model.DomainModel.prototype.ignoredAttributes = [
                                                               'accessRights', 'dimensions', 'metrics' ];
    squid_api.model.DomainModel.prototype.schema = {
            "id" : {
                "title" : " ",
                "type" : "Object",
                "subSchema" : {
                    "projectId" : {
                        "options" : [],
                        "type" : "Text",
                        "editorClass" : "hidden"
                    },
                    "domainId" : {
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
            "subject" : {
                "type" : "Object",
                "title" : "",
                "subSchema" : {
                    "value" : {
                        "title" : "Subject Value",
                        "type" : "ExpressionEditor",
                        "model" : "Domain",
                        "editorClass" : "form-control suggestion-box"
                    }
                },
                "position" : 1,
                "fieldClass" : "subject"
            }
    };

    squid_api.model.RelationModel.prototype.definition = "Relation";
    squid_api.model.RelationModel.prototype.ignoredAttributes = [ 'accessRights' ];
    squid_api.model.RelationModel.prototype.schema = {
            "id" : {
                "title" : " ",
                "type" : "Object",
                "subSchema" : {
                    "projectId" : {
                        "options" : [],
                        "type" : "Text",
                        "title" : " ",
                        "editorClass" : "hidden"
                    },
                    "relationId" : {
                        "options" : [],
                        "type" : "Text",
                        "editorClass" : "form-control"
                    }
                },
                "editorClass" : "hidden",
                "fieldClass" : "id"
            },
            "leftId" : {
                "title" : " ",
                "type" : "Object",
                "subSchema" : {
                    "projectId" : {
                        "options" : [],
                        "type" : "Text",
                        "title" : " ",
                        "editorClass" : "hidden"
                    },
                    "domainId" : {
                        "options" : [],
                        "type" : "Select",
                        "editorClass" : "form-control",
                        "title" : "Left Domain"
                    }
                },
                "fieldClass" : "leftId"
            },
            "leftCardinality" : {
                "type" : "Select",
                "editorClass" : "form-control",
                "options" : [ "ZERO_OR_ONE", "ONE", "MANY" ],
                "fieldClass" : "leftCardinality"
            },
            "rightCardinality" : {
                "type" : "Select",
                "editorClass" : "form-control",
                "options" : [ "ZERO_OR_ONE", "ONE", "MANY" ],
                "fieldClass" : "rightCardinality"
            },
            "rightId" : {
                "title" : " ",
                "type" : "Object",
                "subSchema" : {
                    "projectId" : {
                        "options" : [],
                        "type" : "Text",
                        "title" : " ",
                        "editorClass" : "hidden"
                    },
                    "domainId" : {
                        "options" : [],
                        "type" : "Select",
                        "editorClass" : "form-control",
                        "title" : "Right Domain"
                    }
                },
                "fieldClass" : "rightId"
            },
            "leftName" : {
                "type" : "Text",
                "editorClass" : "form-control",
                "fieldClass" : "leftName"
            },
            "rightName" : {
                "type" : "Text",
                "editorClass" : "form-control",
                "fieldClass" : "rightName"
            },
            "joinExpression" : {
                "title" : " ",
                "type" : "Object",
                "subSchema" : {
                    "value" : {
                        "title" : "Join Expression",
                        "type" : "ExpressionEditor",
                        "model" : "Relation",
                        "editorClass" : "form-control suggestion-box"
                    }
                },
                "fieldClass" : "joinExpression"
            }
    };

    squid_api.model.DimensionModel.prototype.definition = "Dimension";
    squid_api.model.DimensionModel.prototype.ignoredAttributes = [
                                                                  'options', 'accessRights', 'dynamic', 'attributes',
                                                                  'valueType' ];
    squid_api.model.DimensionModel.prototype.schema = {
            "id" : {
                "title" : " ",
                "type" : "Object",
                "subSchema" : {
                    "projectId" : {
                        "options" : [],
                        "type" : "Text",
                        "editorClass" : "hidden"
                    },
                    "domainId" : {
                        "options" : [],
                        "type" : "Text",
                        "editorClass" : "form-control"
                    },
                    "dimensionId" : {
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
            "type" : {
                "type" : "Checkboxes",
                "editorClass" : " ",
                "options" : [ {
                    "val" : "CATEGORICAL",
                    "label" : "Indexed"
                }, {
                    "val" : "CONTINUOUS",
                    "label" : "Period"
                } ],
                "position" : 1,
                "fieldClass" : "type"
            },
            "parentId" : {
                "title" : " ",
                "type" : "Object",
                "subSchema" : {
                    "projectId" : {
                        "options" : [],
                        "type" : "Text",
                        "editorClass" : "hidden",
                        "fieldClass" : "hidden"
                    },
                    "domainId" : {
                        "options" : [],
                        "type" : "Text",
                        "editorClass" : "form-control",
                        "fieldClass" : "hidden"
                    },
                    "dimensionId" : {
                        "options" : [],
                        "type" : "Text",
                        "editorClass" : "form-control",
                        "title" : "Parent Dimension"
                    }
                },
                "position" : 2,
                "fieldClass" : "parentId"
            },
            "expression" : {
                "type" : "Object",
                title : "",
                "subSchema" : {
                    "value" : {
                        "type" : "ExpressionEditor",
                        "model" : "Dimension",
                        "editorClass" : "form-control suggestion-box",
                        "title" : "Expression Value"
                    }
                },
                "position" : 3,
                "fieldClass" : "expression"
            }
    };
    
    squid_api.model.MetricModel.prototype.definition = "Metric";
    squid_api.model.MetricModel.prototype.schema = {
            "id" : {
                "title" : " ",
                "type" : "Object",
                "subSchema" : {
                    "projectId" : {
                        "options" : [],
                        "type" : "Text",
                        "editorClass" : "hidden"
                    },
                    "domainId" : {
                        "options" : [],
                        "type" : "Text",
                        "editorClass" : "form-control"
                    },
                    "metricId" : {
                        "options" : [],
                        "type" : "Text",
                        "editorClass" : "form-control"
                    }
                },
                "editorClass" : "hidden",
                "fieldClass" : "id"
            },
            "dynamic" : {
                "type" : "Text",
                "editorClass" : "form-control",
                "fieldClass" : "dynamic hidden"
            },
            "name" : {
                "type" : "Text",
                "editorClass" : "form-control",
                "fieldClass" : "name"
            },
            "expression" : {
                "title" : "",
                "type" : "Object",
                "subSchema" : {
                    "value" : {
                        "title" : "Expression Value",
                        "type" : "ExpressionEditor",
                        "model" : "Dimension",
                        "editorClass" : "form-control suggestion-box",
                    }
                },
                "position" : 1,
                "fieldClass" : "expression"
            }
    };

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
            "type" : "JsonTextArea",
            "title" : "Config",
            "position" : 1,
            "fieldClass" : "config",
            "editorClass" : "form-control"
        }
    };

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
            // beautify json string
            var json = JSON.parse(value);
            var val = JSON.stringify(json, null, 4);
            this.$el.val(val);
        }
    });
    
    $.ui.dialog.prototype._focusTabbable = $.noop;
    
    // Define "expressionEditor" Custom Editor
    var expressionEditor = Backbone.Form.editors.Base.extend({

        tagName: 'textarea',

        events: {
            'keyup' : 'renderDialog',
            'click' : 'renderDialog'
        },

        initialize: function(options) {
            // Call parent constructor
            Backbone.Form.editors.Base.prototype.initialize.call(this, options);
            if (!this.schema || !this.schema.model)  {
            	throw new Error("Missing required 'schema.options with defined model'");
            }
        },

        getValue: function() {
            return this.$el.val();
        },

        setValue: function(value) {
            this.$el.val(value);
        },
        
        renderDialog: function() {
        	var me = this;
        	var model = this.schema.model;
        	var url = "";
            var data = {"expression" : this.$el.val(), "offset" : this.$el.prop("selectionStart") + 1, "access_token" : squid_api.model.login.get("accessToken")};
            if (model == "Domain") {
            	url = squid_api.apiURL + "/projects/" + squid_api.model.config.get("project") + "/domains-suggestion";
            } else if (model == "Metric") {
            	url = squid_api.apiURL + "/projects/" + squid_api.model.config.get("project") + "/domains/" + squid_api.model.config.get("domain") + "/metrics-suggestion";
            } else if (model == "Dimension") {
            	url = squid_api.apiURL + "/projects/" + squid_api.model.config.get("project") + "/domains/" + squid_api.model.config.get("domain") + "/dimensions-suggestion";
            } else if (model == "Relation") {
            	url = squid_api.apiURL + "/projects/" + squid_api.model.project.get("id").projectId + "/relations-suggestion";
            	data.leftDomainId = $(".squid-api-admin-widgets-modal-form .leftId select").val();
            	data.rightDomainId = $(".squid-api-admin-widgets-modal-form .rightId select").val();
            }
            var request = $.ajax({
            	type: "GET",
            	url: url,
            	dataType: 'json',
            	data: data,
            	success:function(response) {
            		// remove any existing suggestions dialogs            		
            		me.$el.parents().find(".squid-api-pre-suggestions").dialog("destroy").remove();
            		// detemine if there is an error or not
            		if (response.validateMessage.length === 0) {
            			me.$el.removeClass("invalid-expression").addClass("valid-expression");
            		} else {
            			me.$el.removeClass("valid-expression").addClass("invalid-expression");
            		}
            		// append box if definitions exist
            		if (response.suggestions && response.suggestions.length > 0) {
            			// store offset
            			var offset = response.filterIndex;
            			// append div
            			me.$el.after("<div class='squid-api-pre-suggestions squid-api-dialog'><ul></ul></div>");
            			for (i=0; i<response.suggestions.length; i++) {
            				me.$el.siblings(".squid-api-pre-suggestions").find("ul").append("<li class=\"" + response.suggestions[i].objectType.toString() + " " + response.suggestions[i].valueType.toLowerCase() + "\"><span class='suggestion'>" +  response.suggestions[i].suggestion + "</span><span class='valueType'>(" + response.suggestions[i].valueType.toLowerCase() + ")</span></li>");
            			}
            			me.$el.siblings(".squid-api-pre-suggestions").find("li").click(me, function(event) {
            				var item;
            				if ($(event.target).is("li")) {
            					item = $(event.target).find(".suggestion").html();
            				} else {
            					item = $(event.target).parent().find(".suggestion").html();
            				}
            				var str = me.$el.val().substring(0, offset) + item.substring(0);
            				me.setValue(str);
            				me.renderDialog();
            			});
            			me.$el.siblings(".squid-api-pre-suggestions").dialog({
            				dialogClass: "squid-api-suggestion-dialog squid-api-dialog",
            				position: { my: "center top", at: "center bottom+4", of: me.$el },
            				clickOutside: true, // clicking outside the dialog will close it
                            clickOutsideTrigger: me.$el, // Element (id or class) that triggers the dialog opening
            			});
            		} else {
			          // set message
			          squid_api.model.status.set("message", response.validateMessage);
			      }
            	  me.$el.focus();
			  },
			  error: function(response) {
			      if (response.responseJSON.error) {
			          squid_api.model.status.set({'message' : response.responseJSON.error});
			      } else {
			          squid_api.model.status.set({'error' : response});
			      }
			  }
          });
        }
    });
    
    // Register custom editors
    Backbone.Form.editors.JsonTextArea = jsonTextArea;
    Backbone.Form.editors.ExpressionEditor = expressionEditor;
}));
