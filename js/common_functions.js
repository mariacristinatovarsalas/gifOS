/** BACK TO HOME 
Every element that executes this function with a click allows  
the user to get back to the homepage */
function backToHome() {
  location.replace("home.html")
}


/** REDIRECT TO CREATE GIFS 
Takes the user to the "Crear Guifos" page */
function redirectToCreateGifs() {
  location.replace("./upload.html")
}


/** REDIRECT TO "MIS GUIFOS" 
Takes the user to "Mis Guifos page" */
function redirectToMisGuifos() {
  location.replace("./mis_guifos.html")
}


/** THEMES DROPDOWN */
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


/** THEME SELECTION 
When the website loads, this function access the Local Storage to identify the 
existence of a key 'theme' with a value of 'light' or 'dark'. Depending on the existing value,
it executes a function or another */
var theme = localStorage.getItem('theme')
function themeSelection() {
  if (localStorage.getItem('theme') === 'dark') {
    changeToDarkTheme()
  } else {
    changeToLightTheme()
  }
}
var local =location.href
function changeToDarkTheme() {
  localStorage.setItem('theme', 'dark')
  theme="dark"
  document.getElementById("light").setAttribute("href", "styles/sailor_night.css")
  document.getElementById("logo").setAttribute("src", "images/gifos_logo_dark.png")
  if(!local.includes("/upload.html") && !local.includes("/mis_guifos.html")){
    document.getElementById("downArrow").setAttribute("src", "images/dropdown_dark.png")
    document.getElementById("lens").setAttribute("src", "images/lens_inactive_"+theme+".svg")
  }
  if (local.includes("/mis_guifos.html")) {
    document.getElementById("downArrow").setAttribute("src", "images/dropdown_dark.png")
  }
}

function changeToLightTheme() {
  localStorage.setItem('theme', 'light')
  theme="light"
  document.getElementById("light").setAttribute("href", "styles/sailor_day.css")
  document.getElementById("logo").setAttribute("src", "images/gifos_logo_light.png")
  if(!local.includes("/upload.html") && !local.includes("/mis_guifos.html")){
    document.getElementById("downArrow").setAttribute("src", "images/arrow_dropdown.svg")
    document.getElementById("lens").setAttribute("src", "images/lens_inactive_"+theme+".svg")
  }
}