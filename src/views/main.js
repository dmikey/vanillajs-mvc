var
    hello = require('../components/hello');

var
    block = require('../components/block');

module.exports = new block([
    new hello({
        world: 'WORLD!'
    })
]);