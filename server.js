var soap = require('soap');
var http = require('http');
var axios = require('axios');
//Used to avoid CORS errors
const cors = require('cors');
// Call express framework
var express = require('express');
// Import path
const path = require("path");

var api = require('./api');
var app = express();

const URL = "http://54.198.239.79:5230/graphql"; //proxy url

var service = {
    ws: {
        questionList: {
            questions : async function(args) {
                var category = args.category
                const questions = await axios.post(URL, {
                query: `
                  query {
                    gameQuestions(category: "${category}") {
                      categoria
                      ERROR
                      preguntas{
                        statement
                        optionA
                        optionB
                        optionC
                        optionD
                        image
                        ans
                      }
                     }
                    }
                    `
                  })
                if(questions &&  questions.data &&  questions.data.data &&  questions.data.data.gameQuestions.preguntas){
                  const rngQuestion = questions.data.data.gameQuestions.preguntas[Math.floor(Math.random() * questions.data.data.gameQuestions.preguntas.length)];                  return {  res : "Random question from: "+category,
                            statement: rngQuestion.statement,
                            optionA:  rngQuestion.optionA,
                            optionB: rngQuestion.optionB,
                            optionC: rngQuestion.optionC,
                            optionD: rngQuestion.optionD,
                            image: rngQuestion.image,
                            ans:  rngQuestion.ans
                         };
                }
                else{
                  if(questions.data.data.gameQuestions.ERROR){
                    return {res: questions.data.data.gameQuestions.ERROR}
                  }
                  return {res: "Se produjo un error"};
                }
            },
        }
    }
}


var xml = require('fs').readFileSync('service.wsdl', 'utf8'),

server = http.createServer(function(request,response) {
    response.end("404: Not Found: "+request.url)
});

server.listen(2000);
soap.listen(server, '/questionsrng', service, xml);
console.log("server listening")


//WSDL FILE IN:
//http://localhost:2000/questionsrng?wsdl








app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin: *');
  next();
})

const corsOptions = {
  origin: '*',
  //origin: 'http://127.0.0.1:3000',
};
app.use(express.json({limit: '10mb'}));
//To avoid CORS errors
app.use(cors(corsOptions));

//Use public dirname to serve static files
app.use(express.static(__dirname + '/public'));
//app.use('/uploads/drivers',express.static(path.join(__dirname, 'public/uploads/drivers')));

//Require route files
app.use('/interface', api.router);

// Start server in specific port
app.listen(3001, function(){
  // Actions on ready
  console.log('Server: Server is running');
});

 




