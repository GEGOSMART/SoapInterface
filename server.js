var soap = require('soap');
var http = require('http');
var axios = require('axios');
const xml2js = require('xml2js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
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

server.listen(2000);
soap.listen(server, '/questionsrng', service, xml);
console.log("server listening")


//WSDL FILE IN:
//http://localhost:2000/questionsrng?wsdl




 let url = 'http://3.221.124.186:1515/WS/Courses?wsdl';

 const str = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://soaparquitecture.mycompany.com/">
        <soapenv:Header/>
        <soapenv:Body>
           <soap:allCourses/>
        </soapenv:Body>
     </soapenv:Envelope>`;

function createCORSRequest(method, url){
  var xhr = new XMLHttpRequest();
  if("withCredentials" in xhr){
    xhr.open( method, url, false);
  }else if(typeof XDomainRequest != "undefined"){
    xhr = new XDomainRequest();
    xhr.open(method, url);
  }else{
    console.log("CORS not supported");
    xhr = null;
  }
  console.log("entra")
  return xhr;
}

var xhr = createCORSRequest("POST", url);
if(!xhr){
  console.log("xhr issue");
  return;
}
xhr.onload = function(){
  console.log("functions")
  var response = xhr.responseText;
  
  xml2js.parseString(response, { mergeAttrs: true },(err, result) => {
    if(err) {
        throw err;
    }

    console.log(result["S:Envelope"]["S:Body"][0]["ns2:allCoursesResponse"][0]["return"])
    
});
}

xhr.setRequestHeader('Content-Type', 'text/xml');
xhr.send(str);





