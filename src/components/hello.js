var
    base = require('./base');

module.exports = function(data) {
    base.call(this, 'templates/hello.html', data);
}