var
    debounce = require('../utils/debounce');

module.exports = function (components) {

    this.add = function (target) {
        var
            fragment = document.createDocumentFragment();

        for (var i = 0, len = components.length; i < len; i++) {
            components[i].parent = this;
            fragment.appendChild(components[i].fragment);
        };

        this.fragment = fragment;
        target.appendChild(this.fragment);
    };

    var draw = debounce(function(component){
        component.remove();
        component.add(document.body);
    }, 250);

    this.redraw = function(){
        draw(this);
    };

    this.remove = function () {
        for (var i = 0, len = components.length; i < len; i++) {
            document.body.removeChild(components[i].node);
            components[i].setup();
        };
    };
};

