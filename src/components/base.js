var
    templates = require('../templates');


//server side fill, for document 
//module uses, help us build robust server rendered
//pages from the same views as we use for client side
 var document;

if(typeof window == 'object') {
    document = window.document;
} else {
    document = {
        createDocumentFragment: function(){
            var children = [];
            return {
                appendChild: function(child) {
                    children.push(child);
                },
                getChildren: function() {
                    return children;
                } 
            }
        },
        createElement: function(type) {
            return {
                children: [
                    void(0)
                ],
                child: function(){
                    return this.innerHTML;   
                }
            }
        }
    };
}

module.exports = function(templatePath, data){

    this.template = templates[templatePath];

    //setup template binding
    for(var k in data) this[k] = data[k];

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
        this.node = element.children[0] || element.child();
        fragment.appendChild(this.node);
        this.fragment = fragment;
    }

    //leaving this off of node side for right now
    if(typeof window == 'object') {
        //when the model is updated, change the values in dom
        Object.observe( this, function(changes) {
            var redraw = false;
            changes.forEach(function(change) {
               if(change.name != 'node' && change.name != 'fragment') {
                    if(this.parent) this.parent.redraw();
               };
            }.bind(this));
        }.bind(this));
    }

    this.setup();
};