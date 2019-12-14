const apiKey = 'R6HlZmoZACiHenAqEf5l0jeXFDt2zUDG'
var url
var gifContainer 
var suggestedTerm

function showThemeOptions() {
  document.getElementById("themesContainer").classList.toggle("show");
}

function popi(){
  document.getElementsByClassName("pop").style.backgroundColor = "red";
}

/*function changeToDarkTheme(){
  document.getElementById("light").setAttribute("href", "styles/sailor_night.css")
}

function changeToLightTheme(){
  document.getElementById("dark").setAttribute("href", "styles/sailor_day.css")
}*/

function serverRequest(url, gifContainer){
  console.log(url)
  const found = 
    fetch(url)
      .then(function(response){
      return response.json();
      })
      .then(function(data){
      console.log(data)
      showData(data, gifContainer)
      return data
      })
      .catch(function(error){
        return error
      })
  return found 
}

function loadSuggestions(){
  for(let i = 0; i < localStorage.length; i++){ 
    suggestedTerm = localStorage.key(i)
    url = 'http://api.giphy.com/v1/gifs/search?q=' + suggestedTerm + '&api_key=' + apiKey + '&limit=1'
    gifContainer = 'suggestionsContainer'
    serverRequest(url, gifContainer)
  }
}

function loadTrendings(){
  url = 'http://api.giphy.com/v1/gifs/trending?api_key=' + apiKey
  gifContainer = 'trendingsContainer'
  serverRequest(url, gifContainer)
}

function getSearchResults(){
  var searchedTerm = document.getElementById("searchBar").value
  url = 'http://api.giphy.com/v1/gifs/search?q=' + searchedTerm + '&api_key=' + apiKey
  gifContainer = 'searchResultsContainer'
  serverRequest(url, gifContainer)
  document.getElementById('trendingsContainer').style.display = "none";
  document.getElementById('suggestionsContainer').style.display = "none";
  localStorage.setItem(searchedTerm, JSON.stringify(searchedTerm));
}

function showData(data, gifContainer){
    document.getElementById("searchResultsContainer").innerHTML = "";
    data.data.forEach(function(gif){
    var createdImageToContainGif = document.createElement("IMG")
    createdImageToContainGif.setAttribute('src', gif.images.original.url)
    createdImageToContainGif.setAttribute('class', 'gifStyle')
    document.getElementById(gifContainer).appendChild(createdImageToContainGif)
  })
}


function showData(data, gifContainer){
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
    var contenedorImgBarrita = document.createElement("DIV")
    contenedorImgBarrita.insertBefore(barritaGif, contenedorImgBarrita.firstChild)
    contenedorImgBarrita.appendChild(createdImageToContainGif)
    contenedorImgBarrita.appendChild(buttonVerMas)
    contenedorImgBarrita.appendChild(iconClose)
    contenedorImgBarrita.setAttribute('class', 'contenedorImgBarrita')
    document.getElementById(gifContainer).appendChild(contenedorImgBarrita)
    })
  }