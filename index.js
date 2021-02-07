function loadFile(event) {
    var image = document.getElementById('output'); //set div for image output
    image.src = URL.createObjectURL(event.target.files[0]);//Load inputted image
};

async function handle(event){
    console.log ("submitting form...");
    $('#emotion').html("Loading...")
    event.preventDefault(); //make sure to disable reload here...

    var myForm = document.getElementById('image-form');
    var payload = new FormData(myForm);

    var functionUrl = "https://bcweek1.azurewebsites.net/api/myFirstTrigger?code=O0iiNTQ9naKujHMQpgAWUSzlf1M8umRWcAVxUkMfaPuQtsTrQNpiwA=="
    const resp = await fetch (functionUrl, {
        method: 'POST',
        body: payload
    });

    var data = await resp.json();
    var emotion = data.result[0].faceAttributes.emotion;
    var resultString = `
    <h3> Emotions in the image: </h3><br />
    <p> anger: ${emotion.anger}</p>
    <p> contempt: ${emotion.contempt}</p>
    <p> disgust: ${emotion.disgust}</p>
    <p> fear: ${emotion.fear}</p>
    <p> happiness: ${emotion.happiness}</p>
    <p> neutral: ${emotion.neutral}</p>
    <p> sadness: ${emotion.sadness}</p>
    <p> surprise: ${emotion.surprise}</p>
    `;
    //anger, contempt, disgust, fear, happiness, neutral, sadness, and surprise
    // Finish for other data types using the same format (i.e. ${emotion.contempt}, and etc)
    $('#emotion').html(resultString);
}



