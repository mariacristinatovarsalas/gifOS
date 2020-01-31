function themeChoosing() {
    if (localStorage.getItem('theme') === 'dark') {
        changeToDarkTheme()
    } else {
        changeToLightTheme()
    }
}
var urlUltimoUpload = "Chanfle"
var gifoprueba
function descargarGuifo(hola){

    var mil = document.getElementById("finalGifDeposit")
    hola.href=gifoprueba
}

function listoGuifo(){
    location.replace("/mis_guifos.html")
}

function changeToLightTheme() {
    //console.log("to light")
    localStorage.setItem('theme', 'light')
    document.getElementById("light").setAttribute("href", "styles/gifos_prueba.css")
    document.getElementById("logo").setAttribute("src", "styles/gifos_logo.png")
    document.getElementById("lupa").setAttribute("src", "lupa_inactive.svg")
}

function changeToDarkTheme() {
    //console.log("to dark")
    localStorage.setItem('theme', 'dark')
    document.getElementById("light").setAttribute("href", "styles/sailor_night.css")
    document.getElementById("logo").setAttribute("src", "styles/logoDark.png")
    document.getElementById("lupa").setAttribute("src", "lupaDark.svg")
}


var gifHechosGuardados = JSON.parse(localStorage.getItem('gifHechos'))
var divGifHechos = document.getElementById("misGuifosContainer")


if (!Array.isArray(gifHechosGuardados)) {
    gifHechosGuardados = []
}

function redirectToCreateGifs() {
    location.replace("upload_gifos_prueba.html")
}

function backToHome() {
    location.replace("gifos_prueba.html")
}




gifHechosGuardados.forEach(function (gif) {
    let idgif = gif.data.id
    let url = "https://media0.giphy.com/media/" + idgif + "/giphy.gif"
    let img = document.createElement("img")
    // let descargar= document.getElementById("paraDescargar")
    img.setAttribute('class', 'gifShowedInMisGuifosContainer')
    img.setAttribute('src', url)
// descargar.setAttribute("href",url)

    divGifHechos.appendChild(img)
})







function backToHome() {
    location.replace("./gifos_prueba.html")
}

/*function changeToLightTheme() {
    //console.log("to light")
    document.getElementById("light").setAttribute("href", "styles/gifos_prueba.css")
    document.getElementById("logo").setAttribute("src", "styles/gifos_logo.png")
  }
  
  function changeToDarkTheme() {
    //console.log("to dark")
  
    document.getElementById("light").setAttribute("href", "styles/sailor_night.css")
    document.getElementById("logo").setAttribute("src", "styles/logoDark.png")
  }*/

const apiKey = 'R6HlZmoZACiHenAqEf5l0jeXFDt2zUDG'

var recorder
var blob
var url

function getStream() {

    document.getElementById("misGuifosContainer").style.display = "none";
    document.getElementById("misGuifosBar").style.display = "none";


    document.getElementById("crearGuifos").style.display = "none";
    //document.getElementById("video").style.display = "block";
    document.getElementById("videoContainer").style.display = "flex";

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

            console.log(recorder)
        })
}

function startRecord() {
    document.getElementById("cameraButton").style.display = "none";
    document.getElementById("capturarButton").style.display = "none";
    document.getElementById("titleBarGifCapture").innerHTML = "Capturando Tu Guifo";
    document.getElementById("listoButton").style.display = "inline-block";
    document.getElementById("recordingButton").style.display = "inline-block";
    recorder.startRecording()
}

function stopRecord() {

    recorder.stopRecording(function (gif) {
        console.log(gif)
    })

    blob = recorder.getBlob()
    console.log(blob)
    showPreview(blob)


}

function showPreview(blob) {

    document.getElementById("listoButton").style.display = "none";
    document.getElementById("titleBarGifCapture").innerHTML = "Vista Previa";
    document.getElementById("video").style.display = "none";
    document.getElementById("recordingButton").style.display = "none";
    document.getElementById("repetirCapturaButton").style.display = "inline-block";
    document.getElementById("subirGuifoButton").style.display = "inline-block";

    url = URL.createObjectURL(blob)
    gifoprueba=url
    //URL.revokeObjectURL(url);
    console.log(url)
    document.getElementById("gifPreview").src = url;
}

function gifCargadoConExitoAviso() {
    document.getElementById("titleBarGifCapture").innerHTML = "Guifo Subido Con Éxito";
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







function uploadGif() {

    document.getElementById("repetirCapturaButton").style.display = "none";
    document.getElementById("subirGuifoButton").style.display = "none";
    document.getElementById("cancelarUploadButton").style.display = "inline-block";
    document.getElementById("titleBarGifCapture").innerHTML = "Subiendo Guifo";
    document.getElementById("video").style.display = "none";
    document.getElementById("gifPreview").style.display = "none";
    document.getElementById("uploadingGif").style.display = "flex";
    document.getElementById("h1UploadingGif").style.display = "inline-block";
    document.getElementById("pUploadingGif").style.display = "inline-block";
    document.getElementById("globeImg").style.display = "inline-block";



    let form = new FormData();
    form.append('file', recorder.getBlob(), 'myGif.gif');
    var urlGiphyUploadRequest = 'http://upload.giphy.com/v1/gifs?api_key=' + apiKey + '&username=mcts92'
    var parameterForFetch = {
        body: form,
        method: "POST"
    }
    fetch(urlGiphyUploadRequest, parameterForFetch)
        .then(data => {

            return data.json()
        })
        .then(res => {
            showData(res)
            gifCargadoConExitoAviso()
            console.log(res)
            console.log(res.data.id)
            let url = "https://media0.giphy.com/media/" + res.data.id + "/giphy.gif"
            urlUltimoUpload = url
            let img = document.getElementById("finalGifDeposit")
            img.src = url
        })

        .catch(error => console.log(error))


}


function showData(res) {
    gifHechosGuardados.push(res)
    localStorage.setItem('gifHechos', JSON.stringify(gifHechosGuardados));
}

function copiarEnlaceGuifo() {
    navigator.clipboard.writeText(urlUltimoUpload)
        .then(
            alert("Link Copiado! Pegalo y Compartelo con tus amigos!: " + urlUltimoUpload))
}





/*function showData(res) {
    localStorage.setItem('gif' + JSON.stringify(res.data.id), JSON.stringify(res));
     }*/




/*var gifInLocalStorage = localStorage.setItem('gif' + JSON.stringify(res.data.id), JSON.stringify(res));
localStorage.getItem(gifInLocalStorage)
var uploadedGif = document.createElement("IMG");
uploadedGif.setAttribute('src', '')
misGuifosContainer.appendChild(gifInLocalStorage);*/


/*var uploadedGif = document.createElement("IMG");
uploadedGif.appendChild

var createdImageToContainGif = document.createElement("IMG")
createdImageToContainGif.setAttribute('src', gif.images.original.url)
var trendingGifContainer = document.createElement("DIV")
trendingGifContainer.appendChild(createdImageToContainGif)*/














    // Gif big Budita ky96AziI16NzottYXr



