this["squid_api"] = this["squid_api"] || {};
this["squid_api"]["template"] = this["squid_api"]["template"] || {};

this["squid_api"]["template"]["squid_api_collection_management_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += " data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"";
  if (helper = helpers.collectionNotAvailableReason) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.collectionNotAvailableReason); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return " disabled=\"true\" ";
  }

function program5(depth0,data) {
  
  
  return "\n            <div class=\"create\"></div>\n        ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selAvailable), {hash:{},inverse:self.program(23, program23, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n        ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <table style=\"width:100%\">\n                    <tbody ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.valueSelected), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.options), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </tbody>\n                </table>\n            ";
  return buffer;
  }
function program9(depth0,data) {
  
  
  return " ";
  }

function program11(depth0,data) {
  
  
  return " class=\"no-values\" ";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                            <tr ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "data-attr=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.program(21, program21, data),fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </tr>\n                        ";
  return buffer;
  }
function program14(depth0,data) {
  
  
  return " class=\"selected\" ";
  }

function program16(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                                    <td class=\"select selected\">\n                                        ";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n                                    </td>\n                                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.edit), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['delete']), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                ";
  return buffer;
  }
function program17(depth0,data) {
  
  
  return "\n                                        <td class=\"edit\"><i class=\"fa fa-pencil-square-o\"></i></td>\n                                    ";
  }

function program19(depth0,data) {
  
  
  return "\n                                        <td class=\"delete\"><i class=\"fa fa-trash-o\"></i></td>\n                                    ";
  }

function program21(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                                    <td class=\"select\" colspan=\"3\">";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                                ";
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <div class=\"no-data\">No ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'s Available</div>\n            ";
  return buffer;
  }

function program25(depth0,data) {
  
  
  return "\n            <div class=\"parent-missing\">\n\n            </div>\n        ";
  }

  buffer += "<div class=\"squid-api-model-widget squid-api-model-widget-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.collectionAvailable), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n    <button class=\"form-control selected-model squid-api-action\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.collectionAvailable), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        Select ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n    </button>\n    <div id=\"squid-api-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-model-widget-popup-container\">\n    <div class=\"squid-api-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-model-widget-popup squid-api-model-widget-popup\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.create), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.collectionAvailable), {hash:{},inverse:self.program(25, program25, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_columns_management_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            <option ";
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
    + "</option>\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " class=\"child\" ";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            <option value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.parentId), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " selected=\"selected\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</option>\n        ";
  return buffer;
  }

  buffer += "<div class=\"squid-api-admin-widget-columns-management\">\n    <select multiple=\"multiple\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.nonDynamic), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.dynamic), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </select>\n    <div class=\"management\">\n        <button type=\"button\" class=\"btn btn-default add\">\n            Create\n		</button>\n        <button type=\"button\" class=\"btn btn-default edit\" disabled=\"true\">\n            Edit\n		</button>\n        <button type=\"button\" class=\"btn btn-default delete\" disabled=\"true\">\n            Delete\n		</button>\n    </div>\n</div>\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_domain_collection_management_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += " data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"";
  if (helper = helpers.collectionNotAvailableReason) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.collectionNotAvailableReason); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return " disabled=\"true\" ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            ";
  if (helper = helpers.renderEl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.renderEl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            Select ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n        ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selAvailable), {hash:{},inverse:self.program(25, program25, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n        ";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <table style=\"width:100%\">\n                    <tbody ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.valueSelected), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.options), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </tbody>\n                </table>\n            ";
  return buffer;
  }
function program11(depth0,data) {
  
  
  return " ";
  }

function program13(depth0,data) {
  
  
  return " class=\"no-values\" ";
  }

function program15(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                            <tr ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "data-attr=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.program(23, program23, data),fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </tr>\n                        ";
  return buffer;
  }
function program16(depth0,data) {
  
  
  return " class=\"selected\" ";
  }

function program18(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                                    <td class=\"select selected\">";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.edit), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['delete']), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                ";
  return buffer;
  }
function program19(depth0,data) {
  
  
  return "\n                                        <td class=\"edit\"><i class=\"fa fa-pencil-square-o\"></i></td>\n                                        <td class=\"relation\"><i class=\"fa fa-arrows-h\"></i></td>\n                                        <td class=\"dimension\"><i class=\"fa fa-sort-alpha-asc\"></i></td>\n                                        <td class=\"metric\"><i class=\"fa fa-sort-numeric-asc\"></i></td>\n                                    ";
  }

function program21(depth0,data) {
  
  
  return "\n                                        <td class=\"delete\"><i class=\"fa fa-trash-o\"></i></td>\n                                    ";
  }

function program23(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                                    <td class=\"select\" colspan=\"3\">";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                                ";
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <div class=\"no-data\">No ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'s Available</div>\n            ";
  return buffer;
  }

function program27(depth0,data) {
  
  
  return "\n            <div class=\"parent-missing\">\n\n            </div>\n        ";
  }

  buffer += "<div class=\"squid-api-model-widget squid-api-model-widget-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.collectionAvailable), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n    <button class=\"form-control selected-model squid-api-action\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.collectionAvailable), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.renderEl), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </button>\n    <div id=\"squid-api-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-model-widget-popup-container\">\n    <div class=\"squid-api-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-model-widget-popup squid-api-model-widget-popup\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.collectionAvailable), {hash:{},inverse:self.program(27, program27, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_model_management_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<button type=\"button\"  class=\"btn btn-default\">\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.buttonLabel), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</button>\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n				";
  if (helper = helpers.buttonLabel) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.buttonLabel); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\n				<i class=\"fa fa-plus\"></i>\n			";
  }

  buffer += "<div class=\"";
  if (helper = helpers.view) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.view); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.accessible), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_project_collection_management_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += " data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"";
  if (helper = helpers.collectionNotAvailableReason) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.collectionNotAvailableReason); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return " disabled=\"true\" ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            ";
  if (helper = helpers.renderEl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.renderEl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            Select ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n        ";
  return buffer;
  }

function program9(depth0,data) {
  
  
  return "\n            <div class=\"create\"></div>\n        ";
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selAvailable), {hash:{},inverse:self.program(27, program27, data),fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n        ";
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <table style=\"width:100%\">\n                    <tbody ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.valueSelected), {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.options), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </tbody>\n                </table>\n            ";
  return buffer;
  }
function program13(depth0,data) {
  
  
  return " ";
  }

function program15(depth0,data) {
  
  
  return " class=\"no-values\" ";
  }

function program17(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                            <tr ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "data-attr=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.program(25, program25, data),fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </tr>\n                        ";
  return buffer;
  }
function program18(depth0,data) {
  
  
  return " class=\"selected\" ";
  }

function program20(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                                    <td class=\"select selected\">";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.edit), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['delete']), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                ";
  return buffer;
  }
function program21(depth0,data) {
  
  
  return "\n                                        <td class=\"edit\"><i class=\"fa fa-pencil-square-o\"></i></td>\n                                        <td class=\"refreshdb\"><i class=\"fa fa-refresh\"></i></td>\n                                    ";
  }

function program23(depth0,data) {
  
  
  return "\n                                        <td class=\"delete\"><i class=\"fa fa-trash-o\"></i></td>\n                                    ";
  }

function program25(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                                    <td class=\"select\" colspan=\"3\">";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n                                ";
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <div class=\"no-data\">No ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'s Available</div>\n            ";
  return buffer;
  }

function program29(depth0,data) {
  
  
  return "\n            <div class=\"parent-missing\">\n\n            </div>\n        ";
  }

  buffer += "<div class=\"squid-api-model-widget squid-api-model-widget-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.collectionAvailable), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n    <button class=\"form-control selected-model squid-api-action\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.collectionAvailable), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.renderEl), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </button>\n    <div id=\"squid-api-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-model-widget-popup-container\">\n    <div class=\"squid-api-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-model-widget-popup squid-api-model-widget-popup\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.create), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.collectionAvailable), {hash:{},inverse:self.program(29, program29, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  });

this["squid_api"]["template"]["squid_api_relation_management_widget"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<table style=\"width:100%\">\n					";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.models), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</table>\n				";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n						<tr data-value=";
  if (helper = helpers.oid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.oid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ">\n							<td class=\"domain\">";
  if (helper = helpers.leftName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.leftName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n							<td class=\"leftIcon\">\n							";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.leftMany), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n							</td>\n							<td>\n							";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rightMany), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n							</td>\n							<td class=\"domain\">";
  if (helper = helpers.rightName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rightName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n							<td class=\"edit\"><i class=\"fa fa-pencil-square-o\"></i></td>\n							<td class=\"delete\"><i class=\"fa fa-trash-o\"></i></td>\n						</tr>\n					";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "\n									<svg width=\"110\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\">\n  										<ellipse stroke=\"#666\" ry=\"0.15625\" rx=\"42.53032\" id=\"svg_8\" cy=\"10.62595\" cx=\"65.93316\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n  										<ellipse stroke=\"#666\" transform=\"rotate(23.859294891357422 14.261151313781737,6.493025302886963) \" ry=\"0.15625\" rx=\"9.98315\" id=\"svg_10\" cy=\"6.49303\" cx=\"14.26115\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n  										<ellipse stroke=\"#666\" transform=\"rotate(0.7375706434249878 14.573644638061372,10.555437088012791) \" ry=\"0.15625\" rx=\"9.98315\" id=\"svg_11\" cy=\"10.55544\" cx=\"14.57365\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n  										<ellipse stroke=\"#666\" transform=\"rotate(-20.462926864624023 14.4486494064331,14.430353164672844) \" ry=\"0.15625\" rx=\"9.98315\" id=\"svg_13\" cy=\"14.43035\" cx=\"14.44865\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n									</svg>\n								";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n								";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.leftZeroOrOne), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n							";
  return buffer;
  }
function program6(depth0,data) {
  
  
  return "\n								<svg width=\"110\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\">\n										<ellipse fill=\"none\" stroke-width=\"1.5\" stroke-opacity=\"null\" fill-opacity=\"null\" cx=\"51.62104\" cy=\"10.37595\" id=\"svg_8\" rx=\"46.84273\" ry=\"0.15625\" stroke=\"#666\"/>\n										<ellipse fill=\"none\" stroke-width=\"12\" stroke-opacity=\"null\" fill-opacity=\"null\" cx=\"22.24682\" cy=\"10.28729\" id=\"svg_15\" rx=\"1.71832\" ry=\"1.53145\" transform=\"rotate(-0.039470430463552475 22.246822357181806,10.287289619445572) \" stroke=\"#666\"/>\n										<ellipse fill=\"none\" stroke-width=\"1.5\" stroke-opacity=\"null\" fill-opacity=\"null\" cx=\"60.32387\" cy=\"54.48737\" id=\"svg_16\" rx=\"29.16739\" ry=\"0.15625\" transform=\"rotate(90.55730438232422 60.323867797851555,54.48736953735351) \" stroke=\"#666\"/>\n										<ellipse fill=\"none\" stroke-width=\"1.5\" stroke-opacity=\"null\" fill-opacity=\"null\" cx=\"10.70595\" cy=\"10.10935\" id=\"svg_17\" rx=\"6.82828\" ry=\"0.15625\" transform=\"rotate(89.25360107421875 10.705955505371094,10.109351158142088) \" stroke=\"#666\"/>\n								</svg>\n									";
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n									";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.leftOne), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n							 	";
  return buffer;
  }
function program9(depth0,data) {
  
  
  return "\n									<svg width=\"110\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\">\n										<ellipse stroke=\"#000\" ry=\"0.15625\" rx=\"46.84273\" id=\"svg_8\" cy=\"10.18846\" cx=\"55.99588\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n										<ellipse stroke=\"#000\" transform=\"rotate(90.55730438232422 60.323867797851555,54.48736953735351) \" ry=\"0.15625\" rx=\"29.16739\" id=\"svg_16\" cy=\"54.48737\" cx=\"60.32387\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n									</svg>\n									";
  }

function program11(depth0,data) {
  
  
  return "\n							<svg width=\"110.00000000000001\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\">\n								<ellipse fill=\"none\" stroke-width=\"1.5\" stroke-opacity=\"null\" fill-opacity=\"null\" cx=\"65.93316\" cy=\"10.62595\" id=\"svg_8\" rx=\"42.53032\" ry=\"0.15625\" stroke=\"#666\"/>\n								<ellipse fill=\"none\" stroke-width=\"1.5\" stroke-opacity=\"null\" fill-opacity=\"null\" cx=\"98.59446\" cy=\"6.49303\" id=\"svg_10\" rx=\"9.98315\" ry=\"0.15625\" transform=\"rotate(-20.98859405517578 98.59446716308595,6.493030071258536) \" stroke=\"#666\"/>\n								<ellipse fill=\"none\" stroke-width=\"1.5\" stroke-opacity=\"null\" fill-opacity=\"null\" cx=\"14.57365\" cy=\"10.55544\" id=\"svg_11\" rx=\"9.98315\" ry=\"0.15625\" transform=\"rotate(0.7375706434249878 14.573644638061372,10.555437088012791) \" stroke=\"#666\"/>\n								<ellipse fill=\"none\" stroke-width=\"1.5\" stroke-opacity=\"null\" fill-opacity=\"null\" cx=\"98.28197\" cy=\"14.76368\" id=\"svg_13\" rx=\"9.98315\" ry=\"0.15625\" transform=\"rotate(19.652103424072266 98.28196716308591,14.763684272766087) \" stroke=\"#666\"/>\n							</svg>\n								";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n								";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rightZeroOrOne), {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n							";
  return buffer;
  }
function program14(depth0,data) {
  
  
  return "\n									<svg width=\"110\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\">\n										<ellipse stroke=\"#666\" ry=\"0.15625\" rx=\"46.84273\" id=\"svg_8\" cy=\"10.37595\" cx=\"60.37079\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n										<ellipse stroke=\"#666\" transform=\"rotate(-0.039470430463552475 88.36991882324197,10.287286758425585) \" ry=\"1.53145\" rx=\"1.71832\" id=\"svg_15\" cy=\"10.28729\" cx=\"88.36992\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"12\" fill=\"none\"/>\n										<ellipse stroke=\"#666\" transform=\"rotate(90.55730438232422 60.323867797851555,54.48736953735351) \" ry=\"0.15625\" rx=\"29.16739\" id=\"svg_16\" cy=\"54.48737\" cx=\"60.32387\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n										<ellipse stroke=\"#666\" transform=\"rotate(89.25360107421875 100.32839202880858,10.109345436096195) \" ry=\"0.15625\" rx=\"6.82828\" id=\"svg_17\" cy=\"10.10935\" cx=\"100.32839\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"1.5\" fill=\"none\"/>\n									</svg>\n									";
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n									";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rightOne), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n							 	";
  return buffer;
  }

function program18(depth0,data) {
  
  
  return "\n				<div class=\"no-relations-available\">\n					no relations available\n				</div>\n			";
  }

  buffer += "<div id=\"squid-api-relations-widget-data-table\">\n	<div class=\"row\">\n		<div class=\"col-md-10\">\n		</div>\n		<div class=\"col-md-2\">\n			<button class=\"form-control add\">add</button>\n		</div>\n	</div>\n	<div class=\"row\">\n		<div class=\"col-md-12\">\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.models), {hash:{},inverse:self.program(18, program18, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n	</div>\n</div>\n";
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
    root.squid_api.view.CollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({
        template : null,
        collection : null,
        config : null,
        modalElementClassName : "squid-api-admin-widgets-modal-form",
        type : null,
        collectionAvailable : false,
        suggestionHandler : null,
        changeEventHandler : null,
        schemasCallback : null,
        beforeRenderHandler : null,

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
            if (options.suggestionHandler) {
                this.suggestionHandler = options.suggestionHandler;
            }
            if (options.schemasCallback) {
                this.schemasCallback = options.schemasCallback;
            }
            if (options.beforeRenderHandler) {
                this.beforeRenderHandler = options.beforeRenderHandler;
            }

            // set base then update
            this.collection = new squid_api.model.BaseCollection();
            this.updateCollection();

            this.collection.on("reset change remove sync", this.render, this);

            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.parent, "change:id", function() {
                me.collectionAvailable = true;
                me.collection.parentId = me.parent.get("id");
                me.collection.fetch();
            });

            this.listenTo(this.config, "change:" + this.model.definition.toLowerCase() , function(parent) {
                me.collectionAvailable = true;
                me.collection.parentId = {};
                me.collection.parentId = me.parent.get("id");
                me.collection.fetch();

                // set model
                var modelDef = squid_api.model.config.get(me.model.definition.toLowerCase());
                var modelItem = me.collection.get(modelDef);
                if (modelItem) {
                    me.model.set(modelItem.toJSON());
                }
            });
        },

        setModel : function(model) {
            this.model = model;
            this.listenTo(this.model, "change", this.render);
        },

        events: {
            "click button": function() {
                if (this.collectionModal) {
                    this.collectionModal.$el.find(".modal-body").html(this.html);
                    // redelegate events after updating template
                    this.collectionModal.delegateEvents();
                    this.collectionModal.open();
                } else {
                    this.collectionModal = new Backbone.BootstrapModal({
                        content: this.html,
                        title: this.type + "s"
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
                $(this.collectionModal.el).on('hidden.bs.modal', function () {
                    this.remove();
                });
            }
        },

        updateCollection: function() {
            var me = this;

            // match a base collection and overwrite base
            var collection = null;
            for (var collectionItem in squid_api.model) {
                var str = collectionItem;
                var res = str.match(this.type + "Collection");
                if (res) {
                    this.collection = new squid_api.model[res]();
                }
            }
        },

        actionEvents: function(roles) {
            var me = this;

            // select
            $(".squid-api-" + this.type + "-model-widget-popup .select").on("click", function() {
                var value = $(this).parent('tr').attr('data-attr');

                if (me.changeEventHandler) {
                    $(".squid-api-" + this.type + "-model-widget-popup").dialog("close");
                    me.changeEventHandler.call(this, value);
                } else {
                    console.log('no change handler defined');
                }

                // set the selected model
                var models = me.collection.models;
                var model;
                for (i=0; i<models.length; i++) {
                    if (models[i].get("oid") == value) {
                        model = models[i];
                        break;
                    }
                }
                me.model.set(model);
            });

            if (roles.create) {
                 // create base model for create
                var baseModel = new squid_api.model[ this.type + "Model"]();

                // create
                new squid_api.view.ModelManagementView({
                    el : $(".squid-api-" + this.type + "-model-widget-popup .create"),
                    model : baseModel,
                    parent : me.parent,
                    suggestionHandler : me.suggestionHandler,
                    schemasCallback : me.schemasCallback,
                    beforeRenderHandler : me.beforeRenderHandler,
                    successHandler : function() {
                        if (me.changeEventHandler) {
                            me.changeEventHandler.call(this);
                        }
                        var message = me.type + " with name " + this.get("name") + " has been successfully created";
                        squid_api.model.status.set({'message' : message});
                    }
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
                    suggestionHandler : me.suggestionHandler,
                    schemasCallback : me.schemasCallback,
                    beforeRenderHandler : me.beforeRenderHandler,
                    buttonLabel : "edit",
                    successHandler : function() {
                        var message = me.type + " with name " + this.get("name") + " has been successfully modified";
                        squid_api.model.config.trigger("change:project", squid_api.model.config);
                        squid_api.model.status.set({'message' : message});
                    }
                });
            });

            // delete
            $(".squid-api-" + this.type + "-model-widget-popup .delete").on("click", function() {
                var id = this.parentElement.dataset.attr;
                var model = me.collection.get(id);

                if (confirm("are you sure you want to delete the " + model.definition.toLowerCase() + " " + model.get("name") + "?")) {
                    if (true) {
                        model.destroy({
                            success:function(collection) {
                                var message = me.type + " with name " + collection.get("name") + " has been successfully deleted";
                                squid_api.model.status.set({'message' : message});
                            }
                        });
                    }
                }
            });
        },

        userRoles: function() {
            // roles
            var roles = {"create" : false, "edit" : false, "delete" : false};

            var modelRole = this.model.get("_role");
            var parentRole = this.parent.get("_role");

            // write role
            if (modelRole == "WRITE" || modelRole == "OWNER" || parentRole == "OWNER" || parentRole == "WRITE") {
                roles.create = true;
                roles.edit = true;
                roles.delete = true;
            }

            return roles;
        },

        render: function() {
            var me = this;

            this.roles = this.userRoles();
            var collectionNotAvailableReason = "please select a " + this.parent.definition + " first ";

            var jsonData = {"selAvailable" : false, "type" : this.type, "options" : [], "valueSelected" : false, "create" : this.roles.create, "collectionAvailable" : this.collectionAvailable, "collectionNotAvailableReason" : collectionNotAvailableReason, "renderEl" : this.renderEl};
            var models = this.collection.models;

            // selected obj
            var sel = [];

            // populate view data
            for (i=0; i<models.length; i++) {
                jsonData.selAvailable = true;
                var selected = false;
                // obtain name from model
                var oid = models[i].get("oid");
                if (oid) {
                    if (this.config.get(this.type.toLowerCase()) === oid) {
                        jsonData.selectedName = models[i].get("name");
                        selected = true;
                    }
                }
                var option = {"label" : models[i].get("name"), "value" : oid, "selected" : selected, "edit" : this.roles.edit, "delete" : this.roles.delete};

                // support dynamic collections
                if (models[i].get("dynamic")) {
                    option.dynamic = true;
                    option.label = "~" + models[i].get("name");
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

            // sort data by dynamic attribute
            jsonData.options.sort(function(a, b) {
                return (a.dynamic === b.dynamic) ? 0 : a ? -1 : 1;
            });

            // place selected obj at start of array
            if (sel[0]) {
                jsonData.options.unshift(sel[0]);
            }

            if (this.collectionModal) {
                this.collectionModal.close();
            }

            // print template
            this.html = this.template(jsonData);
            this.$el.html(this.html);

            if (! this.collectionAvailable) {
                this.$el.find(".squid-api-model-widget-" + this.type).tooltip({
                    tooltipClass: "squid-api-admin-widgets-tooltip",
                    position: { my: "left top", at: "left bottom+2", of: me.$el.find(".squid-api-model-widget-" + me.type) },
                });
                this.$el.find(".selected-model").addClass("hide");
            }

            // set button value
            this.$el.find("button.selected-model").text(jsonData.selectedName);

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

    var View = Backbone.View.extend({

        successHandler: null,
        errorHandler: null,
        modalElementClassName : "squid-api-admin-widgets-modal-form",
        buttonLabel : null,
        autoOpen: null,
        parent: null,
        schemasCallback : null,
        beforeRenderHandler : null,
        modalTitle : null,
        collection : null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            if (options.successHandler) {
                this.successHandler = options.successHandler;
            }
            if (options.errorHandler) {
                this.errorHandler = options.errorHandler;
            }
            if (options.buttonLabel) {
                this.buttonLabel = options.buttonLabel;
            }
            if (options.autoOpen) {
                this.autoOpen = options.autoOpen;
            }
            if (options.parent) {
                this.parent = options.parent;
            }
            if (options.schemasCallback) {
                this.schemasCallback = options.schemasCallback;
            }
            if (options.beforeRenderHandler) {
                this.beforeRenderHandler = options.beforeRenderHandler;
            }
            if (options.modalTitle) {
                this.modalTitle = options.modalTitle;
            }
            if (options.createOnlyView) {
                this.createOnlyView = options.createOnlyView;
            }
            if (options.type) {
                this.type = options.type;
            }

            if (this.collection) {
                this.collection.on("change remove", function() {
                    squid_api.model.config.trigger("change:domain", squid_api.model.config);
                }, this);
            }
            if (this.parent) {
                this.listenTo(this.parent, "change:id", this.render);
            }
            if (this.autoOpen) {
                this.render();
            }
        },

        updateForm : function() {
            var jsonData = this.viewData();
        },

        sortData : function(data) {
            /*
                sort data into a hierarchy based on parentId
            */
            var updatedArray = [];
            for (var ix=0; ix<data.length; ix++)  {
                if (! data[ix].parentId) {
                    updatedArray.push(data[ix]);
                    for (ix1=0; ix1<data.length; ix1++) {
                        if (data[ix1].parentId == data[ix].id) {
                            updatedArray.push(data[ix1]);
                        }
                    }
                }
            }

            return updatedArray;
        },

        viewData: function() {
            var models = this.collection.models;
            var viewData = {"dynamic" : [], "nonDynamic" : []};
            for (i=0; i<models.length; i++) {
                var obj = {};
                obj.name = models[i].get("name");
                obj.id = models[i].get("oid");

                if (models[i].get("parentId")) {
                    obj.parentId = models[i].get("parentId")[this.model.definition.toLowerCase() + "Id"];
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

            return viewData;
        },

        columnSuggestionHandler: function() {
            var me = this;
            var relationEl = this.formContent.$el.find(".suggestion-box");

            var request = $.ajax({
                type: "GET",
                url: squid_api.apiURL + "/projects/" + squid_api.model.config.get("project") + "/domains/" + squid_api.model.config.get("domain") + "/" + me.model.definition.toLowerCase() + "s-suggestion",
                dataType: 'json',
                data: {
                    "expression" : relationEl.val(),
                    "offset" : relationEl.prop("selectionStart") + 1,
                    "access_token" : squid_api.model.login.get("accessToken")
                },
                success:function(response) {
                    // detemine if there is an error or not
                    if (response.validateMessage.length === 0) {
                        relationEl.removeClass("invalid-expression").addClass("valid-expression");
                    } else {
                        relationEl.removeClass("valid-expression").addClass("invalid-expression");
                    }

                    // append box if definitions exist
                    if (response.definitions && response.definitions.length > 0) {

                        var definitions = response.definitions;

                        // store offset
                        var offset = response.filterIndex;

                        // remove existing dialog's
                        $(".squid-api-pre-domain-suggestions").remove();
                        $(".squid-api-domain-suggestion-dialog").remove();

                        // append div
                        relationEl.after("<div class='squid-api-pre-domain-suggestions squid-api-dialog'><ul></ul></div>");
                        for (i=0; i<definitions.length; i++) {
                            relationEl.siblings(".squid-api-pre-domain-suggestions").find("ul").append("<li>" + definitions[i] + "</li>");
                        }

                        relationEl.siblings(".squid-api-pre-domain-suggestions").find("li").click(me, function(event) {
                            var item = $(event.target).html();
                            var str = relationEl.val().substring(0, offset) + item.substring(0);
                            relationEl.val(str);
                            me.suggestionHandler.call(me);
                        });

                        // show dialog
                        relationEl.siblings(".squid-api-pre-domain-suggestions").dialog({
                            open: function(e, ui) {
                                e.preventDefault();
                            },
                            dialogClass: "squid-api-domain-suggestion-dialog squid-api-dialog",
                            position: { my: "center top", at: "center bottom+4", of: relationEl },
                            closeText: "x"
                        });
                    } else {
                        // set message
                        squid_api.model.status.set("message", response.validateMessage);
                    }

                    // place the focus back onto the domain suggestionElement
                    relationEl.focus();
                },
                error: function(response) {
                    squid_api.model.status.set({'message' : response.responseJSON.error});
                }
            });
        },

        render : function() {
            var me = this;
            var collection = this.collection;

            this.columnsView = Backbone.View.extend({
                initialize: function() {
                    this.collection = collection;
                    this.collection.on("reset change remove sync", this.render, this);
                },
                activatePlugin: function() {
                    this.$el.find("select").bootstrapDualListbox({
                        moveOnSelect: false,
                        showFilterInputs: false,
                        filterTextClear : " ",
                        selectedListLabel: "Available",
                        nonSelectedListLabel: "Selected",
                        selectorMinimalHeight: 250
                    });
                },
                events: {
                    "click .add" : function() {
                        new squid_api.view.ModelManagementView({
                            model : new squid_api.model[me.model.definition + "Model"](),
                            collection : me.collection,
                            parent : me.parent,
                            autoOpen : true,
                            suggestionHandler : me.columnSuggestionHandler,
                            buttonLabel : "add",
                            successHandler : function() {
                                squid_api.model.status.set({'message' : me.model.definition +  " successfully created"});
                                me.collection.create(this);
                            }
                        });
                    },
                    "click .edit" : function(event) {
                        var id = $(event.target).attr("data-value");
                        var model = me.collection.get(id);
                        new squid_api.view.ModelManagementView({
                            model : model,
                            parent : me.parent,
                            collection : me.collection,
                            autoOpen : true,
                            suggestionHandler : me.columnSuggestionHandler,
                            buttonLabel : "add",
                            successHandler : function() {
                                squid_api.model.status.set({'message' : me.model.definition +  " successfully modified"});
                                me.collection.create(this);
                            }
                        });
                    },
                    "click .delete" : function(event) {
                        var id = $(event.target).attr("data-value");
                        var model = me.collection.get(id);
                        if (confirm("are you sure you want to delete the " + model.definition.toLowerCase() + " " + model.get("name") + "?")) {
                            if (true) {
                                model.destroy({
                                    success:function(collection) {
                                        var message = model.definition + " with name " + model.get("name") + " has been successfully deleted";
                                        squid_api.model.status.set({'message' : message});
                                    }
                                });
                            }
                        }
                    },
                    "change select" : function(event) {
                        var dynamic = [];
                        var nonDynamic = [];

                        // update edit element
                        var name = $(event.target).find("option:selected:last").html();
                        var value = $(event.target).find("option:selected:last").val();

                        // update edit / delete buttons
                        if (name !== undefined) {
                            this.$el.find(".edit").removeAttr("disabled");
                            this.$el.find(".edit").html("edit " + name);
                            this.$el.find(".edit").attr("data-value", value);

                            this.$el.find(".delete").removeAttr("disabled");
                            this.$el.find(".delete").html("delete " + name);
                            this.$el.find(".delete").attr("data-value", value);
                        }

                        // selected values in the second select box
                        var options1 = $(this.$el.find("select")[0]).find("option");
                        var options2 = $(this.$el.find("select")[1]).find("option");

                        // store visually updated attributes
                        for (i=0; i<options1.length; i++) {
                            nonDynamic.push(options1[i]);
                        }
                        for (i=0; i<options2.length; i++) {
                            dynamic.push(options2[i]);
                        }
                        // check nonDynamic Data
                        var model;
                        for (i=0; i<nonDynamic.length; i++) {
                            model = this.collection.get($(nonDynamic[i]).val());
                            console.log(model.get("name") + " = non Dynamic");
                            if (model.get("dynamic") === true) {
                                model.set("dynamic", false);
                                model.save();
                            }
                        }
                        // check dynamic Data
                        for (i=0; i<dynamic.length; i++) {
                            model = this.collection.get($(dynamic[i]).val());
                            console.log(model.get("name") + " = dynamic");
                            if (model.get("dynamic") === false) {
                                model.set("dynamic", true);
                                model.save();
                            }
                        }
                    }
                },
                render: function() {
                    this.$el.html(template(me.viewData()));
                    this.activatePlugin();
                    return this;
                }
            });

            // instantiate a new modal view, set the content & automatically open
            if (this.formModal) {
                this.formModal.open();
            } else {
                this.formModal = new Backbone.BootstrapModal({
                    content: new this.columnsView(),
                    cancelText: "close",
                    title: me.type
                });
                this.formModal.open();
            }

            // modal wrapper class
            $(this.formModal.el).addClass(this.modalElementClassName);

            // modal definition class
            $(this.formModal.el).find(".modal-dialog").addClass(me.model.definition + "-primary");

            // on cancel
            this.formModal.on('cancel', function() {
                $(".squid-api-dialog").remove();
            });

            /* bootstrap doesn't remove modal from dom when clicking outside of it.
               Check to make sure it has been removed whenever it isn't displayed.
            */
            $(this.formModal.el).on('hidden.bs.modal', function () {
                this.remove();
            });
        }
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.DomainCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_domain_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.CollectionManagementWidget.extend({

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
            if (options.suggestionHandler) {
                this.suggestionHandler = options.suggestionHandler;
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
            if (options.renderEl) {
                this.renderEl = options.renderEl;
            }

            // set base then update
            this.collection = new squid_api.model.BaseCollection();
            this.updateCollection();

            this.config.on("change", this.render, this);
            this.collection.on("reset change remove sync", this.render, this);

            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.parent, "change:id", function() {
                me.collectionAvailable = true;
                me.collection.parentId = me.parent.get("id");
                me.collection.fetch();
            });

            this.relations = new squid_api.model.RelationCollection();
            this.dimensions = new squid_api.model.DimensionCollection();
            this.metrics = new squid_api.model.MetricCollection();

            this.config.on("change:project", function() {
                // relations
                me.relations.collectionAvailable = true;
                me.relations.parentId = {};
                me.relations.parentId.projectId = this.get("project");
                me.relations.fetch();
            });

            this.config.on("change:domain", function() {
                // dimensions
                me.dimensions.collectionAvailable = true;
                me.dimensions.parentId = {};
                me.dimensions.parentId.projectId = this.get("project");
                me.dimensions.parentId.domainId = this.get("domain");
                me.dimensions.fetch();

                // metrics
                me.metrics.collectionAvailable = true;
                me.metrics.parentId = {};
                me.metrics.parentId.projectId = this.get("project");
                me.metrics.parentId.domainId = this.get("domain");
                me.metrics.fetch();
            });

            this.render();
        },

        actionEvents: function(roles) {
            var me = this;

            // select
            $(".squid-api-" + this.type + "-model-widget-popup .select").on("click", function() {
                var value = $(this).parent('tr').attr('data-attr');

                if (me.changeEventHandler) {
                    $(".squid-api-" + this.type + "-model-widget-popup").dialog("close");
                    me.changeEventHandler.call(this, value);
                } else {
                    console.log('no change handler defined');
                }

                // set the selected model
                var models = me.collection.models;
                var model;
                for (i=0; i<models.length; i++) {
                    if (models[i].get("oid") == value) {
                        model = models[i];
                        break;
                    }
                }
                me.model.set(model);
            });

             if (roles.create) {
                // create
                new squid_api.view.ModelManagementView({
                    el : $(".squid-api-" + this.type + "-model-widget-popup .create"),
                    model : new squid_api.model[ this.type + "Model"](),
                    parent : me.parent,
                    suggestionHandler : me.suggestionHandler,
                    schemasCallback : me.schemasCallback,
                    beforeRenderHandler : me.beforeRenderHandler,
                    buttonLabel : "Create Domain",
                    successHandler : function() {
                        me.collection.create(this);
                        var message = me.type + " with name " + this.get("name") + " has been successfully created";
                        squid_api.model.status.set({'message' : message});

                        if (me.changeEventHandler) {
                            me.changeEventHandler.call(this);
                        }
                    }
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
                    suggestionHandler : me.suggestionHandler,
                    schemasCallback : me.schemasCallback,
                    beforeRenderHandler : me.beforeRenderHandler,
                    buttonLabel : "edit",
                    successHandler : function() {
                        var message = me.type + " with name " + this.get("name") + " has been successfully modified";
                        squid_api.model.config.trigger("change:project", squid_api.model.config);
                        squid_api.model.status.set({'message' : message});
                    }
                });
            });

            // relations
            $(".squid-api-" + this.type + "-model-widget-popup .relation").on("click", function() {
                var relationSelect = new squid_api.view.RelationModelManagementView({
                    el : this.el,
                    buttonLabel : "<i class='fa fa-arrows-h'></i>",
                    type : "Relation",
                    modalTitle : "Relation for domain: " + this.domainName,
                    collection : me.relations,
                    model : new squid_api.model.RelationModel(),
                    parent : me.collection,
                    autoOpen : true,
                    successHandler : function() {
                        var message = me.type + " with name " + this.get("name") + " has been successfully modified";
                        squid_api.model.status.set({'message' : message});
                    }
                });
            });

            // dimension
            $(".squid-api-" + this.type + "-model-widget-popup .dimension").on("click", function() {
                var dimensionSelect = new squid_api.view.ColumnsManagementWidget({
                    el : this.el,
                    buttonLabel : "<i class='fa fa-arrows-h'></i>",
                    type : "Dimension",
                    collection : me.dimensions,
                    model : new squid_api.model.DimensionModel(),
                    parent : me.collection,
                    autoOpen : true,
                    successHandler : function() {
                        var message = me.type + " with name " + this.get("name") + " has been successfully modified";
                        squid_api.model.status.set({'message' : message});
                    }
                });
            });

            // metrics
            $(".squid-api-" + this.type + "-model-widget-popup .metric").on("click", function() {
                var metricSelect = new squid_api.view.ColumnsManagementWidget({
                    el : this.el,
                    buttonLabel : "<i class='fa fa-arrows-h'></i>",
                    type : "Metric",
                    collection : me.metrics,
                    model : new squid_api.model.MetricModel(),
                    parent : me.collection,
                    autoOpen : true,
                    successHandler : function() {
                        var message = me.type + " with name " + this.get("name") + " has been successfully modified";
                        squid_api.model.status.set({'message' : message});
                    }
                });
            });

            // delete
            $(".squid-api-" + this.type + "-model-widget-popup .delete").on("click", function() {
                var id = this.parentElement.dataset.attr;
                var model = me.collection.get(id);

                if (confirm("are you sure you want to delete the " + model.definition.toLowerCase() + " " + model.get("name") + "?")) {
                    if (true) {
                        model.destroy({
                            success:function(collection) {
                                var message = me.type + " with name " + collection.get("name") + " has been successfully deleted";
                                squid_api.model.status.set({'message' : message});
                            }
                        });
                    }
                }
            });
        }

    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.DomainManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        createOnlyView : null,
        config : null,
        domain : new squid_api.model.DomainModel(),
        project : new squid_api.model.ProjectModel(),

        initialize: function(options) {
            this.config = squid_api.model.config;
            if (options) {
                if (options.createOnlyView) {
                    this.createOnlyView = true;
                }
                if (options.options) {
                    this.config = options.config;
                }
            }
            this.listenTo(this.config, "change:domain", this.setDomain);
            this.listenTo(this.config, "change:project", this.setProject);
            this.render();
        },

        setProject : function() {
            var me = this;
            var projectId = this.config.get("project");
            this.project.set({"id" : {"projectId" : projectId}});
            this.project.fetch();
        },

        setDomain : function() {
            var me = this;
            var projectId = this.config.get("project");
            var domainId = this.config.get("domain");
            this.domain.set({"id" : {"projectId" : projectId, "domainId" : domainId}});
            this.domain.fetch();
        },

        render: function() {
            var viewOptions = {
                    "el" : this.$el,
                    type : "Domain",
                    "model" : this.domain,
                    "parent" : this.project,
                    suggestionHandler : this.domainSuggestionHandler
            };

            if (this.createOnlyView) {
                viewOptions.successHandler = function(value) {
                    var collection = new squid_api.model.DomainCollection();
                    collection.create(this);
                    var message = me.type + " with name " + this.get("name") + " has been successfully created";
                    squid_api.model.status.set({'message' : message});

                    if (! value) {
                        value = this.get("id").domainId;
                    }
                    squid_api.model.config.set({
                        "domain" : value,
                        "selection" : null,
                        "chosenDimensions" : null,
                        "selectedDimension" : null,
                        "chosenMetrics" : null,
                        "selectedMetric" : null
                    });
                };
                viewOptions.buttonLabel = "Create a new one";
                viewOptions.createOnlyView = this.createOnlyView;
                var modelView = new squid_api.view.ModelManagementView(viewOptions);
            } else {
                viewOptions.changeEventHandler = function(value){
                    if (! value) {
                        value = this.get("id").domainId;
                    }
                    squid_api.model.config.set({
                        "domain" : value,
                        "selection" : null,
                        "chosenDimensions" : null,
                        "selectedDimension" : null,
                        "chosenMetrics" : null,
                        "selectedMetric" : null
                    });
                };
                // DomainCollectionManagementWidget
                var collectionView = new squid_api.view.DomainCollectionManagementWidget(viewOptions);
            }

            return this;
        },
        domainSuggestionHandler: function() {
            var me = this;
            var domainEl = this.formContent.$el.find(".suggestion-box");
            var request = $.ajax({
                type: "GET",
                url: squid_api.apiURL + "/projects/" + me.model.get("id").projectId + "/domains-suggestion",
                dataType: 'json',
                data: {
                    "expression" : domainEl.val(),
                    "offset" : domainEl.prop("selectionStart") + 1,
                    "access_token" : squid_api.model.login.get("accessToken")
                },
                success:function(response) {
                    // detemine if there is an error or not
                    if (response.validateMessage.length === 0) {
                        domainEl.removeClass("invalid-expression").addClass("valid-expression");
                    } else {
                        domainEl.removeClass("valid-expression").addClass("invalid-expression");
                    }

                    // append box if definitions exist
                    if (response.definitions && response.definitions.length > 0) {

                        var definitions = response.definitions;

                        // store offset
                        var offset = response.filterIndex;

                        // remove existing dialog's
                        $(".squid-api-pre-domain-suggestions").remove();
                        $(".squid-api-domain-suggestion-dialog").remove();

                        // append div
                        domainEl.after("<div class='squid-api-pre-domain-suggestions squid-api-dialog'><ul></ul></div>");

                        for (i=0; i<definitions.length; i++) {
                            domainEl.siblings(".squid-api-pre-domain-suggestions").find("ul").append("<li>" + definitions[i] + "</li>");
                        }

                        domainEl.siblings(".squid-api-pre-domain-suggestions").find("li").click(me, function(event) {
                            var item = $(event.target).html();
                            var str = domainEl.val().substring(0, offset) + item.substring(0);
                            domainEl.val(str);
                            $(".squid-api-pre-domain-suggestions").dialog("close");
                            me.suggestionHandler.call(me);
                        });

                        // // show dialog
                        domainEl.siblings(".squid-api-pre-domain-suggestions").dialog({
                            open: function(e, ui) {
                                e.preventDefault();
                            },
                            dialogClass: "squid-api-domain-suggestion-dialog squid-api-dialog",
                            position: { my: "center top", at: "center bottom+4", of: domainEl },
                            closeText: "x"
                        });
                    } else {
                        // set message
                        squid_api.model.status.set("message", response.validateMessage);
                    }

                    // place the focus back onto the domain suggestionElement
                    domainEl.focus();
                },
                error: function(response) {
                    squid_api.model.status.set({'message' : response.responseJSON.error});
                }
            });
        },
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.ModelManagementView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_model_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        successHandler: null,
        errorHandler: null,
        modalElementClassName : "squid-api-admin-widgets-modal-form",
        buttonLabel : null,
        autoOpen: null,
        parent: null,
        suggestionHandler : null,
        schemasCallback : null,
        beforeRenderHandler : null,
        modalTitle : null,
        collection : null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            if (options.successHandler) {
                this.successHandler = options.successHandler;
            }
            if (options.errorHandler) {
                this.errorHandler = options.errorHandler;
            }
            if (options.buttonLabel) {
                this.buttonLabel = options.buttonLabel;
            }
            if (options.autoOpen) {
                this.autoOpen = options.autoOpen;
            }
            if (options.parent) {
                this.parent = options.parent;
            }
            if (options.suggestionHandler) {
                this.suggestionHandler = options.suggestionHandler;
            }
            if (options.schemasCallback) {
                this.schemasCallback = options.schemasCallback;
            }
            if (options.beforeRenderHandler) {
                this.beforeRenderHandler = options.beforeRenderHandler;
            }
            if (options.modalTitle) {
                this.modalTitle = options.modalTitle;
            }
            if (options.createOnlyView) {
                this.createOnlyView = options.createOnlyView;
            }
            if (options.collection) {
                this.collection = options.collection;
            }

            // Set Form Schema
            this.setSchema();

            if (this.model) {
                this.listenTo(this.model, 'change', this.setSchema);
            }
            if (this.parent) {
                this.listenTo(this.parent, "change:id", this.render);
            }

            if (this.autoOpen) {
                this.prepareForm();
            }
        },

        manipulateData : function(data) {
            var modelDefinitionId = this.model.definition.toLowerCase() + "Id";

            if (data.id) {
                if (data.id.projectId.length === 0) {
                    data.id.projectId = null;
                }
                if (squid_api.model.config.get("domain") && (this.model.definition == "Metric" || this.model.definition == "Dimension")) {
                    data.id.domainId = squid_api.model.config.get("domain");
                }
            }
            if (typeof data.id[modelDefinitionId] !== "undefined" && this.model.definition !== "Project") {
                if (data.id[modelDefinitionId].length === 0) {
                    data.id[modelDefinitionId] = null;
                }
            }

            // if the definition isn't project, add the projectId
            if (squid_api.model.project.get("id") && this.model.definition !== "Project") {
                var projectId = squid_api.model.project.get("id").projectId;
                data.id.projectId = projectId;

                if (data.parentId) {
                    if (data.parentId[this.model.definition.toLowerCase() + "Id"].length === 0) {
                        data.parentId = null;
                    } else {
                        data.parentId.domainId = squid_api.model.config.get("domain");
                        data.parentId.projectId = projectId;
                    }
                }
            }

            // password exception
            if (typeof data.dbPassword !== "undefined") {
                if (data.dbPassword.length === 0) {
                    data.dbPassword = null;
                }
            }

            // dimensions exception
            if (data.type) {
                if (data.type.length === 0) {
                    data.type = "INDEX";
                } else {
                    data.type = data.type[0];
                }
            }

            for (var x in data) {
                if (x !== "id" && typeof data[x]=="object" && data[x] !== null) {
                    if (data[x].projectId !== undefined) {
                        if (data[x].projectId.length === 0) {
                            data[x].projectId = squid_api.model.config.get("project");
                        }
                    } else {
                        if (data[x].domainid !== undefined) {
                            if (data[x].domainid.length === 0) {
                                data[x].domainid = squid_api.model.config.get("domain");
                            }
                        }
                    }
                }
            }

            return data;
        },

        setStatusMessage: function(message) {
            setTimeout(function() {
                squid_api.model.status.set({'message' : message});
            }, 1000);
        },

        saveForm : function(formContent) {
            var me = this;
            var invalidExpression = this.formContent.$el.find(".invalid-expression").length > 0;

            /*
                1. validate form (if errors, display them & keep modal open)
                2. save data
            */

            var validForm = this.formContent.validate();
            if (validForm) {
                me.formModal.preventClose();
            } else if (! invalidExpression) {
                // remove all dialog's
                $(".squid-api-dialog").remove();

                if (this.model.definition == "Project" && me.schema.dbSchemas.options.length === 0) {
                    me.formModal.preventClose();
                }

                var data = me.manipulateData(this.formContent.getValue());
                me.model.save(data, {
                    success: function (collection, response) {
                        // set project ID

                        me.formContent.setValue("id", {"projectId" : collection.get("id").projectId});

                        // project exception
                        if (me.model.definition == "Project") {
                            me.schema.id.type = "Hidden";
                            if (me.schemasCallback) {
                                me.schemasCallback.call(me);
                            }
                            if (me.successHandler) {
                                me.successHandler.call(collection);
                            }
                        } else {
                            if (me.successHandler) {
                                me.successHandler.call(collection);
                            }
                        }
                    },
                    error: function (collection, response) {
                        var msg = response.objectType + " error saving with name " + response.name;
                        me.setStatusMessage(msg);

                        if (me.errorHandler) {
                            me.errorHandler.call(collection);
                        }
                    }
                });
            } else {
                me.formModal.preventClose();
            }
        },
        resetStatusMessage : function() {
            this.setStatusMessage("");
        },
        renderForm : function() {
            // called when we want to set the model / schema & render the form via a modal
            var me = this;

            // set base schema & modal into form
            this.formContent = new Backbone.Form({
                schema: me.schema,
                model: me.model
            }).render();

            // render the form into a backbone view
            this.formView = Backbone.View.extend({
                model: me.model,
                parent: me.parent,
                // domain subject exception
                events: {
                    "keyup .suggestion-box" : function(e) {
                        me.suggestionHandler.call(me);
                    },
                    "click .suggestion-box" : function(e) {
                        me.suggestionHandler.call(me);
                    }
                },
                render: function() {
                    this.$el.html(me.formContent.el);
                    return this;
                }
            });

            // modal title
            var modalTitle;
            if (this.modalTitle) {

            } else {
                if (me.model.get("id")) {
                    modalTitle = "Editing " + me.model.definition;
                    if (me.model.get("name")) {
                        modalTitle = modalTitle + ": " + me.model.get("name");
                    }
                } else {
                    modalTitle = "Creating a new " + me.model.definition;
                }
            }

            // instantiate a new modal view, set the content & automatically open
            if (this.formModal) {
                this.formModal.open();
            } else {
                this.formModal = new Backbone.BootstrapModal({
                    content: new this.formView(),
                    title: modalTitle
                });
                this.formModal.open();
            }

            // modal wrapper class
            $(this.formModal.el).addClass(this.modalElementClassName);

            // modal definition class
            $(this.formModal.el).find(".modal-dialog").addClass(me.model.definition);

            // saveForm on 'ok' click
            this.formModal.on('ok', function() {
                me.saveForm();
            });

            // hide first div (id)
            $(this.formModal.el).find("fieldset").first().find("div").first().hide();

            // on cancel
            this.formModal.on('cancel', function() {
                $(".squid-api-dialog").remove();
                me.resetStatusMessage();
            });

            /* bootstrap doesn't remove modal from dom when clicking outside of it.
               Check to make sure it has been removed whenever it isn't displayed.
            */
            $(this.formModal.el).on('hidden.bs.modal', function () {
                this.remove();
            });
        },

        prepareForm: function() {
            // obtain schema values if project
            if (this.schemasCallback) {
                this.schemasCallback.call(this);
            }
            if (this.beforeRenderHandler) {
                this.beforeRenderHandler.call(this);
            }
            this.renderForm();
        },

        events: {
            "click button" : function() {
                // reset model defaults
                this.model.clear().set(this.model.defaults);
                this.prepareForm();
            }
        },

        getPropertyType: function(type) {
            switch(type) {
                case "string":
                    return "Text";
                case "int32":
                    return "Number";
                case "array":
                    return "Checkboxes";
                default:
                    return "Text";
            }
        },

        remove: function() {
            this.undelegateEvents();
            this.$el.empty();
            this.stopListening();
            return this;
        },

        setSchema: function(property) {
            var me = this;

            if (this.formContent) {
                this.formContent.model = me.model;
            }

            for (var x in me.model.schema) {
                if (me.model.definition == "Relation" && (x == "leftId") || x == "rightId") {
                    var domains = me.parent.models;
                    var domainArray = [];

                    for (i=0; i<domains.length; i++) {
                        domainObj = {};
                        domainObj.val = domains[i].get("oid");
                        domainObj.label = domains[i].get("name");
                        domainArray.push(domainObj);
                    }

                    me.model.schema[x].subSchema.domainId.options = domainArray;
                    me.model.schema[x].subSchema.domainId.options = domainArray;
                }
                if (me.model.definition == "Dimension" && x == "parentId") {
                    me.model.schema[x].subSchema.dimensionId.type = "Select";
                    me.model.schema[x].subSchema.dimensionId.options = [{val : null, label : " "}];
                    for (i=0; i<me.collection.models.length; i++) {
                        if (me.collection.models[i].get("oid") !== me.model.get("oid")) {
                            if (me.collection.models[i].get("dynamic") === false) {
                                var objD = {};
                                objD.val = me.collection.models[i].get("oid");
                                objD.label = me.collection.models[i].get("name");
                                me.model.schema[x].subSchema.dimensionId.options.push(objD);
                            }
                        }
                    }
                }
            }

            // set schema
            me.schema = me.model.schema;

            // Render View
            me.render();
        },

        render: function(currentView) {
            var me = this;

            var jsonData = {
                "view" : "squid-api-admin-widgets-" + me.model.definition,
                "definition" : me.model.definition,
                "buttonLabel" : me.buttonLabel,
                "accessible" : false,
            };

            // Print Button to trigger management widget
            if (! this.autoOpen) {
                if (this.parent) {
                    if (this.parent.get("_role") == "WRITE" || this.parent.get("_role") == "OWNER") {
                        jsonData.accessible = true;
                    }
                    // print template
                    this.$el.html(this.template(jsonData));
                }
            }
        }
    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.ProjectCollectionManagementWidget = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_project_collection_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.CollectionManagementWidget.extend({

        actionEvents: function(roles) {
            var me = this;

            // select
            $(".squid-api-" + this.type + "-model-widget-popup .select").on("click", function() {
                var value = $(this).parent('tr').attr('data-attr');

                if (me.changeEventHandler) {
                    $(".squid-api-" + this.type + "-model-widget-popup").dialog("close");
                    me.changeEventHandler.call(this, value);
                } else {
                    console.log('no change handler defined');
                }

                // set the selected model
                var models = me.collection.models;
                var model;
                for (i=0; i<models.length; i++) {
                    if (models[i].get("oid") == value) {
                        model = models[i];
                        break;
                    }
                }
                me.model.set(model);
            });

            if (roles.create) {
                // create
                new squid_api.view.ModelManagementView({
                    el : $(".squid-api-" + this.type + "-model-widget-popup .create"),
                    model : new squid_api.model[ this.type + "Model"](),
                    parent : me.parent,
                    suggestionHandler : me.suggestionHandler,
                    schemasCallback : me.schemasCallback,
                    beforeRenderHandler : me.beforeRenderHandler,
                    buttonLabel : "Create Project",
                    successHandler : function() {
                        me.collection.create(this);
                        var message = me.type + " with name " + this.get("name") + " has been successfully created";
                        squid_api.model.status.set({'message' : message});
                        if (me.changeEventHandler) {
                            me.changeEventHandler.call(this);
                        }
                    }
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
                    suggestionHandler : me.suggestionHandler,
                    schemasCallback : me.schemasCallback,
                    beforeRenderHandler : me.beforeRenderHandler,
                    buttonLabel : "edit",
                    successHandler : function() {
                        var message = me.type + " with name " + this.get("name") + " has been successfully modified";
                        squid_api.model.config.trigger("change:project", squid_api.model.config);
                        squid_api.model.status.set({'message' : message});
                    }
                });
            });

            // refresh db
            $(".squid-api-" + this.type + "-model-widget-popup .refreshdb").on("click", function() {
                var id = this.parentElement.dataset.attr;
                var project = me.collection.get(id);
                squid_api.refreshDb(project);
            });

            // delete
            $(".squid-api-" + this.type + "-model-widget-popup .delete").on("click", function() {
                var id = this.parentElement.dataset.attr;
                var model = me.collection.get(id);

                if (confirm("are you sure you want to delete the " + model.definition.toLowerCase() + " " + model.get("name") + "?")) {
                    if (true) {
                        model.destroy({
                            success:function(collection) {
                                var message = me.type + " with name " + collection.get("name") + " has been successfully deleted";
                                squid_api.model.status.set({'message' : message});
                            }
                        });
                    }
                }
            });
        }

    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.ProjectManagementWidget = factory(root.Backbone, root.squid_api);

}(this, function (Backbone, squid_api, template) {

    var View = Backbone.View.extend({

        createOnlyView : null,

        initialize: function(options) {
            if (options.createOnlyView) {
                this.createOnlyView = true;
            }
            this.render();
        },

        getDbSchemas : function() {
            var me = this;
            if (this.model.get("dbSchemas")) {
                var request = $.ajax({
                    type: "GET",
                    url: squid_api.apiURL + "/projects/" + me.model.get("id").projectId + "/schemas-suggestion?access_token=" + squid_api.model.login.get("accessToken"),
                    dataType: 'json',
                    success:function(collection) {
                        if (me.model.get("dbSchemas").length === 0) {
                            me.setStatusMessage('please set a db schema');
                        }
                        me.schema.dbSchemas.options = collection.definitions;
                        me.formContent.fields.dbSchemas.editor.setOptions(collection.definitions);
                    },
                    error: function(data) {
                        me.setStatusMessage(data.responseJSON.error);
                    }
                });
            }
        },

        render: function() {
            var viewOptions = {
                    "el" : this.$el,
                    "type" : "Project",
                    "schemasCallback" : this.getDbSchemas,
                    "model" : squid_api.model.project,
                    "parent" : squid_api.model.customer
            };

            if (this.createOnlyView) {
                viewOptions.successHandler = function(value) {
                    // logic to update collection
                    if (! value) {
                        value = this.get("id").projectId;
                    }
                    squid_api.model.config.set({
                        "project" : value,
                        "domain" : null,
                        "selection" : null,
                        "chosenDimensions" : null,
                        "selectedDimension" : null,
                        "chosenMetrics" : null,
                        "selectedMetric" : null
                    });
                };
                viewOptions.buttonLabel = "Create a new one";
                viewOptions.createOnlyView = this.createOnlyView;
                var modelView = new squid_api.view.ModelManagementView(viewOptions);
            } else {
                viewOptions.changeEventHandler = function(value){
                    if (! value) {
                        value = this.get("id").projectId;
                    }
                    squid_api.model.config.set({
                        "project" : value,
                        "domain" : null,
                        "selection" : null,
                        "chosenDimensions" : null,
                        "selectedDimension" : null,
                        "chosenMetrics" : null,
                        "selectedMetric" : null
                    });
                };
                viewOptions.template = squid_api.template.squid_api_project_collection_management_widget;
                var collectionView = new squid_api.view.ProjectCollectionManagementWidget(viewOptions);
            }

            return this;
        }

    });

    return View;
}));

(function (root, factory) {
    root.squid_api.view.RelationModelManagementView = factory(root.Backbone, root.squid_api, squid_api.template.squid_api_relation_management_widget);

}(this, function (Backbone, squid_api, template) {

    var View = squid_api.view.ModelManagementView.extend({

        successHandler: null,
        errorHandler: null,
        modalElementClassName : "squid-api-admin-widgets-modal-form",
        buttonLabel : null,
        autoOpen: null,
        parent: null,
        suggestionHandler : null,
        schemasCallback : null,
        beforeRenderHandler : null,
        modalTitle : null,
        collection : null,

        initialize: function(options) {
            var me = this;

            // setup options
            if (options.template) {
                this.template = options.template;
            } else {
                this.template = template;
            }
            if (options.successHandler) {
                this.successHandler = options.successHandler;
            }
            if (options.errorHandler) {
                this.errorHandler = options.errorHandler;
            }
            if (options.buttonLabel) {
                this.buttonLabel = options.buttonLabel;
            }
            if (options.autoOpen) {
                this.autoOpen = options.autoOpen;
            }
            if (options.parent) {
                this.parent = options.parent;
            }
            if (options.suggestionHandler) {
                this.suggestionHandler = options.suggestionHandler;
            }
            if (options.schemasCallback) {
                this.schemasCallback = options.schemasCallback;
            }
            if (options.beforeRenderHandler) {
                this.beforeRenderHandler = options.beforeRenderHandler;
            }
            if (options.modalTitle) {
                this.modalTitle = options.modalTitle;
            }
            if (options.createOnlyView) {
                this.createOnlyView = options.createOnlyView;
            }

            // Set Form Schema
            this.setSchema();

            if (this.collection) {
                this.collection.on("reset change remove sync", this.updateForm, this);
            }
            if (this.model) {
                this.listenTo(this.model, 'change', this.setSchema);
            }
            if (this.parent) {
                this.listenTo(this.parent, "change:id", this.render);
            }
            if (this.autoOpen) {
                this.prepareForm();
            }
        },

        updateForm : function() {
            var jsonData = {"models" : this.viewData()};
            this.relationView.$el.html(this.template(jsonData));
        },

        viewData: function() {
            var models = squid_api.utils.getDomainRelations(this.collection.models, squid_api.model.config.get("domain"));
            var arr = [];
            for (i=0; i<models.length; i++) {
                var obj = {};
                obj.oid = models[i].get("oid");
                obj.leftName = models[i].get("leftName");
                obj.rightName = models[i].get("rightName");

                // set cardinality booleans for handlebar display
                var leftCardinality = models[i].get("leftCardinality");
                var rightCardinality = models[i].get("rightCardinality");
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
                arr.push(obj);
            }

            return arr;
        },

        renderForm : function() {
            var me = this;
            var jsonData = {"models" : this.viewData()};

            // render the form into a backbone view
            this.relationView = Backbone.View.extend({
                events: {
                    "click .edit" : function(event) {
                        var oid = $(event.target).parents("tr").attr("data-value");
                        var model = me.collection.get(oid);
                        new squid_api.view.ModelManagementView({
                            el : $(this),
                            model : model,
                            parent : me.parent,
                            autoOpen : true,
                            beforeRenderHandler : me.beforeRenderHandler,
                            suggestionHandler : this.suggestionHandler,
                            buttonLabel : "edit",
                            successHandler : function() {
                                var message = "relation successfully modified";
                                squid_api.model.status.set({'message' : message});
                            }
                        });
                    },
                    "click .delete" : function(event) {
                        var oid = $(event.target).parents("tr").attr("data-value");
                        var model = me.collection.get(oid);
                        if (confirm("are you sure you want to delete this relation?")) {
                            if (true) {
                                model.destroy({
                                    success:function() {
                                        squid_api.model.status.set({'message' : "relation successfully deleted"});
                                        me.collection.trigger("change");
                                    }
                                });
                            }
                        }
                    },
                    "click .add" : function(event) {
                        new squid_api.view.ModelManagementView({
                            el : $(this),
                            model : me.model,
                            parent : me.parent,
                            autoOpen : true,
                            beforeRenderHandler : me.beforeRenderHandler,
                            suggestionHandler : this.suggestionHandler,
                            buttonLabel : "edit",
                            successHandler : function() {
                                squid_api.model.status.set({'message' : "relation successfully created"});
                                me.collection.create(this);
                            }
                        });
                    }
                },
                suggestionHandler: function() {
                    var me = this;
                    var relationEl = this.formContent.$el.find(".suggestion-box");
                    var request = $.ajax({
                        type: "GET",
                        url: squid_api.apiURL + "/projects/" + squid_api.model.project.get("id").projectId + "/relations-suggestion",
                        dataType: 'json',
                        data: {
                            "expression" : relationEl.val(),
                            "offset" : relationEl.prop("selectionStart") + 1,
                            "leftDomainId" : this.formContent.getValue().leftId.domainId,
                            "rightDomainId" : this.formContent.getValue().rightId.domainId,
                            "access_token" : squid_api.model.login.get("accessToken")
                        },
                        success:function(response) {
                            // detemine if there is an error or not
                            if (response.validateMessage.length === 0) {
                                relationEl.removeClass("invalid-expression").addClass("valid-expression");
                            } else {
                                relationEl.removeClass("valid-expression").addClass("invalid-expression");
                            }

                            // append box if definitions exist
                            if (response.definitions && response.definitions.length > 0) {

                                var definitions = response.definitions;

                                // store offset
                                var offset = response.filterIndex;

                                // remove existing dialog's
                                $(".squid-api-pre-domain-suggestions").remove();
                                $(".squid-api-domain-suggestion-dialog").remove();

                                // append div
                                relationEl.after("<div class='squid-api-pre-domain-suggestions squid-api-dialog'><ul></ul></div>");
                                for (i=0; i<definitions.length; i++) {
                                    relationEl.siblings(".squid-api-pre-domain-suggestions").find("ul").append("<li>" + definitions[i] + "</li>");
                                }

                                relationEl.siblings(".squid-api-pre-domain-suggestions").find("li").click(me, function(event) {
                                    var item = $(event.target).html();
                                    var str = relationEl.val().substring(0, offset) + item.substring(0);
                                    relationEl.val(str);
                                    me.suggestionHandler.call(me);
                                });

                                // show dialog
                                relationEl.siblings(".squid-api-pre-domain-suggestions").dialog({
                                    open: function(e, ui) {
                                        e.preventDefault();
                                    },
                                    dialogClass: "squid-api-domain-suggestion-dialog squid-api-dialog",
                                    position: { my: "center top", at: "center bottom+4", of: relationEl },
                                    closeText: "x"
                                });
                            } else {
                                // set message
                                squid_api.model.status.set("message", response.validateMessage);
                            }

                            // place the focus back onto the domain suggestionElement
                            relationEl.focus();
                        },
                        error: function(response) {
                            squid_api.model.status.set({'message' : response.responseJSON.error});
                        }
                    });
                },
                render: function() {
                    this.$el.html(template(jsonData));
                    return this;
                }
            });

            // instantiate relation view
            this.relationView = new this.relationView();

            // modal title
            modalTitle = "Domain Relations";

            // instantiate a new modal view, set the content & automatically open
            if (this.formModal) {
                this.formModal.open();
            } else {
                this.formModal = new Backbone.BootstrapModal({
                    content: this.relationView,
                    cancelText: "close",
                    title: modalTitle
                });
                this.formModal.open();
            }

            // modal wrapper class
            $(this.formModal.el).addClass(this.modalElementClassName);

            // modal definition class
            $(this.formModal.el).find(".modal-dialog").addClass(me.model.definition);

            // on cancel
            this.formModal.on('cancel', function() {
                $(".squid-api-dialog").remove();
            });

            /* bootstrap doesn't remove modal from dom when clicking outside of it.
               Check to make sure it has been removed whenever it isn't displayed.
            */
            $(this.formModal.el).on('hidden.bs.modal', function () {
                this.remove();
            });
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
