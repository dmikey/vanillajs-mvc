var
    templates = require('../templates');

module.exports = function(templatePath, data){

    this.template = templates[templatePath];

    //setup template binding
    for(var k in data) this[k]=data[k];

    this.data = function(data) {
        //setup template binding
        for(var k in this) {
            var d = data.get(k);
            if(d) {
                this[k] = data.get(k);
            }
        };
    };

    this.setup = function(){
        var fragment = document.createDocumentFragment();
        var element = document.createElement('div');

        //setup the actual fragement to render
        element.innerHTML = this.template.call(this, this);
        this.node = element.children[0];
        fragment.appendChild(element.children[0]);
        this.fragment = fragment;
    }

    //when the model is updated, change the values in dom
    Object.observe( this, function(changes) {
        var redraw = false;
        changes.forEach(function(change) {
           if(change.name != 'node' && change.name != 'fragment') {
                if(this.parent) this.parent.redraw();
           };
        }.bind(this));
    }.bind(this));

    this.setup();
};