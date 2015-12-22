this["squid_api"] = this["squid_api"] || {};
this["squid_api"]["template"] = this["squid_api"]["template"] || {};

this["squid_api"]["template"]["squid_api_base_collection_management_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <button type=\"button\"  class=\"create btn btn-default\">\n                        <i class=\"fa fa-plus\"></i> New ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n                    </button>\n                ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return " ";
  }

function program5(depth0,data) {
  
  
  return " class=\"no-values\" ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.collection)),stack1 == null || stack1 === false ? stack1 : stack1.models), {hash:{},inverse:self.program(17, program17, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.collection)),stack1 == null || stack1 === false ? stack1 : stack1.models), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                                    <tr ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-attr=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                                        <td class=\"select selected\">\n                                            ";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n                                        </td>\n                                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.roles), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                    </tr>\n                                ";
  return buffer;
  }
function program10(depth0,data) {
  
  
  return " class=\"selected\" ";
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	                                        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.roles)),stack1 == null || stack1 === false ? stack1 : stack1['delete']), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	                                        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.roles)),stack1 == null || stack1 === false ? stack1 : stack1.edit), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                        ";
  return buffer;
  }
function program13(depth0,data) {
  
  
  return "\n	                                            <td class=\"delete collection-option\"><i class=\"fa fa-trash-o\"></i></td>\n	                                        ";
  }

function program15(depth0,data) {
  
  
  return "\n	                                            <td class=\"edit collection-option\"><i class=\"fa fa-pencil-square-o\"></i></td>\n	                                        ";
  }

function program17(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                                <div class=\"no-data\">\n                                    No ";
  if (helper = helpers.typeLabelPlural) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.typeLabelPlural); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " available\n                                </div>\n                            ";
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                        	<div class=\"no-data\">\n                            	";
  if (helper = helpers.typeLabelPlural) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.typeLabelPlural); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " loading in progress...\n                            </div>\n                        ";
  return buffer;
  }

  buffer += "<div class=\"modal-header\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n  <h4 class=\"modal-title\" id=\"myModalLabel\">";
  if (helper = helpers.typeLabelPlural) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.typeLabelPlural); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\n</div>\n<div class=\"modal-body\">\n    <div class=\"squid-api-collection-management-widget\">\n            <div class=\"squid-api-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-collection-management\">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.createRole), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    <table style=\"width:100%\">\n                        <tbody ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.valueSelected), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.collectionLoaded), {hash:{},inverse:self.program(19, program19, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </tbody>\n                </table>\n            </div>\n    </div>\n</div>\n<div class=\"squid-api-model-management-footer\">\n  	<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n</div>\n<!--  end of modal - -->\n</div>\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_base_model_management_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-header\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n  <h4 class=\"modal-title\" id=\"myModalLabel\">";
  if (helper = helpers.headerLabel) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.headerLabel); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\n</div>\n<div class=\"modal-body\">\n\n</div>\n<div class=\"squid-api-model-management-footer\">\n  	<button type=\"button\" class=\"btn btn-default btn-cancel\">Cancel</button>\n	<button type=\"button\" class=\"btn btn-primary btn-save-form\">Save</button>\n</div>\n<!--  end of modal - -->\n</div>\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_button_view"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<button class=\"form-control squid-api-button-view\">\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.collectionLoaded), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </button>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        ";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n    ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    	";
  if (helper = helpers.typeLabelPlural) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.typeLabelPlural); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " loading   \n    ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.visible), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_columns_management_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <option ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.parentId), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</option>\n                ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " class=\"child\" ";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <option value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.parentId), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " selected=\"selected\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</option>\n                ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += " class=\"child";
  if (helper = helpers.depth) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.depth); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  return buffer;
  }

  buffer += "<div class=\"modal-header\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n  <h4 class=\"modal-title\" id=\"myModalLabel\">";
  if (helper = helpers.typeLabelPlural) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.typeLabelPlural); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\n</div>\n<div class=\"modal-body\">\n    <div class=\"squid-api-collection-management-widget\">\n        <div class=\"squid-api-admin-widget-columns-management\">\n            <select multiple=\"multiple\">\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.dynamic), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.nonDynamic), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </select>\n            <div class=\"management\">\n                <button type=\"button\" class=\"btn btn-default create\">\n                    Create\n                </button>\n                <button type=\"button\" class=\"btn btn-default edit\" disabled=\"true\">\n                    Edit\n                </button>\n                <button type=\"button\" class=\"btn btn-default delete\" disabled=\"true\">\n                    Delete\n                </button>\n                <button type=\"button\" class=\"btn btn-default close-modal\" data-dismiss=\"modal\">\n                    Close\n                </button>\n            </div>\n        </div>\n    </div>\n</div>\n<!--  end of modal - -->\n</div>\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_domain_collection_management_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <button type=\"button\"  class=\"create btn btn-default\">\n                        <i class=\"fa fa-plus\"></i> New ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n                    </button>\n                ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return " ";
  }

function program5(depth0,data) {
  
  
  return " class=\"no-values\" ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.collection)),stack1 == null || stack1 === false ? stack1 : stack1.models), {hash:{},inverse:self.program(19, program19, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.collection)),stack1 == null || stack1 === false ? stack1 : stack1.models), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                                    <tr ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-attr=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                                        <td class=\"select selected\">\n                                            ";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n                                        </td>\n                                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.roles), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                    </tr>\n                                ";
  return buffer;
  }
function program10(depth0,data) {
  
  
  return " class=\"selected\" ";
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	                                        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.roles)),stack1 == null || stack1 === false ? stack1 : stack1['delete']), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	                                        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.roles)),stack1 == null || stack1 === false ? stack1 : stack1.refresh), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	                                        <td class=\"relation collection-option\"><i class=\"fa fa-link\"></i></td>\n	                                        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.roles)),stack1 == null || stack1 === false ? stack1 : stack1.edit), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                        ";
  return buffer;
  }
function program13(depth0,data) {
  
  
  return "\n	                                            <td class=\"delete collection-option\"><i class=\"fa fa-trash-o\"></i></td>\n	                                        ";
  }

function program15(depth0,data) {
  
  
  return "\n	                                            <td class=\"refresh collection-option\"><i class=\"fa fa-refresh\"></i></td>\n	                                        ";
  }

function program17(depth0,data) {
  
  
  return "\n	                                            <td class=\"edit collection-option\"><i class=\"fa fa-pencil-square-o\"></i></td>\n	                                        ";
  }

function program19(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                                <div class=\"no-data\">\n                                    No ";
  if (helper = helpers.typeLabelPlural) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.typeLabelPlural); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " available\n                                </div>\n                            ";
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                        	<div class=\"no-data\">\n                            	";
  if (helper = helpers.typeLabelPlural) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.typeLabelPlural); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " loading in progress...\n                            </div>\n                        ";
  return buffer;
  }

  buffer += "<div class=\"modal-header\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n  <h4 class=\"modal-title\" id=\"myModalLabel\">";
  if (helper = helpers.typeLabelPlural) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.typeLabelPlural); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\n</div>\n<div class=\"modal-body\">\n    <div class=\"squid-api-collection-management-widget\">\n            <div class=\"squid-api-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-collection-management\">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.createRole), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    <table style=\"width:100%\">\n                        <tbody ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.valueSelected), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.collectionLoaded), {hash:{},inverse:self.program(21, program21, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </tbody>\n                </table>\n            </div>\n    </div>\n</div>\n<div class=\"squid-api-model-management-footer\">\n  	<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n</div>\n<!--  end of modal - -->\n</div>\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_metric_selector_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n    <select class=\"sq-select form-control squid-api-data-widgets-metric-selector\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.multiple), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.empty), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.options), {hash:{},inverse:self.program(9, program9, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</select>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "multiple";
  }

function program4(depth0,data) {
  
  
  return "\r\n            <option disabled=\"true\">No metrics available</option>\r\n        ";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <option value=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n                ";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n            </option>\r\n        ";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return "selected";
  }

function program9(depth0,data) {
  
  
  return "\r\n    ";
  }

function program11(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n    <!-- just display filter name -->\r\n    <label>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</label>\r\n    <span>-</span>\r\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selAvailable), {hash:{},inverse:self.program(11, program11, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_modal_view"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"squid-api-modal-view squid-api-modal-view-";
  if (helper = helpers.modalCount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.modalCount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      \n  </div>\n</div>\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_project_collection_management_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <button type=\"button\"  class=\"create btn btn-default\">\n                        <i class=\"fa fa-plus\"></i> New ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n                    </button>\n                ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return " ";
  }

function program5(depth0,data) {
  
  
  return " class=\"no-values\" ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.collection)),stack1 == null || stack1 === false ? stack1 : stack1.models), {hash:{},inverse:self.program(19, program19, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.collection)),stack1 == null || stack1 === false ? stack1 : stack1.models), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                                    <tr ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-attr=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                                        <td class=\"select selected\">\n                                            ";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n                                        </td>\n                                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.roles), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                    </tr>\n                                ";
  return buffer;
  }
function program10(depth0,data) {
  
  
  return " class=\"selected\" ";
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	                                        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.roles)),stack1 == null || stack1 === false ? stack1 : stack1['delete']), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	                                        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.roles)),stack1 == null || stack1 === false ? stack1 : stack1.refresh), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	                                        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.roles)),stack1 == null || stack1 === false ? stack1 : stack1.edit), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	                                     ";
  return buffer;
  }
function program13(depth0,data) {
  
  
  return "\n	                                            <td class=\"delete collection-option\"><i class=\"fa fa-trash-o\"></i></td>\n	                                        ";
  }

function program15(depth0,data) {
  
  
  return "\n	                                            <td class=\"refresh collection-option\"><i class=\"fa fa-refresh\"></i></td>\n	                                        ";
  }

function program17(depth0,data) {
  
  
  return "\n	                                            <td class=\"edit collection-option\"><i class=\"fa fa-pencil-square-o\"></i></td>\n	                                        ";
  }

function program19(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                                <div class=\"no-data\">\n                                    No ";
  if (helper = helpers.typeLabelPlural) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.typeLabelPlural); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " available\n                                </div>\n                            ";
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                        	<div class=\"no-data\">\n                            	";
  if (helper = helpers.typeLabelPlural) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.typeLabelPlural); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " loading in progress...\n                            </div>\n                        ";
  return buffer;
  }

  buffer += "<div class=\"modal-header\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n  <h4 class=\"modal-title\" id=\"myModalLabel\">";
  if (helper = helpers.typeLabelPlural) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.typeLabelPlural); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\n</div>\n<div class=\"modal-body\">\n    <div class=\"squid-api-collection-management-widget\">\n            <div class=\"squid-api-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-collection-management\">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.createRole), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    <table style=\"width:100%\">\n                        <tbody ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.valueSelected), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.collectionLoaded), {hash:{},inverse:self.program(21, program21, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </tbody>\n                </table>\n            </div>\n    </div>\n</div>\n<div class=\"squid-api-model-management-footer\">\n  	<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n</div>\n<!--  end of modal - -->\n</div>\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_relation_collection_management_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <button type=\"button\"  class=\"create btn btn-default\">\n                        <i class=\"fa fa-plus\"></i> New ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n                    </button>\n                ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return " ";
  }

function program5(depth0,data) {
  
  
  return " class=\"no-values\" ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.models), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            						<tr class=\"no-background\" data-attr=";
  if (helper = helpers.oid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.oid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ">\n            							<td class=\"domain\">";
  if (helper = helpers.leftName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.leftName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n            							<td class=\"leftIcon\">\n            							";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.leftMany), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            							</td>\n            							<td class=\"rightIcon\">\n            							";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rightMany), {hash:{},inverse:self.program(19, program19, data),fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                        <td class=\"domain\">";
  if (helper = helpers.rightName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rightName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n            							</td>\n                                        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.roles)),stack1 == null || stack1 === false ? stack1 : stack1['delete']), {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.roles)),stack1 == null || stack1 === false ? stack1 : stack1.edit), {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            						</tr>\n            					";
  return buffer;
  }
function program9(depth0,data) {
  
  
  return "\n            									<svg width=\"110\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\">\n              										<ellipse stroke=\"#666\" ry=\"0.15625\" rx=\"42.53032\" id=\"svg_8\" cy=\"10.62595\" cx=\"65.93316\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n              										<ellipse stroke=\"#666\" transform=\"rotate(23.859294891357422 14.261151313781737,6.493025302886963) \" ry=\"0.15625\" rx=\"9.98315\" id=\"svg_10\" cy=\"6.49303\" cx=\"14.26115\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n              										<ellipse stroke=\"#666\" transform=\"rotate(0.7375706434249878 14.573644638061372,10.555437088012791) \" ry=\"0.15625\" rx=\"9.98315\" id=\"svg_11\" cy=\"10.55544\" cx=\"14.57365\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n              										<ellipse stroke=\"#666\" transform=\"rotate(-20.462926864624023 14.4486494064331,14.430353164672844) \" ry=\"0.15625\" rx=\"9.98315\" id=\"svg_13\" cy=\"14.43035\" cx=\"14.44865\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n            									</svg>\n            								";
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            								";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.leftZeroOrOne), {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            							";
  return buffer;
  }
function program12(depth0,data) {
  
  
  return "\n            								<svg width=\"110\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\">\n            										<ellipse fill=\"none\" stroke-width=\"1.5\" stroke-opacity=\"null\" fill-opacity=\"null\" cx=\"51.62104\" cy=\"10.37595\" id=\"svg_8\" rx=\"46.84273\" ry=\"0.15625\" stroke=\"#666\"/>\n            										<ellipse fill=\"none\" stroke-width=\"12\" stroke-opacity=\"null\" fill-opacity=\"null\" cx=\"22.24682\" cy=\"10.28729\" id=\"svg_15\" rx=\"1.71832\" ry=\"1.53145\" transform=\"rotate(-0.039470430463552475 22.246822357181806,10.287289619445572) \" stroke=\"#666\"/>\n            										<ellipse fill=\"none\" stroke-width=\"1.5\" stroke-opacity=\"null\" fill-opacity=\"null\" cx=\"60.32387\" cy=\"54.48737\" id=\"svg_16\" rx=\"29.16739\" ry=\"0.15625\" transform=\"rotate(90.55730438232422 60.323867797851555,54.48736953735351) \" stroke=\"#666\"/>\n            										<ellipse fill=\"none\" stroke-width=\"1.5\" stroke-opacity=\"null\" fill-opacity=\"null\" cx=\"10.70595\" cy=\"10.10935\" id=\"svg_17\" rx=\"6.82828\" ry=\"0.15625\" transform=\"rotate(89.25360107421875 10.705955505371094,10.109351158142088) \" stroke=\"#666\"/>\n            								</svg>\n            									";
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            									";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.leftOne), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            							 	";
  return buffer;
  }
function program15(depth0,data) {
  
  
  return "\n            									<svg width=\"110\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\">\n            										<ellipse stroke=\"#000\" ry=\"0.15625\" rx=\"46.84273\" id=\"svg_8\" cy=\"10.18846\" cx=\"55.99588\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n            										<ellipse stroke=\"#000\" transform=\"rotate(90.55730438232422 60.323867797851555,54.48736953735351) \" ry=\"0.15625\" rx=\"29.16739\" id=\"svg_16\" cy=\"54.48737\" cx=\"60.32387\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n            									</svg>\n            									";
  }

function program17(depth0,data) {
  
  
  return "\n            							<svg width=\"110.00000000000001\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\">\n            								<ellipse fill=\"none\" stroke-width=\"1.5\" stroke-opacity=\"null\" fill-opacity=\"null\" cx=\"65.93316\" cy=\"10.62595\" id=\"svg_8\" rx=\"42.53032\" ry=\"0.15625\" stroke=\"#666\"/>\n            								<ellipse fill=\"none\" stroke-width=\"1.5\" stroke-opacity=\"null\" fill-opacity=\"null\" cx=\"98.59446\" cy=\"6.49303\" id=\"svg_10\" rx=\"9.98315\" ry=\"0.15625\" transform=\"rotate(-20.98859405517578 98.59446716308595,6.493030071258536) \" stroke=\"#666\"/>\n            								<ellipse fill=\"none\" stroke-width=\"1.5\" stroke-opacity=\"null\" fill-opacity=\"null\" cx=\"14.57365\" cy=\"10.55544\" id=\"svg_11\" rx=\"9.98315\" ry=\"0.15625\" transform=\"rotate(0.7375706434249878 14.573644638061372,10.555437088012791) \" stroke=\"#666\"/>\n            								<ellipse fill=\"none\" stroke-width=\"1.5\" stroke-opacity=\"null\" fill-opacity=\"null\" cx=\"98.28197\" cy=\"14.76368\" id=\"svg_13\" rx=\"9.98315\" ry=\"0.15625\" transform=\"rotate(19.652103424072266 98.28196716308591,14.763684272766087) \" stroke=\"#666\"/>\n            							</svg>\n            								";
  }

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            								";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rightZeroOrOne), {hash:{},inverse:self.program(22, program22, data),fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            							";
  return buffer;
  }
function program20(depth0,data) {
  
  
  return "\n            									<svg width=\"110\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\">\n            										<ellipse stroke=\"#666\" ry=\"0.15625\" rx=\"46.84273\" id=\"svg_8\" cy=\"10.37595\" cx=\"60.37079\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n            										<ellipse stroke=\"#666\" transform=\"rotate(-0.039470430463552475 88.36991882324197,10.287286758425585) \" ry=\"1.53145\" rx=\"1.71832\" id=\"svg_15\" cy=\"10.28729\" cx=\"88.36992\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"12\" fill=\"none\"/>\n            										<ellipse stroke=\"#666\" transform=\"rotate(90.55730438232422 60.323867797851555,54.48736953735351) \" ry=\"0.15625\" rx=\"29.16739\" id=\"svg_16\" cy=\"54.48737\" cx=\"60.32387\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n            										<ellipse stroke=\"#666\" transform=\"rotate(89.25360107421875 100.32839202880858,10.109345436096195) \" ry=\"0.15625\" rx=\"6.82828\" id=\"svg_17\" cy=\"10.10935\" cx=\"100.32839\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n            									</svg>\n            									";
  }

function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            									";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rightOne), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            							 	";
  return buffer;
  }

function program24(depth0,data) {
  
  
  return "\n                                            <td class=\"delete collection-option\"><i class=\"fa fa-trash-o\"></i></td>\n                                        ";
  }

function program26(depth0,data) {
  
  
  return "\n                                            <td class=\"edit collection-option\"><i class=\"fa fa-pencil-square-o\"></i></td>\n                                        ";
  }

function program28(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                                <div class=\"no-data\">\n                                    No ";
  if (helper = helpers.typeLabelPlural) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.typeLabelPlural); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " available\n                                </div>\n                            ";
  return buffer;
  }

  buffer += "<div class=\"modal-header\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n  <h4 class=\"modal-title\" id=\"myModalLabel\">";
  if (helper = helpers.typeLabelPlural) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.typeLabelPlural); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h4>\n</div>\n<div class=\"modal-body\">\n    <div class=\"squid-api-collection-management-widget\">\n            <div class=\"squid-api-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-collection-management\">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.createRole), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    <table style=\"width:100%\">\n                        <tbody ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.valueSelected), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.models), {hash:{},inverse:self.program(28, program28, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </tbody>\n                </table>\n            </div>\n    </div>\n</div>\n<div class=\"squid-api-model-management-footer\">\n    <button type=\"button\" class=\"btn btn-default cancel\">Cancel</button>\n  	<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n</div>\n<!--  end of modal - -->\n</div>\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_shortcuts_admin_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"squid-api-shortcuts-widgets\">\n<form>\n<div class=\"form-group\">\n    <label for=\"shortcutId\">Id</label>\n    <p class=\"help-block\">\n    This is the shortcut identifier which will be used as a URL parameter (\"index.html?shortcut=myid\").\n    If not set it will automatically be generated.</p>\n    <input type=\"text\" class=\"form-control\" id=\"shortcutId\">\n</div>\n<div class=\"form-group\">\n    <label for=\"shortcutName\">Name</label>\n    <p class=\"help-block\">This is a descriptive name for your shortcut. (Optional)</p>\n    <input type=\"text\" class=\"form-control\" id=\"shortcutName\">\n</div>\n<a href=\"#\" class=\"btn btn-primary\" id=\"saveBtn\">Save</a>\n</form>\n</div>";
  });

this["squid_api"]["template"]["squid_api_users_admin_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\n        <tr data-attr=\"add\">\n            <td><input class=\"add form-control input-sm\" placeholder=\"Login Value...\" data-attribute=\"login\"></td>\n            <td><input class=\"add form-control input-sm\" placeholder=\"Email Value...\" data-attribute=\"email\"></td>\n            <td><input class=\"add form-control input-sm\" placeholder=\"Password...\" data-attribute=\"password\" type=\"password\"></td>\n            <td class=\"user-value group-section\"><i class='field-icon fa fa-plus-square'></i><select class=\"add form-control input-sm\" data-attribute=\"groups\"></select></td>\n            <td class=\"action-section\"><span class=\"send-email-label\">Send Email: </span><input class=\"email-checkbox\" type=\"checkbox\" data-attribute=\"sendemail\"><button class=\"add btn btn-default\" data-value=\"add\">Add</button></td>\n        </tr>\n    ";
  }

  buffer += "<div class='sq-loading' style='position:absolute; width:100%; top:40%; z-index: 1;'>\n    <div class=\"spinner\">\n    <div class=\"rect5\"></div>\n    <div class=\"rect4\"></div>\n    <div class=\"rect3\"></div>\n    <div class=\"rect2\"></div>\n    <div class=\"rect1\"></div>\n    <div class=\"rect2\"></div>\n    <div class=\"rect3\"></div>\n    <div class=\"rect4\"></div>\n    <div class=\"rect5\"></div>\n    </div>\n</div>\n<div id=\"squid-api-admin-widgets-user-table\">\n<div class=\"api-feedback\"></div>\n<table class=\"sq-table\">\n    <thead>\n        <tr>\n            <th>Login</th>\n            <th>Email</th>\n            <th>Password</th>\n            <th>Groups</th>\n            <th>Action</th>\n        </tr>\n    </thead>\n    <tbody>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.addUser), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n</table>\n</div>";
  return buffer;
  });
(function (root, factory) {
    root.squid_api.view.BaseCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_base_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : template,
        collection : null,
        selectedModel : null,
        config : null,
        type : null,
        typeLabelPlural : null,
        comparator : null,
        parentType : null,
        modelView : null,
        cancelCallback : null,
        collectionLoading : false,

        initialize: function(options) {
            this.config = squid_api.model.config;
            this.status = squid_api.model.status;
            var me = this;

            if (options) {
                if (options.type) {
                    this.type = options.type;
                }
                if (options.comparator) {
                    this.comparator = options.comparator;
                } else {
                    // default is : sort by alpha name and dynamic last
                    this.comparator =  function(a, b) {
                        var r = me.dynamicComparator(a,b);
                        if (r === 0) {
                            r = me.alphaNameComparator(a,b);
                        }
                        return r;
                    };
                }
                if (options.cancelCallback) {
                    this.cancelCallback = options.cancelCallback;
                }
                if (options.onSelect) {
                    this.onSelect = options.onSelect;
                }
            }
            
            // setup models and listeners
            
            var setSelectedModel = function(modelId) {
                if (this.selectedModel) {
                    this.stopListening(me.selectedModel);
                }
                if (modelId) {
                    me.collection.load(modelId).then(function(model) {
                        me.collectionLoading = false;
                        me.selectedModel = model;
                        me.listenTo(me.selectedModel, "change", me.render);
                        me.render();
                    });
                } else {
                    me.collectionLoading = false;
                    me.render();
                }
            };
            
            this.config.on("change", function (config) {
                var selectedId = config.get(me.configSelectedId);
                if (me.configParentId) {
                    if (config.hasChanged(me.configParentId)) {
                        // parent has changed
                        var parentId = config.get(me.configParentId);
                        me.collectionLoading = true;
                        if (parentId) {
                            // set the collection to listen to
                            if (me.collection) {
                                me.stopListening(me.collection);
                            }
                            me.loadCollection(parentId).done(function(collection) {
                                me.collection = collection;
                                me.listenTo(me.collection, "sync remove", me.render);
                                if (config.hasChanged(me.configSelectedId)) {
                                    // selected also changed
                                    setSelectedModel(selectedId);
                                } else {
                                    me.collectionLoading = false;
                                    me.render();
                                }
                            }).fail(function() {
                                me.collectionLoading = false;
                                me.render();
                            });
                        }
                        me.render();
                    } else if (config.hasChanged(me.configSelectedId)) {
                        // selection only has changed
                        setSelectedModel(selectedId);
                    }
                } else if (config.hasChanged(me.configSelectedId)) {
                    // no parent but selection has changed
                    me.collectionLoading = true;
                    // set collection
                    if (me.collection) {
                        me.stopListening(me.collection);
                    }
                    me.loadCollection(null).done(function(collection) {
                        me.collection = collection;
                        me.listenTo(me.collection, "sync remove", me.render);
                        setSelectedModel(selectedId);
                    }).fail(function() {
                        me.collectionLoading = false;
                        me.render();
                    });
                    me.render();
                }
            });

            this.init(options);
        },
        
        init: function(options) {
            // may be overridden
        },

        /**
         * Load main collection
         * @return Promise
         */
        loadCollection : function() {
            console.error("loadCollection must be overridden");
        },

        alphaNameComparator : function(a,b) {
            var va = a.get("name").toLowerCase();
            var vb = b.get("name").toLowerCase();
            if (va < vb) {
                return -1;
            }
            if (va > vb) {
                return 1;
            }
            return 0;
        },

        dynamicComparator : function(a,b) {
            var da = a.get("dynamic");
            var db = b.get("dynamic");
            return (da === db) ? 0 : da ? 1 : -1;
        },

        originalEvents: {
            // select
            "click .select": function(event) {
                var value = $(event.target).parent('tr').attr('data-attr');
                this.config.set(this.type.toLowerCase(), value);
                if (this.onSelect) {
                    this.onSelect.call();
                }
            },
            "click .refresh": function(event) {
                var id = $(event.target).parents('tr').attr("data-attr");
                var model = this.collection.get(id);
                squid_api.refreshObjectType(model);
            },
            "click .create" : function() {
                var me = this;
                // create a new model
                var model = new this.collection.model();
                model.set("id", this.collection.parent.get("id"));
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
            "click .edit" : function(event) {
                var me = this;
                var id = $(event.target).parents('tr').attr("data-attr");
                var model = this.collection.get(id);
                // listen for model changes
                me.listenTo(model, "change", function() {
                    me.render();
                });
                this.renderModelView(new this.modelView({
                    model : model,
                    cancelCallback : function() {
                        me.render();
                    }
                }));
            },
            "click .delete": function(event) {
                var me = this;
                var id = $(event.target).parents('tr').attr("data-attr");
                var model = this.collection.get(id);
                if (confirm("are you sure you want to delete the " + model.definition.toLowerCase() + " " + model.get("name") + "?")) {
                    if (true) {
                        model.destroy({
                            wait : true,
                            success:function(model) {
                                // set status
                                var message = model.get("objectType") + " with name " + model.get("name") + " has been successfully deleted";
                                me.status.set({'message' : message});
                            },
                            error : function(collection, response) {
                                me.status.set({'error' : response});
                            }
                        });
                    }
                }
            }
        },

        // Additional Events to be overridden
        additionalEvents: {

        },

        events : function() {
            return _.extend({},this.originalEvents,this.additionalEvents);
        },

        getCreateRole: function() {
            var role = false;
            if (this.collection) {
                if (this.collection.parent) {
                    var parentRole = this.collection.parent.get("_role");
                    // write role
                    if (parentRole === "OWNER" || parentRole === "WRITE") {
                        role = true;
                    }
                }
            }
            return role;
        },

        getModelRoles: function(model) {
            var roles;
            var role = model.get("_role");
            if (!role || (role === "OWNER" || role === "WRITE")) {
                roles = {"edit" : true, "delete" : true, "refresh" : true};
            } else {
                roles = {"edit" : false, "delete" : false, "refresh" : false};
            }
            return roles;
        },
        
        getModelLabel: function(model) {
            return model.get("name");
        },

        renderModelView: function(modelView) {
            this.$el.html(modelView.el);
        },

        render: function() {
            console.log("render CollectionManagementWidget "+this.type);
            var jsonData = {
                collectionLoaded : !this.collectionLoading,
                collection : this.collection,
                roles : null,
                createRole : null,
                typeLabelPlural : this.typeLabelPlural,
                modalHtml : true,
                type : this.type
            };
            if (this.collection) {
                jsonData.collection = {"models" : []};
                jsonData.createRole = this.getCreateRole();

                for (i=0; i<this.collection.size(); i++) {
                    var item = this.collection.at(i);
                    var model = {};
                    model.label = this.getModelLabel(item);
                    model.value = item.get("oid");
                    model.roles = this.getModelRoles(item);

                    // detect selected model
                    if (model.value === this.config.get(this.type.toLowerCase())) {
                        model.selected = true;
                    }
                    jsonData.collection.models.push(model);
                }
            }
            // print template
            var html = this.template(jsonData);
            this.$el.html(html);
            return this;
        }
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.BaseModelManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_base_model_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        model : null,
        collectionPluralLabel : null,
        setConfigOnSave : null,

        initialize: function(options) {
            this.status = squid_api.model.status;
            this.config = squid_api.model.config;

            if (options.model) {
                this.model = options.model;
            }
            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            if (options.cancelCallback) {
                this.cancelCallback = options.cancelCallback;
            }
            if (options.setConfigOnSave) {
                this.setConfigOnSave = options.setConfigOnSave;
            }
            if (options.onSave) {
                this.onSave = options.onSave;
            }
            this.render();
        },

        dataManipulation: function(data) {
            for (var x in data) {
                if (typeof(data[x]) == "object") {
                    for (var y in data[x]) {
                        if (data[x][y] !== null) {
                            if (data[x][y].length === 0) {
                                data[x][y] = null;
                            }
                        }
                    }
                } else if (!data[x] || (data[x].length === 0)) {
                    data[x] = null;
                }
            }
            return data;
        },

        customDataManipulation: function(data) {
            return data;
        },

        events: {
            "click .btn-cancel": function() {
                // reset parent view if cancel button clicked
                if (this.cancelCallback) {
                    this.cancelCallback.call();
                }
            },
            "click .btn-save-form" : function() {
                var me = this;
                var error = this.formContent.validate();
                if (! error) {
                    // global data manipulation
                    var data = this.dataManipulation(this.formContent.getValue());

                    // for any custom model manipulation before save
                    data = this.customDataManipulation(data);

                    // save model
                    this.model.save(data, {
                        wait: true,
                        success: function(model) {
                            // status update
                            if (me.cancelCallback) {
                                me.cancelCallback.call();
                            }
                            // call once saved
                            if (me.onSave) {
                                me.onSave(model);
                            }
                            me.status.set("message", "Sucessfully saved");
                        },
                        error: function(xhr) {
                            me.status.set("error", xhr);
                        }
                    });
                }
            }
        },

        onSave: function(model) {
            // to be overridden from other model management widgets
            console.log("once saved");
        },

        formEvents: function() {
            // to be overridden from other model management widgets
        },

        setSchema: function() {
            var dfd = $.Deferred();
            // to be overridden from other model management widgets
            return dfd.resolve(this.schema);
        },

        render: function() {
            var me = this;
            var jsonData = {};

            if (this.model.isNew()) {
                jsonData.headerLabel = "Creating a new " + this.model.definition.toLowerCase();
            } else {
                jsonData.headerLabel = "Editing " + this.model.definition.toLowerCase() + " with name '" + this.model.get("name") + "'";
            }

            this.setSchema().then(function(schema) {
                // create form
                me.formContent = new Backbone.Form({
                    schema: schema,
                    model: me.model
                }).render();

                // append save buttons
                me.$el.html(me.template(jsonData));

                // place the form into a backbone view
                me.$el.find(".modal-body").html(me.formContent.el);

                // form events
                me.formEvents();
            });

            return this;
        }

    });

    return View;
}));

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

            // override select event
            this.originalEvents = squid_api.view.BaseCollectionManagementWidget.prototype.originalEvents;
            this.originalEvents["click .select"] = function(event) {
                var value = $(event.target).parent('tr').attr('data-attr');
                squid_api.setBookmarkId(value);
            };
            // override create event
            this.originalEvents["click .create"] = function() {
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
            };
            
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
        "setConfig" : {
            "type" : "SetConfig",
            "fieldClass" : "squid-api-set-config",
            "editorClass" : "form-control"
        },
        "config" : {
            "type" : "JsonTextArea",
            "title" : "Config",
            "position" : 1,
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

        tagName: 'button',
        defaultValue : "Set current config",

        initialize: function(options) {
            // Call parent constructor
            Backbone.Form.editors.Base.prototype.initialize.call(this, options);
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
            this.setValue(this.value);

            return this;
        },

        getValue: function() {
            return this.$el.html();
        },

        setValue: function(value) {
            this.$el.html(value);
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

(function (root, factory) {
    root.squid_api.view.BookmarkSelectorButton = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_button_view);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BookmarkCollectionManagementWidget.extend({
        
        render: function() {
            var label = this.typeLabelPlural;
            var jsonData = {
                label : label,
                visible : false,
                collectionLoaded : !this.collectionLoading,
                collection : this.collection,
                typeLabelPlural : this.typeLabelPlural
            };
            if (this.collection) {
                jsonData.visible = true;
                if (this.selectedModel) {
                    if (this.selectedModel.get("oid")) {
                        // always display default label
                    }
                }
            } else {
                jsonData.visible = false;
            }

            this.$el.html(template(jsonData));

            return this;
        }

    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.CollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        collection : null,
        config : null,
        modalElementClassName : "squid-api-admin-widgets-modal-form squid-api-admin-widgets-modal-form-collection",
        type : null,
        typeLabel : null,
        typeLabelPlural : null,
        collectionAvailable : true,
        suggestionHandler : null,
        changeEventHandler : null,
        schemasCallback : null,
        afterRenderHandler : null,
        beforeRenderHandler : null,
        comparator : null,
        displaySelected : true,

        alphaNameComparator : function(a,b) {
            var va = a.get("name").toLowerCase();
            var vb = b.get("name").toLowerCase();
            if (va < vb) {
                return -1;
            }
            if (va > vb) {
                return 1;
            }
            return 0;
        },

        dynamicComparator : function(a,b) {
            var da = a.get("dynamic");
            var db = b.get("dynamic");
            return (da === db) ? 0 : da ? 1 : -1;
        },

        labelHandler : function(model) {
            return model.get("name");
        },

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            if (options.changeEventHandler) {
                this.changeEventHandler = options.changeEventHandler;
            }
            if (options.type) {
                this.type = options.type;
            }
            if (options.typeLabel) {
                this.typeLabel = options.typeLabel;
            } else {
                this.typeLabel = this.type;
            }
            if (options.typeLabelPlural) {
                this.typeLabelPlural = options.typeLabelPlural;
            } else {
                this.typeLabelPlural = this.typeLabel + "s";
            }
            if (options.config) {
                this.config = options.config;
            } else {
                this.config = squid_api.model.config;
            }
            if (options.parent) {
                this.parent = options.parent;
            }
            if (!this.model) {
                this.model =  new squid_api.model[this.type + "Model"]();
            }
            if (options.schemasCallback) {
                this.schemasCallback = options.schemasCallback;
            }
            if (options.beforeRenderHandler) {
                this.beforeRenderHandler = options.beforeRenderHandler;
            }
            if (options.afterRenderHandler) {
                this.afterRenderHandler = options.afterRenderHandler;
            }
            if (options.comparator) {
                this.comparator = options.comparator;
            } else {
                // default is : sort by alpha name and dynamic last
                this.comparator =  function(a, b) {
                    var r = me.dynamicComparator(a,b);
                    if (r === 0) {
                        r = me.alphaNameComparator(a,b);
                    }
                    return r;
                };
            }
            if (options.labelHandler) {
                this.labelHandler = options.labelHandler;
            }
            if (options.displaySelected === false) {
                this.displaySelected = false;
            }

            if (options.getRoles) {
                this.getRoles = options.getRoles;
            }

            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.parent, "change:id", function() {
                this.initCollection();
            });

            this.initCollection();
        },

        initCollection : function() {
            if (this.collectionAvailable) {
                this.collectionAvailable = false;
                var me = this;

                // match a base collection
                for (var collectionItem in squid_api.model) {
                    var str = collectionItem;
                    var res = str.match(this.type + "Collection");
                    if (res) {
                        this.collection = new squid_api.model[res]();
                    }
                }
                if (!this.collection) {
                    squid_api.model.status.set({error : true, message: "No collection found for type :"+ this.type});
                }

                this.collection.comparator = this.comparator;
                this.collection.on("remove", function(model) {
                    if (model.get("oid") == me.config.get(me.model.definition.toLowerCase())) {
                        me.config.unset(me.model.definition.toLowerCase());
                    }
                });
                this.collection.on("reset change sync", this.render, this);
                this.collection.on('beforeFetch', function() {
                    me.$el.find("button").text("Fetching " + me.typeLabelPlural);
                });

                this.render();

                if (this.parent.get("id")) {
                    this.collection.parentId = this.parent.get("id");
                    this.collection.fetch({
                        success : function() {
                            me.collectionAvailable = true;
                        },
                        error : function(collection, response, options) {
                            squid_api.model.status.set({"error":response});
                            me.collectionAvailable = true;
                        }
                    });
                } else {
                    me.collectionAvailable = true;
                }
            }
        },

        setModel : function(model) {
            this.model = model;
            this.listenTo(this.model, "change", this.render);
        },

        events: {
            "click button": function() {
                var me = this;

                if (this.collectionModal) {
                    this.collectionModal.$el.find(".modal-body").html(this.html);
                    // redelegate events after updating template
                    this.collectionModal.delegateEvents();
                    this.collectionModal.open();
                } else {
                    this.collectionModal = new Backbone.BootstrapModal({
                        content: this.html,
                        title: this.typeLabelPlural
                    });
                    this.collectionModal.open();
                }
                // remove button
                $(this.collectionModal.el).find("button.selected-model").remove();

                // modal wrapper class
                $(this.collectionModal.el).addClass(this.modalElementClassName);
                $(this.collectionModal.el).addClass("squid-api-" + this.type + "-model-widget-popup-container");

                // add events
                this.actionEvents(this.roles);

                /* bootstrap doesn't remove modal from dom when clicking outside of it.
                   Check to make sure it has been removed whenever it isn't displayed.
                */
                $(this.collectionModal.el).one('hidden.bs.modal', function () {
                    me.closeModal();
                });
                $(this.collectionModal.el).find(".close").one("click", function() {
                    $(me.collectionModal.el).trigger("hidden.bs.modal");
                });
                $(this.collectionModal.el).find(".cancel").one("click", function() {
                    $(me.collectionModal.el).trigger("hidden.bs.modal");
                });
            }
        },

        closeModal : function() {
            this.collectionModal.close();
            this.collectionModal.remove();
        },

        actionEvents: function(roles) {
            var me = this;

            // select
            $(".squid-api-" + this.type + "-model-widget-popup .select").on("click", function() {
                var value = $(this).parent('tr').attr('data-attr');
                if (me.changeEventHandler) {
                    $(me.collectionModal.el).trigger("hidden.bs.modal");
                    $(".squid-api-" + this.type + "-model-widget-popup").dialog("close");
                    me.changeEventHandler.call(this, value);
                } else {
                    console.log('no change handler defined');
                }
            });

            if (roles.create) {
                // create
                $(".squid-api-" + this.type + "-model-widget-popup .create").on("click", function() {
                    new squid_api.view.ModelManagementView({
                        el : $(this).find(".create"),
                        model : new squid_api.model[ me.model.definition + "Model"](),
                        parent : me.parent,
                        autoOpen : true,
                        schemasCallback : me.schemasCallback,
                        beforeRenderHandler : me.beforeRenderHandler,
                        afterRenderHandler : me.afterRenderHandler,
                        successHandler : function() {
                            if (me.changeEventHandler) {
                                me.changeEventHandler.call(this);
                            }
                            me.collection.add(this);
                            $(me.collectionModal.el).trigger("hidden.bs.modal");
                            var message = me.typeLabel + " has been successfully created";
                            squid_api.model.status.set({'message' : message});
                        }
                    });
                });
            }

            // edit
            $(".squid-api-" + this.type + "-model-widget-popup .edit").on("click", function() {
                var id = this.parentElement.dataset.attr;
                var model = me.collection.get(id);
                new squid_api.view.ModelManagementView({
                    el : $(this),
                    model : model,
                    parent : me.parent,
                    autoOpen : true,
                    schemasCallback : me.schemasCallback,
                    beforeRenderHandler : me.beforeRenderHandler,
                    afterRenderHandler : me.afterRenderHandler,
                    buttonLabel : "edit",
                    successHandler : function() {
                        if (me.changeEventHandler) {
                            me.changeEventHandler.call(this);
                        }
                        var message = me.type + " with name " + this.get("name") + " has been successfully modified";
                        squid_api.model.config.trigger("change:project", squid_api.model.config);
                        squid_api.model.status.set({'message' : message});
                    }
                });
            });

            // refresh
            $(".squid-api-" + this.type + "-model-widget-popup .refresh").on("click", function() {
                var id = this.parentElement.dataset.attr;
                var model = me.collection.get(id);
                squid_api.refreshObjectType(model);
            });

            // delete
            $(".squid-api-" + this.type + "-model-widget-popup .delete").on("click", function() {
                var id = this.parentElement.dataset.attr;
                var model = me.collection.get(id);

                if (confirm("are you sure you want to delete the " + model.definition.toLowerCase() + " " + model.get("name") + "?")) {
                    if (true) {
                        model.destroy({
                            wait : true,
                            success:function(collection) {
                                $(me.collectionModal.el).trigger("hidden.bs.modal");
                                var message = me.typeLabel + " with name " + collection.get("name") + " has been successfully deleted";
                                squid_api.model.status.set({'message' : message});
                            },
                            error : function(collection, response) {
                                squid_api.model.status.set({'error' : response});
                            }
                        });
                    }
                }
            });
        },

        getRoles: function() {
            // roles
            var roles = {"create" : false, "edit" : false, "delete" : false, "refresh" : false};

            var parentRole = this.parent.get("_role");

            // write role
            if (parentRole == "OWNER" || parentRole == "WRITE") {
                roles.create = true;
                roles.edit = true;
                roles.delete = true;
                roles.refresh = true;
            }

            return roles;
        },

        render: function() {
            var me = this;

            this.roles = this.getRoles();
            var collectionNotAvailableReason = "please select a " + this.parent.definition + " first ";

            var jsonData = {
                    "selAvailable" : false,
                    "type" : this.type,
                    "typeLabel" : this.typeLabel,
                    "typeLabelPlural" : this.typeLabelPlural,
                    "options" : [],
                    "valueSelected" : false,
                    "create" : this.roles.create,
                    "refresh" : this.roles.refresh,
                    "collectionAvailable" : this.collectionAvailable,
                    "collectionNotAvailableReason" : collectionNotAvailableReason
            };
            if (this.model && this.model.get("id")) {
                jsonData.selectedLabel = this.model.get("name");
            } else {
                jsonData.selectedLabel = null;
            }

            var models = this.collection.models;

            // selected obj
            var sel = [];

            // populate view data
            for (i=0; i<models.length; i++) {
                jsonData.selAvailable = true;
                var selected = false;
                var model = models[i];
                // obtain name from model
                var oid = model.get("oid");
                if (oid) {
                    if (this.config.get(this.type.toLowerCase()) === oid) {
                        jsonData.selectedName = model.get("name");
                        selected = true;
                    }
                }
                var option = {
                        "label" : this.labelHandler(model),
                        "value" : oid,
                        "selected" : selected,
                        "edit" : this.roles.edit,
                        "refresh" : this.roles.refresh,
                        "delete" : this.roles.delete
                };

                // support dynamic collections
                if (model.get("dynamic")) {
                    option.dynamic = true;
                    option.label = "~" + model.get("name");
                } else {
                    option.dynamic = false;
                }

                if (selected) {
                    jsonData.valueSelected = true;
                    sel.push(option);
                } else {
                    jsonData.options.push(option);
                }
            }

            // place selected obj at start of array
            if (sel[0]) {
                jsonData.options.unshift(sel[0]);
            }

            // print template
            this.html = this.template(jsonData);
            this.$el.html(this.html);

            if (this.afterRenderHandler) {
                this.afterRenderHandler.call(this);
            }

            if (this.collectionModal) {
                this.collectionModal.$el.find(".modal-body").html(this.html);
                // redelegate events after updating template
                this.collectionModal.delegateEvents();

                // remove button
                $(this.collectionModal.el).find("button.selected-model").remove();

                // modal wrapper class
                $(this.collectionModal.el).addClass(this.modalElementClassName);
                $(this.collectionModal.el).addClass("squid-api-" + this.type + "-model-widget-popup-container");

                // add events
                this.actionEvents(this.roles);
            }

            // set button value
            if ((this.displaySelected !== false) && jsonData.valueSelected) {
                this.$el.find("button.selected-model").text(jsonData.selectedName);
                this.$el.find("button.selected-model").addClass("value-selected");
            } else {
                this.$el.find("button.selected-model").text(this.typeLabelPlural);
                this.$el.find("button.selected-model").removeClass("value-selected");
            }

            // hide main button if parent is not set
            if (!this.parent.get("id")) {
                this.$el.find("button.selected-model").addClass("hidden");
            } else {
                this.$el.find("button.selected-model").removeClass("hidden");
            }

            // remove popup information from the view
            this.$el.find(".squid-api-" + this.type + "-model-widget-popup").remove();

            return this;
        }

    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.ColumnsManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_columns_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseCollectionManagementWidget.extend({
        modelView : squid_api.view.ColumnsModelManagementWidget,
        configParentId : "domain",
        
        events: {
            "change select" : function(event) {
                var me = this;
                var dynamic = [];
                var nonDynamic = [];

                // update edit element
                var name = $(event.target).find("option:selected:last").html();
                var value = $(event.target).find("option:selected:last").val();

                //update edit / delete buttons
                if (name !== undefined) {
                    this.$el.find(".edit").removeAttr("disabled");
                    this.$el.find(".edit").html("edit " + name);
                    this.$el.find(".edit").attr("data-value", value);

                    this.$el.find(".delete").removeAttr("disabled");
                    this.$el.find(".delete").html("delete " + name);
                    this.$el.find(".delete").attr("data-value", value);
                }

                // selected values in the second select box
                var options1 = $(this.$el.find("select")[1]).find("option");
                var options2 = $(this.$el.find("select")[0]).find("option");

                // store visually updated attributes
                for (i=0; i<options1.length; i++) {
                    nonDynamic.push(options1[i]);
                }
                for (i=0; i<options2.length; i++) {
                    dynamic.push(options2[i]);
                }
                // check nonDynamic Data
                var model;
                var changeCount = 0;
                for (i=0; i<nonDynamic.length; i++) {
                    model = this.collection.get($(nonDynamic[i]).val());
                    if (model.get("dynamic") === true) {
                        changeCount++;
                        model.set({"dynamic":false},{silent: true});
                    }
                }
                // check dynamic Data
                for (i=0; i<dynamic.length; i++) {
                    model = this.collection.get($(dynamic[i]).val());
                    if (model.get("dynamic") === false) {
                        changeCount++;
                        model.set({"dynamic":true},{silent: true});
                    }
                }

                // update all models at the same time
                if (changeCount > 0) {
                    this.collection.saveAll(this.collection.models).then(function() {
                        // TODO fetch the parent as it may have changed from non dynamic to dynamic
                        // but this resets the parent collections as the API returns an empty array
                        // me.collection.parent.fetch().done(function() {
                        me.collection.parent.set("dynamic", false);
                        
                        // force a filters re-computation because dimension selector uses it
                        // TODO do not trigger if the collection is metrics
                        me.config.trigger("change:selection");
                        
                    });
                }
            },
            "click .create": function() {
                var me = this;
                // create a new model
                var model = new this.collection.model();
                model.set("id", this.collection.parent.get("id"));
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
            "click .edit": function(event) {
                var me = this;
                var id = $(event.target).attr("data-value");
                var model = this.collection.findWhere({"oid" : id});
                // listen for model changes
                me.listenTo(model, "change", function() {
                    me.render();
                });
                this.renderModelView(new this.modelView({
                    model : model,
                    cancelCallback : function() {
                        me.render();
                    }
                }));
            },
            "click .refresh": function(event) {
                var id = $(event.target).attr("data-value");
                var model = this.collection.get(id);
                squid_api.refreshObjectType(model);
            },
            "click .delete": function(event) {
                var me = this;
                var id = $(event.target).attr("data-value");
                var model = this.collection.findWhere({"oid" : id});
                if (confirm("are you sure you want to delete the " + model.definition.toLowerCase() + " " + model.get("name") + "?")) {
                    if (true) {
                        model.destroy({
                            wait : true,
                            success:function(model) {
                                // set status
                                var message = me.type + " with name " + model.get("name") + " has been successfully deleted";
                                me.status.set({'message' : message});
                            },
                            error : function(collection, response) {
                                me.status.set({'error' : response});
                            }
                        });
                    }
                }
            }
        },
        
        loadCollection : function(parentId) {
            var me = this;
            return squid_api.getCustomer().then(function(customer) {
                return customer.get("projects").load(me.config.get("project")).then(function(project) {
                    return project.get("domains").load(parentId).then(function(domain) {
                        return domain.get(me.typeLabelPlural.toLowerCase()).load();
                    });
                });
            });
        },

        init : function() {
            var me = this;
            this.modelView = squid_api.view.ColumnsModelManagementWidget;
        },

        sortData : function(data) {

            // build the parent index
            var lookup = {};
            for (var ix1=0; ix1<data.length; ix1++)  {
                lookup[data[ix1].id]=data[ix1];
            }
            // build the sort name
            for (var ix2=0; ix2<data.length; ix2++)  {
                var parentId = data[ix2].parentId;
                data[ix2].sortName = data[ix2].name;
                data[ix2].depth = 0;
                while (parentId) {
                    var parent = lookup[parentId];
                    if (parent) {
                        data[ix2].sortName = parent.name + "/" + data[ix2].sortName;
                        if (data[ix2].depth<5) data[ix2].depth++;
                        parentId = parent.parentId;
                    } else {
                        break;
                    }
                }
            }

            // alphabetical sorting
            data.sort(function(a, b){
                var nameA = a.sortName.toLowerCase();
                var nameB = b.sortName.toLowerCase();
                if (nameA < nameB)  {
                    // sort string ascending
                    return -1;
                } else if (nameA > nameB) {
                    return 1;
                } else {
                    return 0; // no sorting
                }
            });

            return data;
        },
        activatePlugin: function() {
            this.$el.find("select").bootstrapDualListbox({
                moveOnSelect: false,
                showFilterInputs: false,
                filterTextClear : " ",
                selectedListLabel: "Active",
                nonSelectedListLabel: "Inactive",
                infoText: '({0})',
                infoTextEmpty: "(0)",
                selectorMinimalHeight: 250
            });
        },
        viewData: function() {
            var viewData = {"dynamic" : [], "nonDynamic" : [], "typeLabelPlural" : this.typeLabelPlural};
            if (this.collection) {
                var models = this.collection.models;
                for (i=0; i<models.length; i++) {
                    var obj = {};
                    obj.name = models[i].get("name");
                    obj.id = models[i].get("oid");

                    if (models[i].get("parentId")) {
                        obj.parentId = models[i].get("parentId")[this.type.toLowerCase() + "Id"];
                    }

                    if (models[i].get("dynamic")) {
                        viewData.dynamic.push(obj);
                    } else {
                        viewData.nonDynamic.push(obj);
                    }
                }

                // sort data
                viewData.dynamic = this.sortData(viewData.dynamic);
                viewData.nonDynamic = this.sortData(viewData.nonDynamic);
            }
            return viewData;
        },
        render : function() {
            this.$el.html(template(this.viewData()));
            this.activatePlugin();
            return this;
        }
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.ColumnsModelManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_model_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseModelManagementWidget.extend({

        customDataManipulation: function(data) {
            if (data.type.length === 0) {
                data.type = "INDEX";
            } else {
                data.type = data.type[0];
            }
            return data;
        },

        onSave: function(model) {
            // to be overridden from other model management widgets
            console.log("once saved");
        },

        formEvents: function() {
            // to be overridden from other model management widgets
        }

    });

    return View;
}));

(function (root, factory) {
    factory(root.Backbone, root.squid_api);
}(this, function (Backbone, squid_api) {

    /*jshint multistr: true */

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
            "dbCheckConnection" : {
                "type" : "DbCheckConnection",
                "fieldClass" : "squid-api-check-db-connection",
                "editorClass" : "form-control",
                "position" : 4
            },
            "dbSchemas" : {
                "title" : "Database Schemas",
                "type" : "Checkboxes",
                "editorClass" : " ",
                "options" : [],
                "position" : 5,
                "fieldClass" : "dbSchemas checkbox"
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
                        "type" : "DomainExpressionEditor",
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
                        "type" : "RelationExpressionEditor",
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
                "fieldClass" : "type checkbox"
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
                        "type" : "DimensionExpressionEditor",
                        "editorClass" : "form-control suggestion-box",
                        "title" : "Expression Value",
                        "validators": ['required']
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
                        "type" : "MetricExpressionEditor",
                        "editorClass" : "form-control suggestion-box",
                    }
                },
                "position" : 1,
                "fieldClass" : "expression"
            }
    };

    // Define "dbCheckConnection" Custom Editor
    var dbCheckConnection = Backbone.Form.editors.Base.extend({

        tagName: 'button',
        defaultValue : "Check Connection",

        initialize: function(options) {
            // Call parent constructor
            Backbone.Form.editors.Base.prototype.initialize.call(this, options);

            this.status = squid_api.model.status;
            this.config = squid_api.model.config;
            this.login = squid_api.model.login;
        },
        events: {
            "click" : "checkConnection"
        },

        checkConnection: function(event) {
            var me = this;

            // prevent redirect
            event.preventDefault();
            // add class for spinning wheel
            this.$el.addClass("in-progress");
            // collect prerequisites
            var dburl = this.form.fields.dbUrl.getValue();
            var dbPassword =  this.form.fields.dbPassword.getValue();
            var dbUser = this.form.fields.dbUser.getValue();
            var projectId = this.form.fields.id.getValue().projectId;
            var url = squid_api.apiURL + "/connections/validate" + "?access_token="+this.login.get("accessToken")+"&url="+dburl+"&username="+ dbUser +"&password=" + encodeURIComponent(dbPassword);
            if (projectId) {
                url = url + "&projectId="+projectId;
            }

            $.ajax({
                type: "GET",
                url: squid_api.apiURL + "/connections/validate" + "?access_token="+this.login.get("accessToken")+"&projectId="+projectId+"&url="+dburl+"&username="+ dbUser +"&password=" + encodeURIComponent(dbPassword),
                dataType: 'json',
                contentType: 'application/json',
                success: function (response) {
                    me.status.set({"error":null});
                    me.$el.removeClass("in-progress");
                    me.$el.removeClass("btn-danger");
                    me.$el.addClass("btn-success");
                    me.form.fields.dbSchemas.editor.setOptions(response.definitions);
                    me.form.fields.dbSchemas.$el.find("ul").show();
                },
                error: function(xhr, textStatus, error){
                    me.status.set({"error":xhr});
                    me.$el.removeClass("in-progress");
                    me.$el.removeClass("btn-success");
                    me.$el.addClass("btn-danger");
                    me.form.fields.dbSchemas.$el.find("ul").hide();
                }

            });
        },
        render: function() {
            this.setValue(this.value);

            return this;
        },

        getValue: function() {
            return this.$el.html();
        },

        setValue: function(value) {
            this.$el.html(value);
        }
    });

    // Define "baseExpressionEditor" Custom Editor
    var baseExpressionEditor = Backbone.Form.editors.Base.extend({
        tagName: 'textarea',
        modelId: null,

        events: {
            'keyup' : 'renderDialog',
            'click' : 'renderDialog'
        },

        initialize: function(options) {
            // Call parent constructor
            Backbone.Form.editors.Base.prototype.initialize.call(this, options);
            if (options.schema.modelId) {
                this.modelId = options.schema.modelId;
            }
        },

        getValue: function() {
            return this.$el.val();
        },

        setValue: function(value) {
            this.$el.val(value);
        },

        render: function() {
            this.setValue(this.value);

            return this;
        },

        performRequest: function(url, data) {
            var me = this;
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
                        var beginRange = me.$el.prop("selectionStart");
                        var endRange = me.$el.prop("selectionEnd")-1;
                        if (response.beginInsertPos !== undefined && response.endInsertPos !== undefined) {
                            if (response.beginInsertPos<beginRange) {
                                beginRange = response.beginInsertPos;
                            }
                            if (endRange<response.endInsertPos) {
                                endRange = response.endInsertPos;
                            }
                        }
                        // append div
                        me.$el.after("<div class='squid-api-pre-suggestions squid-api-dialog'><ul></ul></div>");
                        var suggestionList = me.$el.siblings(".squid-api-pre-suggestions").find("ul");
                        for (i=0; i<response.suggestions.length; i++) {
                            var suggestionDisplay = response.suggestions[i].suggestion;
                            if (response.suggestions[i].display) {
                                suggestionDisplay = response.suggestions[i].display;
                            }
                            var item = $("<li class=\"" + response.suggestions[i].objectType.toString() + " " + response.suggestions[i].valueType.toLowerCase() + "\"><span class='suggestion'>" +  suggestionDisplay + "</span><span class='valueType'>(" + response.suggestions[i].valueType.toLowerCase() + ")</span></li>");
                            item.data("suggestion-value",response.suggestions[i].suggestion);
                            item.appendTo(suggestionList);
                        }
                        me.$el.siblings(".squid-api-pre-suggestions").find("li").click(me, function(event) {
                            var item;
                            if ($(event.target).is("li")) {
                                item = $(event.target).data("suggestion-value");
                            } else {
                                item = $(event.target).closest("li").data("suggestion-value");
                            }
                            var value = me.$el.val();
                            var str = value.substring(0, beginRange);
                            str += item;
                            var newPos = str.length;
                            str += value.substring(endRange+1);
                            me.setValue(str);
                            me.renderDialog();
                            me.$el[0].setSelectionRange(newPos,newPos);
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

    var domainExpressionEditor = baseExpressionEditor.extend({
        renderDialog: function() {
            var url = squid_api.apiURL + "/projects/" + this.$el.parents("form").find(".id input[name='projectId']").val() + "/domains-suggestion";
            var data = {"expression" : this.$el.val(), "offset" : this.$el.prop("selectionStart") + 1, "access_token" : squid_api.model.login.get("accessToken")};
            this.performRequest(url, data);

        }
    });
    var dimensionExpressionEditor = baseExpressionEditor.extend({
        renderDialog: function() {
            var url = squid_api.apiURL + "/projects/" + this.$el.parents("form").find(".id input[name='projectId']").val() + "/domains/" + this.$el.parents("form").find(".id input[name='domainId']").val() + "/dimensions-suggestion";
            var data = {"expression" : this.$el.val(), "offset" : this.$el.prop("selectionStart") + 1, "access_token" : squid_api.model.login.get("accessToken")};
            data.dimensionId = this.modelId;
            this.performRequest(url, data);

        }
    });
    var metricExpressionEditor = baseExpressionEditor.extend({
        renderDialog: function() {
            var url = squid_api.apiURL + "/projects/" + this.$el.parents("form").find(".id input[name='projectId']").val() + "/domains/" + this.$el.parents("form").find(".id input[name='domainId']").val() + "/metrics-suggestion";
            var data = {"expression" : this.$el.val(), "offset" : this.$el.prop("selectionStart") + 1, "access_token" : squid_api.model.login.get("accessToken")};
            this.performRequest(url, data);

        }
    });
    var relationExpressionEditor = baseExpressionEditor.extend({
        renderDialog: function() {
            var url = squid_api.apiURL + "/projects/" + this.$el.parents("form").find(".id input[name='projectId']").val() + "/relations-suggestion";
            var data = {"expression" : this.$el.val(), "offset" : this.$el.prop("selectionStart") + 1, "access_token" : squid_api.model.login.get("accessToken")};
            data.leftDomainId = this.$el.parents("form").find(".leftId select[name='domainId']").val();
            data.rightDomainId = this.$el.parents("form").find(".rightId select[name='domainId']").val();
            this.performRequest(url, data);

        }
    });

    // Register custom editors
    Backbone.Form.editors.DomainExpressionEditor = domainExpressionEditor;
    Backbone.Form.editors.DimensionExpressionEditor = dimensionExpressionEditor;
    Backbone.Form.editors.MetricExpressionEditor = metricExpressionEditor;
    Backbone.Form.editors.RelationExpressionEditor = relationExpressionEditor;
    Backbone.Form.editors.DbCheckConnection = dbCheckConnection;
}));

(function (root, factory) {
    root.squid_api.view.DimensionColumnsManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_columns_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.ColumnsManagementWidget.extend({
        type : "Dimension",
        typeLabelPlural : "Dimensions"
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.DomainCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_domain_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseCollectionManagementWidget.extend({

        typeLabelPlural : "Domains",
        type : "domain",
        modelView : null,
        template : template,
        collectionLoading : false,
        configSelectedId : "domain",
        configParentId : "project",

        init : function() {
            var me = this;

            this.modelView = squid_api.view.BaseModelManagementWidget;
            this.relationView = squid_api.view.RelationCollectionManagementWidget;
        },
        
        loadCollection : function(parentId) {
            return squid_api.getCustomer().then(function(customer) {
                return customer.get("projects").load(parentId).then(function(project) {
                    return project.get("domains").load();
                });
            });
        },

        additionalEvents: {
            "click .relation": function(event) {
                var me = this;
                var modelValue = $(event.target).parents('tr').attr("data-attr");
                this.renderRelationView(new this.relationView({
                    modelValue : modelValue,
                    cancelCallback : function() {
                        me.render();
                    }
                }));
            }
        },

        renderRelationView: function(relationView) {
            this.$el.html(relationView.el);
        },
        
        getModelLabel: function(model) {
            if (model.get("dynamic")) {
                return "~ " + model.get("name");
            } else {
                return model.get("name");
            }
        }

    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.DomainSelectorButton = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_button_view);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.DomainCollectionManagementWidget.extend({
        
        render: function() {
            var label = this.typeLabelPlural;
            var jsonData = {
                label : label,
                visible : false,
                collectionLoaded : !this.collectionLoading,
                collection : this.collection,
                typeLabelPlural : this.typeLabelPlural
            };
            if (this.collection || this.collectionLoading) {
                jsonData.visible = true;
                if (this.selectedModel) {  
                    if (this.selectedModel.get("oid")) {
                        jsonData.label = this.selectedModel.get("name");
                    }
                }
            } else {
                jsonData.visible = false;
            }

            this.$el.html(template(jsonData));

            return this;
        }

    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.MetricCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_columns_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.ColumnsManagementWidget.extend({
        type : "Metric",
        typeLabelPlural : "Metrics"
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.MetricCollectionWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_columns_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseCollectionManagementWidget.extend({
        configParentId : "domain",
        
        loadCollection : function(parentId) {
            var me = this;
            return squid_api.getCustomer().then(function(customer) {
                return customer.get("projects").load(me.config.get("project")).then(function(project) {
                    return project.get("domains").load(parentId).then(function(domain) {
                        // listen to parent in case "dynamic" changes
                        me.listenTo(domain, "change:dynamic", me.render);
                        return domain.get("metrics").load();
                    });
                });
            });
        }
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.MetricSelectorView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_metric_selector_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.MetricCollectionWidget.extend({
        template : null,
        metricIdList : null,
        metricIndex: null,

        init: function(options) {

            // setup options
            if (options) {
                if (options.template) {
                    this.template = options.template;
                } else {
                    this.template = template;
                }
                if (options.metricIdList) {
                    this.metricIdList = options.metricIdList;
                }
                if (options.metricIndex !== null) {
                    this.metricIndex = options.metricIndex;
                }
            }

            // setup the models
            if (!this.config) {
                this.config = squid_api.model.config;
            }

            // initialize dimension collection for management view
            this.metricCollection = new squid_api.view.MetricCollectionManagementWidget();

            this.listenTo(this.config,"change:chosenMetrics", this.render);

            // listen for global status change
            this.listenTo(squid_api.model.status,"change:status", this.handleStatus);

        },

        handleStatus: function() {
            var select = this.$el.find("select");
            var multiSelectDropdown = this.$el.find(".multiselect-container");
            if (select) {
                var isMultiple = true;
                if (this.metricIndex !== null) {
                    isMultiple = false;
                }
                var running = (squid_api.model.status.get("status") !== squid_api.model.status.STATUS_DONE);
                if (running) {
                    // computation is running : disable input
                    select.attr("disabled","disabled");
                    if (isMultiple) {
                        select.multiselect('disable');
                        multiSelectDropdown.append("<div class='dropdownDisabled'></div>");
                    }
                } else {
                    // computation is done : enable input
                    select.removeAttr("disabled");
                    if (isMultiple) {
                        select.multiselect('enable');
                        multiSelectDropdown.find(".dropdownDisabled").remove();
                    }
                }
            }
        },

        events: {
            "change": function() {
                var oid = this.$el.find("select option:selected");
                // Remove Button Title Tag
                this.$el.find("button").removeAttr('title');

                var chosenMetrics = this.config.get("chosenMetrics");
                var selectedMetrics = [];

                // build the selection array
                for (i = 0; i < oid.length; i++) {
                    var selectedOid = $(oid[i]).val();
                    selectedMetrics.push(selectedOid);
                }

                // check for additions
                chosenMetricsNew = _.intersection(_.union(chosenMetrics, selectedMetrics), selectedMetrics);

                // Update
                this.config.set({"chosenMetrics" : chosenMetricsNew});
            }
        },

        render: function() {
            if (this.collection) {
                var me = this, isMultiple = true;

                if (this.metricIndex !== null) {
                    isMultiple = false;
                }

                var jsonData = {"selAvailable" : true, "options" : [], "multiple" : isMultiple};

                // iterate through all domains metrics
                var metrics = this.collection;
                var domain = this.collection.parent;
                var noneSelected = true;
                for (var idx=0; idx<metrics.models.length; idx++) {
                    var metric = metrics.models[idx];

                    // check if selected
                    var selected = me.isChosen(metric);
                    if (selected === true) {
                        noneSelected = false;
                    }
                    
                    var option = {
                            "label" : metric.get("name"), 
                            "value" : metric.get("oid"), 
                            "selected" : selected
                    };
                    
                    // check dynamic rules
                    if ((domain.get("dynamic") === true) || (metric.get("dynamic") === false)) {
                        jsonData.options.push(option);
                    }
                }

                // Alphabetical Sorting
                jsonData.options = me.sortMetrics(jsonData.options);

                // check if empty
                if (jsonData.options.length === 0) {
                    jsonData.empty = true;
                }

                if ((!me.selector) || (jsonData.options.length === 0)) {
                    // fist render or no data to display
                    var html = me.template(jsonData);
                    me.$el.html(html);
                    me.$el.show();

                    // Initialize plugin
                    me.selector = me.$el.find("select");
                    if (isMultiple) {
                        me.selector.multiselect({
                            "buttonContainer": '<div class="squid-api-data-widgets-metric-selector-open" />',
                            "buttonText": function() {
                                return 'Metrics';
                            },
                            "onDropdownShown": function() {
                                me.showConfiguration();
                            }
                        });
                    }

                    // Remove Button Title Tag
                    me.$el.find("button").removeAttr('title');
                } else {
                    // update render
                    me.selector.multiselect("dataprovider", jsonData.options);
                    me.showConfiguration();
                }
            }
            return this;
        },

        showConfiguration: function() {
            var me = this;
            squid_api.getSelectedProject().done( function(project) {
                if (project.get("_role") === "WRITE" || project.get("_role") === "OWNER") {

                    // place dimension collection in modal view
                    var dimensionModal = new squid_api.view.ModalView({
                        view : me.metricCollection
                    });

                    me.$el.find("li").first().before("<li class='configure'> configure</option>");
                    me.$el.find("li").first().on("click", function() {
                        // trigger dimension management view
                        dimensionModal.render();
                    });
                }
            });
        },

        sortMetrics: function(metrics) {
            return metrics.sort(function(a, b) {
                var labelA=a.label.toLowerCase(), labelB=b.label.toLowerCase();
                if (labelA < labelB) {
                    return -1;
                }
                if (labelA > labelB) {
                    return 1;
                }
                return 0; // no sorting
            });
        },

        isChosen : function(item) {
            var selected = false;
            var metrics = this.config.get("chosenMetrics");

            if (metrics) {
                for (var j=0; j<metrics.length; j++) {
                    if (item.get("oid") === metrics[j]) {
                        selected = true;
                    }
                }
            }
            return selected;
        }

    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.ModalView = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        internalView : null,
        template : null,
        views : [],
        el : "body",

        initialize: function(options) {
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = squid_api.template.squid_api_modal_view;
            }
            if (options.view) {
                this.view = options.view;
            }
            // output base html
            this.renderBase();
        },

        close: function() {
            this.$el.modal("toggle");
        },

        renderBase: function() {
            var viewData = {
                modalCount : $(".squid-api-modal-view").length
            };
            var html = this.template(viewData);
            // print template
            this.$el.append(html);
            // set el
            this.setElement(this.$el.find(".squid-api-modal-view-" + viewData.modalCount));
        },

        render: function() {
            var me = this;

            // insert template
            if (! this.viewInserted) {
                this.$el.find(".modal-content").html(this.view.el);
                this.viewInserted = true;
            }

            this.$el.modal();
            me.view.render();

            return this;
        }
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.ProjectCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_project_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseCollectionManagementWidget.extend({

        typeLabelPlural : "Projects",
        type : "project",
        modelView : null,
        template: template,
        configSelectedId : "project",
        configParentId : "customer",

        init : function() {
            var me = this;
            this.modelView = squid_api.view.ProjectModelManagementWidget;
            me.render();
        },
        
        loadCollection : function() {
            return squid_api.getCustomer().then(function(customer) {
                return customer.get("projects").load();
            });
        },

    });

    return View;
}));


(function (root, factory) {
    root.squid_api.view.ProjectModelManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseModelManagementWidget.extend({
        formEvents: function() {
            var me = this;
            this.formContent.on('dbUrl:change', function(form) {
                me.resetSchemas(form);
            });
            this.formContent.on('dbPassword:change', function(form) {
                me.resetSchemas(form);
            });
            this.formContent.on('dbUser:change', function(form) {
                me.resetSchemas(form);
            });
        },

        resetSchemas: function(form) {
            form.$el.find(".squid-api-check-db-connection button").removeClass("btn-danger");
            form.$el.find(".squid-api-check-db-connection button").removeClass("btn-success");
            form.$el.find('.dbSchemas').hide();
            form.$el.find(".squid-api-check-db-connection button").removeClass("btn-warning");
        },

        customDataManipulation: function(data) {
            if (data.dbCheckConnection) {
                delete data.dbCheckConnection;
            }
            return data;
        }
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.ProjectSelectorButton = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_button_view);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.ProjectCollectionManagementWidget.extend({
        
        render: function() {
            var label = this.typeLabelPlural;
            var jsonData = {
                label : label,
                visible : true,
                collectionLoaded : !this.collectionLoading,
                collection : this.collection,
                typeLabelPlural : this.typeLabelPlural
            };
            if (this.collection) {
                if (this.selectedModel) {
                    if (this.selectedModel.get("oid")) {
                        jsonData.label = this.selectedModel.get("name");
                    }
                }
            }

            this.$el.html(template(jsonData));

            return this;
        }

    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.RelationCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_relation_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseCollectionManagementWidget.extend({
        type : "Relation",
        typeLabelPlural : "Relations",
        modelView : null,
        template: template,
        configParentId : "domain",

        additionalEvents: {
            "click .cancel": function() {
                // reset parent view if cancel button clicked
                if (this.cancelCallback) {
                    this.cancelCallback.call();
                }
            }
        },

        viewData: function() {
            var filteredModels = [];
            for (i=0; i<this.collection.size(); i++) {
                if (this.collection.at(i).get("leftId") && this.collection.at(i).get("rightId")) {
                    if (this.collection.at(i).get("leftId").domainId == this.modelValue || this.collection.at(i).get("rightId").domainId == this.modelValue) {
                        filteredModels.push(this.collection.at(i));
                    }
                }
            }
            var models = [];
            for (ix=0; ix<filteredModels.length; ix++) {
                var obj = {};
                obj.oid = filteredModels[ix].get("oid");
                obj.leftName = filteredModels[ix].get("leftName");
                obj.rightName = filteredModels[ix].get("rightName");
                obj.roles = this.getModelRoles(filteredModels[ix]);

                // set cardinality booleans for handlebar display
                var leftCardinality = filteredModels[ix].get("leftCardinality");
                var rightCardinality = filteredModels[ix].get("rightCardinality");
                if (leftCardinality == "MANY") {
                    obj.leftMany = true;
                } else if (leftCardinality == "ZERO_OR_ONE") {
                    obj.leftZeroOrOne = true;
                } else if (leftCardinality == "ONE") {
                    obj.leftOne = true;
                }
                if (rightCardinality == "MANY") {
                    obj.rightMany = true;
                } else if (rightCardinality == "ZERO_OR_ONE") {
                    obj.rightZeroOrOne = true;
                } else if (rightCardinality == "ONE") {
                    obj.rightOne = true;
                }
                models.push(obj);
            }

            return models;
        },

        // override initialize size we're not listening to the config
        initialize : function(options) {
            this.config = squid_api.model.config;
            this.status = squid_api.model.status;
            this.modelView = squid_api.view.RelationModelManagementWidget;
            this.modelValue = options.modelValue;
            var me = this;
            
            if (options) {
                if (options.type) {
                    this.type = options.type;
                }
                if (options.comparator) {
                    this.comparator = options.comparator;
                } else {
                    // default is : sort by alpha name and dynamic last
                    this.comparator =  function(a, b) {
                        var r = me.dynamicComparator(a,b);
                        if (r === 0) {
                            r = me.alphaNameComparator(a,b);
                        }
                        return r;
                    };
                }
                if (options.cancelCallback) {
                    this.cancelCallback = options.cancelCallback;
                }
                if (options.onSelect) {
                    this.onSelect = options.onSelect;
                }
            }
            
            // init the relations collection
            me.loadCollection(this.modelValue).done(function(collection) {
                me.collection = collection;
                me.render();
            }).fail(function() {
                me.render();
            });
            
        },
        
        loadCollection : function(parentId) {
            var me = this;
            // load the project's relations
            return squid_api.getCustomer().then(function(customer) {
                return customer.get("projects").load(me.config.get("project")).then(function(project) {
                    return project.get(me.typeLabelPlural.toLowerCase()).load();
                });
            });
        },
        
        render: function() {
            // store models
            if (this.collection) {
                var jsonData = {
                    models : this.viewData(),
                    createRole : this.getCreateRole(),
                    roles : null,
                    typeLabelPlural : this.typeLabelPlural,
                    type : this.type,
                    modalHtml : true
                };

                // print template
                var html = this.template(jsonData);
                this.$el.html(html);
            }
        }
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.RelationModelManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_base_model_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.BaseModelManagementWidget.extend({

        model : null,
        collectionPluralLabel : null,

        dataManipulation: function(data) {
            for (var x in data) {
                if (typeof(data[x]) == "object") {
                    for (var y in data[x]) {
                        if (data[x][y] !== null) {
                            if (data[x][y].length === 0) {
                                data[x][y] = null;
                            }
                        }
                    }
                } else if (data[x].length === 0) {
                    data[x] = null;
                }
            }
            return data;
        },

        customDataManipulation: function(data) {
            return data;
        },

        events: {
            "click .btn-cancel": function() {
                // reset parent view if cancel button clicked
                if (this.cancelCallback) {
                    this.cancelCallback.call();
                }
            },
            "click .btn-save-form" : function() {
                var me = this;
                var error = this.formContent.validate();
                if (! error) {
                    // global data manipulation
                    var data = this.dataManipulation(this.formContent.getValue());

                    // for any custom model manipulation before save
                    data = this.customDataManipulation(data);

                    // save model
                    this.model.save(data, {
                        wait: true,
                        success: function(model) {
                            // status update
                            if (me.cancelCallback) {
                                me.cancelCallback.call();
                            }
                            // call once saved
                            if (me.onSave) {
                                me.onSave(model);
                            }
                            me.status.set("message", "Sucessfully saved");
                        },
                        error: function(xhr) {
                            me.status.set("error", xhr);
                        }
            });

                }
            }
        },

        onSave: function(model) {
            // to be overridden from other model management widgets
            console.log("once saved");
        },

        formEvents: function() {
            this.formContent.on('leftId:change', function(form) {
                var rightText = form.$el.find(".leftId").find("select option:selected").text();
                form.$el.find(".leftName input").val(rightText);
            });
            this.formContent.on('rightId:change', function(form) {
                var rightText = form.$el.find(".rightId").find("select option:selected").text();
                form.$el.find(".rightName input").val(rightText);
            });
        },
        
        setSchema: function() {
            var dfd = $.Deferred();
            var schema = this.model.schema;
            var me = this;
            var project = this.model.get("id").projectId;
            squid_api.getCustomer().then(function(customer) {
                customer.get("projects").load(project).then(function(project) {
                    project.get("domains").load().then(function(domains) {
                        var arr = [];
                        for (i=0; i<domains.size(); i++) {
                            obj = {};
                            obj.val = domains.at(i).get("oid");
                            obj.label = domains.at(i).get("name");
                            arr.push(obj);
                        }
                        schema.leftId.subSchema.domainId.options = arr;
                        schema.rightId.subSchema.domainId.options = arr;
                        dfd.resolve(schema);
                    });
                });
            });
            return dfd;
        }

    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.ShortcutsAdminView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_shortcuts_admin_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        onSave : null,

        initialize: function(options) {

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }

            if (options.onSave) {
                this.onSave = options.onSave;
            }

            this.render();
        },

        events: {
            'click #saveBtn'  : 'saveShortcut',
        },

        render: function() {
            var me = this;
            this.$el.html(this.template());
        },

        saveShortcut : function(event) {
            event.preventDefault();
            var me = this;
            var shortcutId = this.$el.find("#shortcutId").val();
            if (shortcutId === "") {
                shortcutId =  null;
            }
            var shortcutName = this.$el.find("#shortcutName").val();
            var currentStateId = squid_api.model.state.get("oid");
            // TODO handle the case when state ins't existing yet
            if (currentStateId) {
                var shortcutModel = new squid_api.model.ShortcutModel();
                var data = {
                    "id" : {
                        "customerId" : this.customerId,
                        "shortcutId" : shortcutId
                    },
                    "name" : shortcutName,
                    "stateId" : currentStateId
                };
                shortcutModel.save(data, {
                    success : function(model, response, options) {
                        squid_api.model.status.set("message", "Shortcut successfully saved with Id : "+model.get("oid"));
                        if (me.onSave) {
                            me.onSave.call();
                        }
                    },
                    error : function(model, response, options) {
                        squid_api.model.status.set('error', 'Shortcut save failed');
                    }
                });
            }
        }
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.UsersAdminView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_users_admin_widget);

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
                this.template = template;
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
            'blur .edit' : 'updateValue',
            'keypress .edit' : 'updateValue',
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
                    wait: true,
                    success: function(model, response){
                        var message = 'You have successfully saved user with login: ' + data.login;
                        if (sendEmail) {
                            var linkUrl = encodeURIComponent(squid_api.apiURL.substring(0, squid_api.apiURL.indexOf('/v'), 1) + "/admin/console/index.html?access_token={access_token}#!user");
                            var sendMailUrl = squid_api.apiURL + '/set-user-pwd?' + 'clientId=' + squid_api.clientId + '&email=' + data.email + '&customerId=' + squid_api.customerId + '&link_url=' + linkUrl;

                            $.get(sendMailUrl).done(function() {
                                message = message + ' and a confirmation email has been sent to:' + data.email;
                                me.status.set('message', message);
                            }).fail(function() {
                                message = message + ' but confirmation email was not sent';
                                me.status.set('message', message);
                            });
                        } else {
                            me.status.set('message', message);
                        }
                    },
                    error: function(model) {
                        me.status.set('message', model.responseJSON.error);
                    }
                });
            }
        },

        groupMouseOver: function(item) {
            $(item.currentTarget).append("<span class='badge'>x</span>");
        },

        groupMouseOut: function(item) {
            $(this.widgetContainer + ' .badge').remove();
        },

        deleteGroup: function(item) {
            var me = this;

            var itemData = $(item.currentTarget).parents('td');

            // Obtain current groupId
            var groupItems = $(item.currentTarget).parent("div").siblings('div');

            // Get the ID to find model in collection
            var modelId = $(item.currentTarget).parents('tr').attr('data-id');

            if (confirm('Are you sure you want to remove this group?')) {

                var groups = [];
                for (i=0; i<groupItems.length; i++) {
                    groups.push($(groupItems[i]).attr('attr-value'));
                }

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

            // Get the ID to find model in collection
            var modelId = $(item.currentTarget).parents('tr').attr('data-id');

            if (confirm('Are you sure you want to remove this user?')) {
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
            this.$el.empty();
            this.stopListening();
            return this;
        },

        modifyUserValue: function(item) {
            // Show text inputs
            $(".editing").removeClass("editing");
            var currentTarget = $(item.currentTarget);

            currentTarget.addClass("editing");

            // Focus on input fields
            currentTarget.find("input").focus();

            // If Select Box
            if (currentTarget.find('select').length > 0 && currentTarget.find('select option').length < 1) {
                var groups = this.groups.toJSON();

                // Remove existing select options
                currentTarget.find("select options").remove();

                // Make sure select box is empty
                currentTarget.find("select").empty();
                // Append groups to dropdown
                for (var key in groups) {
                    if (groups[key].id) {
                        currentTarget.find("select").append("<option value='" + groups[key].id.userGroupId + "'>" + groups[key].name + "</option>");
                    }
                }
            }
        },

        updateValue: function(item) {
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
                var trimmedValue = false;
                if (value !== "null") {
                    trimmedValue = value.trim();
                }

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
        },

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
                                if (g[i] === "superuser") {
                                    data += "<div class='red " + canEdit + "' attr-id='groupId' class='red' attr-value='" + g[i] + "'></div>";
                                } else {
                                    var pattern = /admin/;
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
                "lengthChange": false,
                "paging": false
            });
        },

        assignGroupNames: function() {
            /*
                Retrieve groupId / attribute values and match with api group data
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
