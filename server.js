var soap = require('soap');
var http = require('http');
var axios = require('axios');
const URL = "http://54.197.174.175/graphql"; //proxy url

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
                  const rngQuestion = questions.data.data.gameQuestions.preguntas[Math.floor(Math.random() * questions.data.data.gameQuestions.preguntas.length)];;
                  return {  res : "Random question from: "+category,
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

server.listen(2001);
soap.listen(server, '/questionsrng', service, xml);
console.log("server listening")


//WSDL FILE IN:
//http://localhost:2000/questionsrng?wsdl
