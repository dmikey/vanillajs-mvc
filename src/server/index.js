var express = require('express');

var
    templates = require('../templates');

var app = express();

var
    _view = require('../views/main');

app.get('/', function (req, res) {

    var index = templates['templates/index.html'];
    var viewChildren = [];
    var viewHtml = [];
    var body = {
        appendChild: function(child) {
            viewChildren.push(child); 
        }
    };
    _view.add(body);
    
    var children = viewChildren[0].getChildren();
    
    for(var i = 0; i < children.length;i++) {
        viewHtml.push(children[i].getChildren().join(''));
    }
    
    console.log();
    
    var child = children[0];
    
    res.send(index({
        body: viewHtml.join('')
    }));
});

console.log(__dirname);

app.use(express.static(__dirname + '/../../build'));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});