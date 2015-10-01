var
    router = require('./utils/router');

var
    current;

var
    cache = {
        main: require('./views/main')
    };

var current;

function render(key) {

    var
        view = cache[key];

    var
        oldview = cache[current]

    if (oldview) {
        oldview.remove()
    }

    current = key;
    view.add(document.body);
}

router({
    '*': function () {
        render('main');
    }
});
