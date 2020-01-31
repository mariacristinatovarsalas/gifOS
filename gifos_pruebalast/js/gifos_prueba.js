/*VARIABLES*/

const apiKey = 'R6HlZmoZACiHenAqEf5l0jeXFDt2zUDG'
var url
var gifContainer
var suggestedTerm

/*function showThemeOptions() {
  document.getElementById("themesContainer").classList.toggle("show");
}

function popi(){
  document.getElementsByClassName("pop").style.backgroundColor = "red";
}*/

function changeToLightTheme(){
  //console.log("to light")
  document.getElementById("light").setAttribute("href", "styles/gifos_prueba.css")
  document.getElementById("logo").setAttribute("src", "styles/gifos_logo.png")
  document.getElementById("lupa").setAttribute("src", "lupa_light.svg")
}

function changeToDarkTheme(){
  //console.log("to dark")

  document.getElementById("light").setAttribute("href", "styles/sailor_night.css")
  document.getElementById("logo").setAttribute("src", "styles/logoDark.png")
  document.getElementById("lupa").setAttribute("src", "lupaDark.svg")
}




function redirectToCreateGifs() {
  location.replace("./upload_gifos_prueba.html")
}

function backToHome() {
  location.replace("./gifos_prueba.html")
}

/*THEMES DROPDOWN*/

function dropdown() {
  document.getElementById("dropdownContentBox").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdownContent");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


/*SERVER REQUEST*/

function serverRequest(url, gifContainer, classicShowData,Term, smallTrendingContainer) {
  console.log(url)
  const found =
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        showData(data,gifContainer,classicShowData,Term,smallTrendingContainer)
        return data
      })
      .catch(function (error) {
        return error
      })
  return found
}

/*SUGGESTIONS*/

function loadSuggestions() {
  for (let i = 0; i < 4; i++) {
    suggestedTerm = localStorage.key(i)
    url = 'http://api.giphy.com/v1/gifs/search?q=' + suggestedTerm + '&api_key=' + apiKey + '&limit=1'
    gifContainer = 'suggestionsContainer'
    serverRequest(url, gifContainer,false,suggestedTerm);

  }
}

/*function verMasButton() {
  document.getElementById(gifContainer).innerHTML = "";
  suggestedTerm = localStorage.key(i)
  url = 'http://api.giphy.com/v1/gifs/search?q=' + suggestedTerm + '&api_key=' + apiKey
  gifContainer = 'searchResultsContainer'
  serverRequest(url, gifContainer, true)
  document.getElementById('trendingsContainer').style.display = "none";
  document.getElementById('suggestionsContainer').style.display = "none";
}*/


/*TRENDINGS*/

function loadTrendings() {
  url = 'http://api.giphy.com/v1/gifs/trending?api_key=' + apiKey + '&limit=24'
  gifContainer = 'trendingsContainer'
  serverRequest(url, gifContainer, true)
}

/*GET SEARCH RESULTS FUNCTION*/

function getSearchResults(Term) {
  let searchedTerm
  document.getElementById(gifContainer).innerHTML = "";
  if (Term){
    searchedTerm = Term
  }
  else{
   searchedTerm = document.getElementById("searchBar").value
  }
  url = 'http://api.giphy.com/v1/gifs/search?q=' + searchedTerm + '&api_key=' + apiKey + '&limit=24'
  gifContainer = 'searchResultsContainer'
  serverRequest(url, gifContainer,true)
  document.getElementById('suggestions').style.display = "none";
  document.getElementById('trendings').style.display = "none";
  document.getElementById('searchResultsContainer').style.display = "flex";
  localStorage.setItem(searchedTerm, JSON.stringify(searchedTerm));
  
  //document.getElementById("suggestionsBar").style.display = "none";
}

/*function funcionprueba(data){
  console.log(data)
  console.log("ocurrio")
}*/


/*PRUEBAAAAAAAS*/

/*PRINT DATA FUNCTION (generic)*/

function showData(data, gifContainer, classicShowData,Term) {
  // document.getElementById(gifContainer).innerHTML = "";
  data.data.forEach(function (gif) {
   
    var createdImageToContainGif = document.createElement("IMG")
    createdImageToContainGif.setAttribute('src', gif.images.original.url)
    var trendingGifContainer = document.createElement("DIV")
    trendingGifContainer.appendChild(createdImageToContainGif)
    
    if(classicShowData===true){   
      createdImageToContainGif.setAttribute('class', 'trendingGifs')
      //document.getElementById(gifContainer).appendChild(createdImageToContainGif)
      // trendingGifContainer.setAttribute('class', 'trendingGifContainer')
      if(gif.images.original.width>500){
              trendingGifContainer.setAttribute('class', 'trendingGifContainerBig')

      }else{
        trendingGifContainer.setAttribute('class', 'trendingGifContainerSmall')

      }
       document.getElementById(gifContainer).appendChild(trendingGifContainer)
    }else{
  
  createdImageToContainGif.setAttribute('class', 'gifStyle')
  var barritaGif = document.createElement("DIV")
  barritaGif.setAttribute('class', 'barrita')
  var buttonVerMas = document.createElement("BUTTON")
  buttonVerMas.setAttribute('class', 'buttonVerMas')
  buttonVerMas.innerHTML = "Ver más...";
  buttonVerMas.setAttribute('onclick','getSearchResults("'+Term+'")')
  //var iconClose = document.createElement("IMG")
  //iconClose.setAttribute('src', './buttonClose.svg')
  //iconClose.setAttribute('class', 'icon')
  var closeButton = document.createElement("BUTTON")
  //closeButton.appendChild(iconClose)
  closeButton.setAttribute('class', 'closeButton')
  closeButton.onclick = function removeSuggestionGif() {

    
  }
  var eachGifContainer = document.createElement("DIV")
  eachGifContainer.insertBefore(barritaGif, eachGifContainer.firstChild)
  eachGifContainer.appendChild(createdImageToContainGif)
  eachGifContainer.appendChild(buttonVerMas)
  eachGifContainer.appendChild(closeButton)
  eachGifContainer.setAttribute('class', 'eachGifContainer')
  document.getElementById(gifContainer).appendChild(eachGifContainer)
    }
  })
}

/*function removeSuggestionGif() {
  //localStorage.removeItem("suggestedTerm");

}*/

function showMyGifSection() {
  document.getElementById("trendings").style.display = "none";
  document.getElementById("searchSection").style.display = "none";
  document.getElementById("suggestions").style.display = "none";
  document.getElementById("misGuifosContainer").style.display = "block";
}















































/*PRINT DATA FUNCTION SUGGESTIONS*/

// function showDataSuggestions(data, gifContainer) {
//   document.getElementById("searchResultsContainer").innerHTML = "";
//   data.data.forEach(function (gif) {
//     var createdImageToContainGif = document.createElement("IMG")
//     createdImageToContainGif.setAttribute('src', gif.images.original.url)
//     createdImageToContainGif.setAttribute('class', 'gifStyle')
//     document.getElementById(gifContainer).appendChild(createdImageToContainGif)

//   var barritaGif = document.createElement("DIV")
//   barritaGif.setAttribute('class', 'barrita')
//   var buttonVerMas = document.createElement("BUTTON")
//   buttonVerMas.setAttribute('class', 'buttonVerMas')
//   buttonVerMas.innerHTML = "Ver más...";
//   var iconClose = document.createElement("IMG")
//   iconClose.setAttribute('src', './buttonClose.svg')
//   iconClose.setAttribute('class', 'icon')
//   var eachGifContainer = document.createElement("DIV")
//   eachGifContainer.insertBefore(barritaGif, eachGifContainer.firstChild)
//   eachGifContainer.appendChild(createdImageToContainGif)
//   eachGifContainer.appendChild(buttonVerMas)
//   eachGifContainer.appendChild(iconClose)
//   eachGifContainer.setAttribute('class', 'eachGifContainer')
//   document.getElementById(gifContainer).appendChild(eachGifContainer)
// }

/*PRINT DATA FOR SUGGESTIONS GIFS (specific function)*/

/*function showData(data, gifContainer){
    document.getElementById("searchResultsContainer").innerHTML = "";
    data.data.forEach(function(gif){
    var createdImageToContainGif = document.createElement("IMG")
    createdImageToContainGif.setAttribute('src', gif.images.original.url)
    createdImageToContainGif.setAttribute('class', 'gifStyle')
    var barritaGif = document.createElement("DIV")
    barritaGif.setAttribute('class', 'barrita')
    var buttonVerMas = document.createElement("BUTTON")
    buttonVerMas.setAttribute('class', 'buttonVerMas')
    buttonVerMas.innerHTML = "Ver más...";
    var iconClose = document.createElement("IMG")
    iconClose.setAttribute('src', './buttonClose.svg')
    iconClose.setAttribute('class', 'icon')
    var eachGifContainer = document.createElement("DIV")
    eachGifContainer.insertBefore(barritaGif, eachGifContainer.firstChild)
    eachGifContainer.appendChild(createdImageToContainGif)
    eachGifContainer.appendChild(buttonVerMas)
    eachGifContainer.appendChild(iconClose)
    eachGifContainer.setAttribute('class', 'eachGifContainer')
    document.getElementById(gifContainer).appendChild(eachGifContainer)
    })
  }*/


