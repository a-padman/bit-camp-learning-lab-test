var multipart = require("parse-multipart");
var fetch = require("node-fetch");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.'); 

    var boundary = multipart.getBoundary(req.headers['content-type']);
    
    var body = req.body;
  
    var parts = multipart.Parse(body, boundary);

    var result = await analyzeImage(parts[0].data);

    context.res = {
        body: {
            result
        }
    };

    console.log(result)
    context.done(); 
};

async function analyzeImage(img){
    const subscriptionKey = process.env['face_key'];
    const endpoint = process.env['face_endpoint'];

    const uriBase = `${endpoint}/face/v1.0/detect`;


    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'
    })

    
    //COMPLETE THE CODE
    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',  //WHAT TYPE OF REQUEST?
        body: img,  //WHAT ARE WE SENDING TO THE API?
        headers: {
            'Content-Type': 'application/octet-stream',  //do this in the next section
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })

    let data = await resp.json();
    
    return data; 
}

