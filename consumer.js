var soap = require('soap');
var url = 'http://3.221.124.186:1515/WS/Courses?wsdl';
soap.createClient(url, (err, client)=>{
    if(err){
        console.log(err);
    }else{
        console.log('ok');
        
    }
})

/* 
var args = {name: 'value'};
  soap.createClientAsync(url).then((client) => {
    return client.MyFunctionAsync(args);
  }).then((result) => {
    console.log(result);
  });

  */
