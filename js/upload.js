/** VARIABLES */

const apiKey = 'R6HlZmoZACiHenAqEf5l0jeXFDt2zUDG'

/** Global */
var url
var recorder
var blob
var urlCreatedGuifo
var guifoLinkToShare



/**  GET STREAM  
It executes when clicking the "Comenzar" button */
function getStream() {
    document.getElementById("misGuifosContainer").style.display = "none";
    document.getElementById("misGuifosBar").style.display = "none";
    document.getElementById("crearGuifosGrayContainer").style.display = "none";
    document.getElementById("videoContainer").style.display = "flex";
/** This function turns on camera device using the RecordRTC API, then it saves the stream 
like a gif and shows it in the DOM */
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    })
        .then(function (stream) {
            video.srcObject = stream;
            document.getElementById("video").src = stream
            video.play()

            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('started')
                },
            });
        })
}



/** START RECORDING 
 It executes when clicking the "Capturar" button */
function startRecord() {
    document.getElementById("cameraButton").style.display = "none";
    document.getElementById("capturarButton").style.display = "none";
    document.getElementById("uploadTitleBar").innerHTML = "Capturando Tu Guifo";
    document.getElementById("listoButton").style.display = "inline-block";
    document.getElementById("recordingButton").style.display = "inline-block";
    /** This function starts the recording */
    recorder.startRecording()
}




/**  STOP RECORDING 
It executes when clicking the "Listo" button. 
When this function is executed the recording is stopped and it saves like a blob object */
 function stopRecord() {
    recorder.stopRecording(function (gif) {
    })
    blob = recorder.getBlob()
    showPreview(blob)
}



/** SHOW PREVIEW 
It executes inside the "stopRecord" function and displays the guifo preview */
function showPreview(blob) {
    document.getElementById("gifPreview").style.display="block";
    document.getElementById("listoButton").style.display = "none";
    document.getElementById("uploadTitleBar").innerHTML = "Vista Previa";
    document.getElementById("video").style.display = "none";
    document.getElementById("recordingButton").style.display = "none";
    document.getElementById("repetirCapturaButton").style.display = "inline-block";
    document.getElementById("subirGuifoButton").style.display = "inline-block";

    url = URL.createObjectURL(blob)
    urlCreatedGuifo = url
    document.getElementById("gifPreview").src = url;
}




/** REPEAT RECORDING 
It executes when clicking the "Repetir Captura" button.
This function allows the user to repeat the recording */ 
function repeatRecord() {
    document.getElementById("uploadTitleBar").innerHTML = "Vista Previa";
    document.getElementById("video").style.display = "block";
    document.getElementById("cameraButton").style.display = "block";
    document.getElementById("repetirCapturaButton").style.display = "none";
    document.getElementById("subirGuifoButton").style.display = "none";
    document.getElementById("gifPreview").style.display="none"
    document.getElementById("videoContainer").style.display = "flex";
    document.getElementById("capturarButton").style.display = "block";
    getStream()
}




/** UPLOAD GIF 
It executes when clicking on the "Subir Guifo" button. It hides and shows 
elements that are present in the DOM to show only the ones
related to the uploading moment */ 
function uploadGif() {
    document.getElementById("gifPreview").style.display="none";
    document.getElementById("repetirCapturaButton").style.display = "none";
    document.getElementById("subirGuifoButton").style.display = "none";
    document.getElementById("cancelarUploadButton").style.display = "inline-block";
    document.getElementById("uploadTitleBar").innerHTML = "Subiendo Guifo";
    document.getElementById("video").style.display = "none";
    document.getElementById("video").style.display = "none";
    document.getElementById("uploadingGif").style.display = "flex";
    document.getElementById("h1UploadingGif").style.display = "inline-block";
    document.getElementById("pUploadingGif").style.display = "inline-block";
    document.getElementById("globeImg").style.display = "inline-block";

    /** This function creates a file and saves the stream like a .gif file, 
    then this is posted to Giphy server */
    let form = new FormData();
    form.append('file', recorder.getBlob(), 'myGif.gif');
    var urlGiphyUploadRequest = 'https://upload.giphy.com/v1/gifs?api_key=' + apiKey + '&username=mcts92'
    var parameterForFetch = {
        body: form,
        method: "POST"
    }
    fetch(urlGiphyUploadRequest, parameterForFetch)
        .then(data => {
            return data.json()
        })
        .then(res => {
            /** Once that the guifo is saved in Giphy server it's necessary
            to get the url of the created guifo to display it as an img into the DOM */
            toSaveGuifo(res)
            successfulUploadNotification()
            let url = "https://media0.giphy.com/media/" + res.data.id + "/giphy.gif"
            guifoLinkToShare = url
            let img = document.getElementById("finalGifDeposit")
            img.src = url
        })
        .catch(error => console.log(error))
}




/**  UPLOAD SUCCESS
It executes when the upload finishes.
Hides and displays elements that are present in the DOM */ 
function successfulUploadNotification() {
    document.getElementById("uploadTitleBar").innerHTML = "Guifo Subido Con Éxito";
    document.getElementById("globeImg").style.display = "none";
    document.getElementById("pUploadingGif").style.display = "none";
    document.getElementById("h1UploadingGif").style.display = "none";
    document.getElementById("uploadingGif").style.display = "none";
    document.getElementById("cancelarUploadButton").style.display = "none";
    document.getElementById("globeImg").style.display = "none";
    document.getElementById("copiarEnlaceGuifoButton").style.display = "inline-block";
    document.getElementById("descargarGuifoButton").style.display = "inline-block";
    document.getElementById("listoCargaGifButton").style.display = "inline-block";
    document.getElementById("pGuifoSubido").style.display = "inline-block";
    document.getElementById("finalGifDeposit").style.display = "inline-block";
    document.getElementById("divFinalGifDeposit").style.display = "inline-block";
    document.getElementById("misGuifosBar").style.display = "block";
    document.getElementById("misGuifosContainer").style.display = "flex";
    document.getElementById("misGuifosBar").style.margin = "105vh 0 0vh 8vw";
    document.getElementById("misGuifosContainer").style.margin = "3vh 0 7vh 7.5vw";
}


/** Related to the created gifs search  */
var createdGuifosSaved = JSON.parse(localStorage.getItem('createdGifs'))
var createdGuifosDiv = document.getElementById("misGuifosContainer")


/** Confirms if there are saved guifos in Local Storage, otherwise "createdGuifosSaved" is 
initialized like an empty array */
if (!Array.isArray(createdGuifosSaved)) {
    createdGuifosSaved = []
}

/** Iterating over created guifos array. For each saved guifo it will search the
gif in Giphy and set it like an img in DOM */
createdGuifosSaved.forEach(function (guifo) {
    let idGuifo = guifo.data.id
    let url = "https://media0.giphy.com/media/" + idGuifo + "/giphy.gif"
    let img = document.createElement("img")
    img.setAttribute('class', 'gifShowedInMisGuifosContainer')
    img.setAttribute('src', url)
    createdGuifosDiv.appendChild(img)
})



/**  TO SAVE GUIFO
This function adds and saves in Local Storage the last created guifo */
function toSaveGuifo(guifo) {
    createdGuifosSaved.push(guifo)
    localStorage.setItem('createdGifs', JSON.stringify(createdGuifosSaved));
}



/** COPY GUIFO LINK
It executes when clicking the "Copiar Enlace Guifo" button.
This function copies in the clipboard the url of the last created guifo */ 
function copyGifLink() {
    navigator.clipboard.writeText(guifoLinkToShare)
        .then(
            alert("¡Link copiado y listo para compartir!: " + guifoLinkToShare))
}




/** DOWNLOAD CREATED GIF
This function sets the url of the last created guifo at the download anchor in DOM. */ 
function downloadGuifo(anchorDownload){
    anchorDownload.href = urlCreatedGuifo
}