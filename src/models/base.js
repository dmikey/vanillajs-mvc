module.exports = function () {
    var Model = Parse.Object.extend(this.modelName);
    var user = Parse.User.current();

    this.new = function (data, cb, cberror) {
        var model = new Model();
        model.save(data, {
            success: function (model) {
                // Execute any logic that should take place after the object is saved.
                alert('New object created with objectId: ' + model.id);
            },
            error: function (model, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
            }
        });
    };

    this.destroy = function (id, cb, cberror) {
        var query = new Parse.Query(Model);
        query.equalTo("objectId", id);
        query.first({
            success: function (model) {
                model.destroy({
                    success: function (model) {
                        cb(model);
                    },
                    error: function (model, error) {
                        cberror(model);
                    }
                });
            }.bind(this),
            error: function (model, error) {
                cberror(model, error);
            }
        });
    };

    this.get = function (opts, cb, cberror) {

        var query = new Parse.Query(Model);

        if (opts.private) {
            query.equalTo("user", Parse.User.current().id);
        }

        if (opts.sortBy) {
            query.descending(opts.sortBy);
        }

        query.find({
            success: function (model) {
                cb(model);
            }.bind(this),
            error: function (model, error) {
                cberror(model, error);
            }
        });

        return this;
    };

}