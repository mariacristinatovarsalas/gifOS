function backToHome() {
    location.replace("./gifos_prueba.html")
}












































































































































/*const apiKey = 'R6HlZmoZACiHenAqEf5l0jeXFDt2zUDG'

    var recorder 
    var blob
    var url

function getStream(){
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
        height: { max: 480 }
        }
    })
        .then(function(stream) {
        video.srcObject = stream;
        document.getElementById("video").src = stream
        video.play()
        
         recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function() {
            console.log('started')
            },
            });

            console.log(recorder)
})
}

function startRecord(){
    recorder.startRecording()
}

function stopRecord(){

    recorder.stopRecording(function(gif){console.log(gif)
    })
    
    blob = recorder.getBlob()
    console.log(blob)
    showPreview(blob)
}

function showPreview(blob){
    url = URL.createObjectURL(blob)
     //URL.revokeObjectURL(url);
     console.log(url)
    document.getElementById("gifPreview").src = url;
 }

function uploadGif(){
    let form = new FormData();
    form.append('file', recorder.getBlob(), 'myGif.gif');
    var urlGiphyUploadRequest = 'http://upload.giphy.com/v1/gifs?api_key=' + apiKey + '&username=mcts92'
    var parameterForFetch = {
        body: form,
        method: "POST" }
        fetch(urlGiphyUploadRequest, parameterForFetch)
        .then(data=>{
            
            return data.json()
        })
        .then(res=>{
            showData(res)
            console.log(res)
            console.log(res.data.id)})
            
        .catch(error=>console.log(error))
        

        

    }

    function showData(res){
        localStorage.setItem('gif' + JSON.stringify(res.data.id), JSON.stringify(res));
    }*/

    //Gif big Budita ky96AziI16NzottYXr



