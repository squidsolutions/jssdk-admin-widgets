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
            // reload filters
            this.config.trigger("change:selection");
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
            this.formContent.on('leftCardinality:change', function(form) {
                if (form.fields.leftCardinality.getValue() == "MANY" && form.fields.rightCardinality.getValue() == "MANY") {
                    form.fields.leftCardinality.setValue("ZERO_OR_ONE");
                    squid_api.model.status.set("message", "cannot set the cardinality many to many");
                }
            });
            this.formContent.on('rightCardinality:change', function(form) {
                if (form.fields.leftCardinality.getValue() == "MANY" && form.fields.rightCardinality.getValue() == "MANY") {
                    form.fields.rightCardinality.setValue("ZERO_OR_ONE");
                    squid_api.model.status.set("message", "cannot set the cardinality many to many");
                }
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
                        schema.leftId.subSchema.domainId.options = arr.sort(me.comparator);
                        schema.rightId.subSchema.domainId.options = arr.sort(me.comparator);
                        dfd.resolve(schema);
                    });
                });
            });
            return dfd;
        }

    });

    return View;
}));
