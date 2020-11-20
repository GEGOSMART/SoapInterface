var soap = require('soap');
var http = require('http');


var service = {
    ws: {
        questionList: {
            questions : function(args) {
                var category = args.category
                return { res : "you asked for questions from: "+category };
            },
        }
    }
}

/*
var service = {
    ws: {
        calc: {
            sumar : function(args) {
                var n = 1*args.a + 1*args.b;
                return { sumres : n };
            },

            multiplicar : function(args) {
                var n = args.a * args.b;
                return { mulres : n };
            }
        }
    }
};*/

var xml = require('fs').readFileSync('service.wsdl', 'utf8'),

server = http.createServer(function(request,response) {
    response.end("404: Not Found: "+request.url)
});

server.listen(2000);
soap.listen(server, '/questions', service, xml);
console.log("server listening")


//WSDL FILE IN:
//http://localhost:2000/questions?wsdl
