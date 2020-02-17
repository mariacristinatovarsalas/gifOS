/** VARIABLES */

const apiKey = 'R6HlZmoZACiHenAqEf5l0jeXFDt2zUDG'

/* Global */
var url
var gifContainer
var suggestedTerm
var searchHistory = []


/** GET SEARCH RESULTS FUNCTION 
Executes the gif search when pressing the search button */

function getSearchResults(term) {
  /* Displays an arrow button that allows the user to go back to the homepage */
  document.getElementById("arrowBackHome").style.display = "block";
  let searchedTerm
  /* Empties the gif container */
  document.getElementById(gifContainer).innerHTML = "";
  /* When the function is executed across the code, the conditional evaluates if there's a parameter
  that's been included, if it is the case, it's going to represent the value of the 
  searchedTerm. */

  if (term) {
    searchedTerm = term
  }
  else {
    searchedTerm = document.getElementById("searchBar").value
    /* If the function is executed with an empty string, it stops the evaluation
    and exits the function */
    if (searchedTerm == "") { return }
    /* The 'some' method evaluates array elements looking for a coincidence with the
    previous set condition. It evaluates the comparison beetween the searchedTerm 
    and the repeatedTerm, if there isn't one, it sets the term in Local Storage. 
    This to avoid repeating the presence of the term in Local Storage. */
    if (!searchHistory.some(function (repeatedTerm) { return repeatedTerm === searchedTerm })) {
      searchHistory.push(searchedTerm)
      localStorage.setItem("searchHistory", searchHistory.join(","))
    }
  }

  /* If search term is different from an empty string, the server request function
    is executed with the following parameters */
  if (searchedTerm !== "") {
    url = 'https://api.giphy.com/v1/gifs/search?q=' + searchedTerm + '&api_key=' + apiKey + '&limit=24'
    gifContainer = 'searchResultsContainer'
    serverRequest(url, gifContainer, true)
    document.getElementById('suggestionsSection').style.display = "none";
    document.getElementById('trendingsSection').style.display = "none";
    document.getElementById('searchResultsContainer').style.display = "flex";


    /* Every term that the user searches for is going to be saved
    in Local Storage. When the search reaches the 5th term, the first
    four terms saved in Local Storage are going to be replaced randomly
    by the most recent searches. The value of the key is changed with
    this random number assigned by the "math.random" function */
    var exitWhile = false
    var i = 1
    while (exitWhile == false) {
      if (localStorage.getItem("gifo" + i) == null) {
        localStorage.setItem("gifo" + i, JSON.stringify(searchedTerm))
        exitWhile = true 
      } else if (i == 4) {
        localStorage.setItem("gifo" + (Math.floor(Math.random() * 4) + 1), JSON.stringify(searchedTerm))
        exitWhile = true
      }
      else {
        i++
      }
    }
  }
  //Clean divSuggestedSearchTerms
  document.getElementById("searchBar").value=""
  displaySuggestedSearchTerms()
}


/** DISPLAY BLUE BUTTONS
Shows searched terms displayed in blue buttons under the search section */

function displayBlueButtons() {
  var blueButtonsContainer = document.getElementById("blueButtonsContainer")
  /* Empties the container to avoid repeating the buttons printing several times */
  blueButtonsContainer.innerHTML = ""
  /* Turns the search history string into an array */
  searchHistory = localStorage.getItem("searchHistory").split(",")
  /* Use reverse method to show the last search at the search suggestions container's top left */
  searchHistory.reverse().forEach(function (previousSearch) {
    /* When there's an iteration of the search history array it prints the terms
    as blue buttons in the screen */
    var blueButton = document.createElement("BUTTON")
    blueButton.setAttribute('class', 'blueButton')
    blueButton.innerHTML = '#' + previousSearch
    blueButton.setAttribute("onclick", "getSearchResults('" + previousSearch + "')");
    blueButtonsContainer.appendChild(blueButton)
  })
}
displayBlueButtons()




/** DISPLAY SUGGESTED SEARCH TERMS
This function displays a div containing search suggestions for the user based on 
previous searchs (dynamic search). It's executed with every "KeyUp" event in the search bar */

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
    /* Changes lens icon and search button style if there's no active search */
    document.getElementById("lens").setAttribute('src', './images/lens_inactive_'+theme+'.svg')
    document.getElementById("searchButton").setAttribute('class', 'searchButton')
  }

  /* If there is content in the search bar the dynamic search div is displayed */
  else {
    /* Changes lens icon and search button style if there's an active search */
    document.getElementById("lens").setAttribute('src', './images/lens_active_'+theme+'.svg')
    document.getElementById("searchButton").setAttribute('class', 'searchButtonDarkActive pinkButtons')
    /* Filters search history array terms assuming as condition the present 
    string in search bar. The "filteredTerms" variable returns and array with 
    the filtered terms (the ones that had a match) */
    var filteredTerms = searchHistory.filter(function (searchTerm) {
      divSearchSuggestions.style.display = "none";
      return searchTerm.includes(searchBar)
    })

    /* It iterates on filter results to print search terms in dynamic search div */
    for (let i = 0; i < 3; i++) {
      /* It assigns as a value for the term variable the position value of the 
      filters terms array */
      var matchTerm = filteredTerms[i]
      /* Evaluates if filtered terms array is empty and if is not the case, it prints 
      the term in the dynamic search div */

      if (matchTerm != undefined) {
        divSearchSuggestions.style.display = "flex";
        matchTermDiv = document.createElement("DIV")
        matchTermDiv.setAttribute("class", "grayButtons")
        matchTermDiv.innerHTML = matchTerm
        matchTermDiv.setAttribute("onclick", "getSearchResults('" + matchTerm + "')")
        divSearchSuggestions.appendChild(matchTermDiv)
      } 
    }
  }

}



/** SHOW SEARCH SUGGESTIONS
Converts the search history located in Local Storage (presented as a string) into an array */
if (localStorage.getItem("searchHistory")) {
  searchHistory = localStorage.getItem("searchHistory").split(",")
}




/** LOAD SUGGESTIONS
It executes when the site loads and the user deletes a suggestion term.
If the user hasn't made any searches, it prints random
gifs in screen to mantain the original page design */

function loadSuggestions() {
document.getElementById("suggestionsContainer").innerHTML=""
  for (let i = 1; i <= 4; i++) {
    let nameSavedGifo = "gifo" + i
    suggestedTerm = localStorage.getItem(nameSavedGifo)
    if (suggestedTerm != null) {
      url = 'https://api.giphy.com/v1/gifs/search?q=' + suggestedTerm + '&api_key=' + apiKey + '&limit=1'
    }
    else {
      url = 'https://api.giphy.com/v1/gifs/random?api_key=' + apiKey
    }
    gifContainer = 'suggestionsContainer'
    serverRequest(url, gifContainer, false, nameSavedGifo);

  }
}



/** LOAD TRENDINGS
It executes when the page loads printing trending gifs in screen */
function loadTrendings() {
  url = 'https://api.giphy.com/v1/gifs/trending?api_key=' + apiKey + '&limit=24'
  gifContainer = 'trendingsContainer'
  serverRequest(url, gifContainer, true)
}




/* NECESSARY FUNCTIONS IN EVERY GIF DISPLAY */

/** SERVER REQUEST*/

function serverRequest(url, gifContainer, classicShowData, nameSavedGifo) {
  const found =
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        showData(data, gifContainer, classicShowData, nameSavedGifo)
        return data
      })
      .catch(function (error) {
        return error
      })
  return found
}






/** SHOW DATA FUNCTION 
Prints every gif in screen */

/* Parameters: 1) data: every gif data provided by the server
               2) gifContainer: div that should contain the specific gifs
               3) classicShowData: it's a reference for all the non suggestions gifs
               4) nameSavedGifo: specific reference about every suggestion gif present in 
                  Local Storage. */

function showData(data, gifContainer, classicShowData, nameSavedGifo) {

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
    createdImageToContainGif.setAttribute('onclick',"openInGhipy('" + gif.images.original.url + "')")
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
      createdImageToContainGif.setAttribute('class', 'suggestionGif')

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
      suggestionGifBar.setAttribute('class', 'suggestionGifBar titleBars')
      suggestionGifBar.innerHTML = '#' + gifName

      /* Suggestion gif "Ver más" button */

      var buttonVerMas = document.createElement("BUTTON")
      buttonVerMas.setAttribute('class', 'blueButton buttonVerMas')
      buttonVerMas.innerHTML = "Ver más...";
      buttonVerMas.setAttribute('onclick', 'getSearchResults("' + gif.title + '")')

      /* Suggestion gif close button attributes */

      var closeButton = document.createElement("BUTTON")
      closeButton.setAttribute('class', 'closeButton')
      closeButton.setAttribute('onclick', "removeSuggestionGif('" + nameSavedGifo +"')")
  
    
      /* Dynamic elements of each suggestion gif */

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

/** REMOVE SUGGESTION GIF */
function removeSuggestionGif(deletedSuggestionGif) {
  localStorage.removeItem(deletedSuggestionGif);
  loadSuggestions()
}

/** OPEN IN GHIPY */
function openInGhipy(link) {
  window.open(link);
}

document.getElementById("searchBar").addEventListener("keypress",function(e){if(e.which ==13){getSearchResults()}})