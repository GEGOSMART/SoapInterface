const xml2js = require('xml2js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let courses = [];

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
    xhr.open(method, url, true);
  }else{
    console.log("CORS not supported");
    xhr = null;
  }
  return xhr;
}

async function getCourses(){
    var xhr = createCORSRequest("POST", url);
    if(!xhr){
        throw err;
    }
    xhr.onload = function(){}

    xhr.setRequestHeader('Content-Type', 'text/xml');
    xhr.send(str);

    var response = xhr.responseText;
    courses = []
    xml2js.parseString(response, { mergeAttrs: true },(err, result) => {
        if(err) {
            throw err;
        }

        courses =  result["S:Envelope"]["S:Body"][0]["ns2:allCoursesResponse"][0]["return"]
        
        return courses;
        
        });

        return courses;
    
}

module.exports = {
    getCourses: getCourses
    }



