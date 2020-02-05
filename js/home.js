
/* GLOBAL VARIABLES*/

const apiKey = 'R6HlZmoZACiHenAqEf5l0jeXFDt2zUDG'
var url
var gifContainer
var suggestedTerm
var historial = []



/* BACK TO HOME */

/* Whatever element that executes this function with a click allows you to get back to the homepage */

function backToHome() {
  location.replace("home.html")
}



/* REDIRECT TO CREATE GIFS*/

/* Takes you to the create gifs page */

function redirectToCreateGifs() {
  location.replace("./upload.html")
}



/* REDIRECT TO "MIS GUIFOS" */

/* Takes you to the page where the created gifs are saved */

function redirectToMisGuifos() {
  location.replace("./mis_guifos.html")
}




/*THEMES DROPDOWN*/

function dropdown() {
  document.getElementById("dropdownContent").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches('.pinkButtons')) {
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




/* THEME SELECTION */

/* When the website loads, this function access the Local Storage to identify the existence of a key 'theme' with a value of 'light' or 'dark'.
Depending on the existing value, it executes a function or another */

function themeSelection() {
  if (localStorage.getItem('theme') === 'dark') {
    changeToDarkTheme()
  } else {
    changeToLightTheme()
  }
}

function changeToDarkTheme() {
  localStorage.setItem('theme', 'dark')
  document.getElementById("light").setAttribute("href", "styles/sailor_night.css")
  document.getElementById("logo").setAttribute("src", "images/gifos_logo_dark.png")
  document.getElementById("lupa").setAttribute("src", "images/lupa_inactive_dark.svg")
}

function changeToLightTheme() {
  localStorage.setItem('theme', 'light')
  document.getElementById("light").setAttribute("href", "styles/sailor_day.css")
  document.getElementById("logo").setAttribute("src", "images/gifos_logo_light.png")
  document.getElementById("lupa").setAttribute("src", "images/lupa_inactive_light.svg")
}





/* GET SEARCH RESULTS FUNCTION */

/* Executes the gif search when pressing the search button */

function getSearchResults(Term) {
console.log(Term)
  let searchedTerm
  document.getElementById(gifContainer).innerHTML = "";

  if (Term) {
  
    searchedTerm = Term
  }
  else {
    searchedTerm = document.getElementById("searchBar").value
    if (searchedTerm == "") { return }
    historial.push(searchedTerm)
    localStorage.setItem("historial", historial.join(","))
  }

  if (searchedTerm !== "") {

    url = 'http://api.giphy.com/v1/gifs/search?q=' + searchedTerm + '&api_key=' + apiKey + '&limit=24'
    gifContainer = 'searchResultsContainer'
    serverRequest(url, gifContainer, true)
    document.getElementById('suggestionsSection').style.display = "none";
    document.getElementById('trendingsSection').style.display = "none";
    document.getElementById('searchResultsContainer').style.display = "flex";

    var presentGifInLocalStorage = false
    var i = 1
    while (presentGifInLocalStorage == false) {
      if (localStorage.getItem("gifo" + i) == null) {
        localStorage.setItem("gifo" + i, JSON.stringify(searchedTerm))
        presentGifInLocalStorage = true
      } else if (i == 4) {
        localStorage.setItem("gifo" + (Math.floor(Math.random() * 4) + 1), JSON.stringify(searchedTerm))
        presentGifInLocalStorage = true
      }
      else {
        i++
      }
    }
  }
}


/* DISPLAY BLUE BUTTONS */

/* Show searched terms displayed in blue buttons under the search section */

function displayBlueButtons() {
  console.log(historial)
  var blueButtonsContainer = document.getElementById("blueButtonsContainer")
  blueButtonsContainer.innerHTML = ""
  historial = localStorage.getItem("historial").split(",")
  console.log(historial)
  historial.reverse().forEach(busquedaVieja => {

    var blueButton = document.createElement("BUTTON")
    blueButton.setAttribute('class', 'blueButton')
    blueButton.innerHTML = '#' + busquedaVieja
    blueButton.setAttribute("onclick", "getSearchResults('" + busquedaVieja + "')");
    blueButtonsContainer.appendChild(blueButton)

  })

}
displayBlueButtons()




/* DISPLAY SUGGESTED SEARCH TERMS */
 
/* This function displays a div containing search suggestions for the user based on previous searchs (dynamic search). 
It's executed with every "KeyUp" event in the search bar */

function displaySuggestedSearchTerms() {
  /* Identifies the current value of the search bar after every "KeyUp" event */
  var searchBar = document.getElementById("searchBar").value;

  /* Identifies div that contains dynamic searchs */
  var divSearchSuggestions = document.getElementById("divSearchSuggestions")

  /* Refreshes div content for every "KeyUp" event */
  divSearchSuggestions.innerHTML = ""

  /* Evaluates if search bar is empty to hide dynamic search div */
  if (searchBar == "") {
    divSearchSuggestions.style.display = "none";
    /* Changes lens icon style if there's no active search */
    document.getElementById("lupa").setAttribute('src', './images/lupa_inactive_light.svg')
  }
  /* If there is content in the search bar displays dynamic search div */  
  else {
    divSearchSuggestions.style.display = "flex";
    /* Changes lens icon style if theres an active search */
    document.getElementById("lupa").setAttribute('src', './images/lupa_active_light.svg')

    /* Filters search history terms array if the current search term
    contains the character combination present in the dynamic search bar. 
    The "filteredTerms" variable returns and array with the filtered terms
    (the ones that had a match) */

    //filtra el array del historial de terminos a partir de si algunos de los terminos 
    //contiene la combinacion de caracteres que e encuentra en la barra de busqueda dinamica
    // la var "filteredTerms" te devuele un array con los terminos "filtrados" es decir los que tuvieron 
    // coincidencia 

    var filteredTerms = historial.filter(function(searchTerm){
      return searchTerm.includes(searchBar)
      })
      //Itera sobre el resultado del firtrado para dibujar las busquedas en
      // el div de busquedas dinamicas
    for (let i = 0; i < 3; i++) {
      // deposita el valor de la posicion de filtrados en termino
      var termino = filteredTerms[i]
//Evalua si esta vacio, en caso contrario dibuja el termino en el div de busquedadinamica 
      if (termino != undefined) {
        dibujoFiltrado = document.createElement("DIV")
        dibujoFiltrado.setAttribute("class", "grayButtons")
        dibujoFiltrado.innerHTML = termino
        dibujoFiltrado.setAttribute("onclick", "getSearchResults('" + termino + "')")
        divSearchSuggestions.appendChild(dibujoFiltrado)
      }
    }
  }

}



/* SHOW SEARCH SUGGESTIONS */

/* Converts the search history located in Local Storage (presented as a string) to an array */

if (localStorage.getItem("historial")) {
  historial = localStorage.getItem("historial").split(",")
}










/*SUGGESTIONS*/

function loadSuggestions() {

  for (let i = 1; i <= 4; i++) {
    suggestedTerm = localStorage.getItem("gifo" + i)
    if (suggestedTerm != null) {
      url = 'http://api.giphy.com/v1/gifs/search?q=' + suggestedTerm + '&api_key=' + apiKey + '&limit=1'
    }
    else {
      url = 'http://api.giphy.com/v1/gifs/random?api_key=' + apiKey
    }
    gifContainer = 'suggestionsContainer'
    serverRequest(url, gifContainer, false, suggestedTerm);

  }
}



/*TRENDINGS*/

function loadTrendings() {
  url = 'http://api.giphy.com/v1/gifs/trending?api_key=' + apiKey + '&limit=24'
  gifContainer = 'trendingsContainer'
  serverRequest(url, gifContainer, true)
}





/* NECESSARY FUNCTIONS IN EVERY GIF DISPLAY */

/*SERVER REQUEST*/

function serverRequest(url, gifContainer, classicShowData, Term, smallTrendingContainer) {
  const found =
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        showData(data, gifContainer, classicShowData, Term, smallTrendingContainer)
        return data
      })
      .catch(function (error) {
        return error
      })
  return found
}






/* SHOW DATA FUNCTION */

/* Prints every gif in screen ("classic" it's a reference for all the non suggestions gif) */

function showData(data, gifContainer, classicShowData) {

  /* Identifies if the data is an object array or a single object 
  (to decide if there's need to iterate or not the painting gif function) */

  if (Array.isArray(data.data)) {
    data.data.forEach(function (gif) { printGif(gif) })
  } else {
    printGif(data.data)
  }

  /* Prints gif in screen */

  function printGif(gif) {

    /* All gifs shared characteristics */

    var createdImageToContainGif = document.createElement("IMG")
    createdImageToContainGif.setAttribute('src', gif.images.original.url)
    var trendingGifContainer = document.createElement("DIV")
    trendingGifContainer.appendChild(createdImageToContainGif)

    /* Evaluates if the gif is "classic" and sets its own attributes 
    ("classic" refers to every gif printed in the site except for the suggestion gifs) */
  

    if (classicShowData === true) {
      createdImageToContainGif.setAttribute('class', 'trendingGifs')

      /* Evaluates the gif size provided by the server to set attributes to print 
      in screen for a friendlier display */

      if (gif.images.original.width > 500) {
        trendingGifContainer.setAttribute('class', 'trendingGifContainerBig')
      } else {
        trendingGifContainer.setAttribute('class', 'trendingGifContainerSmall')
      }

      /* For classic gif */

      document.getElementById(gifContainer).appendChild(trendingGifContainer)

      /* If the gif's not classic it prints as a suggestion gif and its own attributes 
      are setted */

    } else {
      createdImageToContainGif.setAttribute('class', 'gifStyle')

      /* Suggestion gifs title attributes */
    
      var gifTitle = gif.title;
      var gifTitleArray = gifTitle.split(" ")
      var gifTitleArrayUpperCase = gifTitleArray.map(function (title) {
        return title[0].toUpperCase() + title.slice(1, title.length)
      })
      var gifTitleString = gifTitleArrayUpperCase.join(" ")
      var gifName = gifTitleString.replace(" ", "").replace("GIF", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "")
        .replace(" ", "").replace(" ", "");


      /* Suggestion gif little up bar attributes */

      var suggestionGifBar = document.createElement("DIV")
      suggestionGifBar.setAttribute('class', 'barrita')
      suggestionGifBar.innerHTML = '#' + gifName

      /* Suggestion gif "Ver más" button */

      var buttonVerMas = document.createElement("BUTTON")
      buttonVerMas.setAttribute('class', 'blueButton buttonVerMas')
      buttonVerMas.innerHTML = "Ver más...";
      buttonVerMas.setAttribute('onclick', 'getSearchResults("' + gif.title + '")')

      /* Suggestion gif close button attributes */

      var closeButton = document.createElement("BUTTON")
      closeButton.setAttribute('class', 'closeButton')
      closeButton.onclick = function removeSuggestionGif() {
        localStorage.removeItem("gifo" + i, suggestedTerm);
      }

      /* Dymanic elements of each suggestion gif */ 

      var suggestionGifContainer = document.createElement("DIV")
      suggestionGifContainer.insertBefore(suggestionGifBar, suggestionGifContainer.firstChild)
      suggestionGifContainer.appendChild(createdImageToContainGif)
      suggestionGifContainer.appendChild(buttonVerMas)
      suggestionGifContainer.appendChild(closeButton)
      suggestionGifContainer.setAttribute('class', 'suggestionGifContainer')
      document.getElementById(gifContainer).appendChild(suggestionGifContainer)
    }
  }
}