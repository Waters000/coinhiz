// Set all the variables
var geoKey = "AIzaSyAY0aUhmoBFuEw8NhIcYCP9CsR5qj7wA6o";
var btcAtmSearch = document.querySelector("#btc-atm-search");
var city = document.querySelector("#city");
var atmInfoEl = document.querySelector("#atm-info");
var map;
var service;
var infowindow;
var lat = 28.5383832;
var lng = -81.3789269;
var isOpen = false;
var myLocation = document.querySelector("#my-location");
var message = document.querySelector("#message");
var loading = document.querySelector("#loading");

function initMap() {
  loading.style.display = "none";
  var location = new google.maps.LatLng(lat, lng);

  map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 13,
  });

  var request = {
    location: location,
    radius: "500",
    query: "bitcoin ATM",
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

var atmSearchHandler = function (e) {
  e.preventDefault();
  // Clear the previous search
  atmInfoEl.innerHTML = "";
  var cityName = city.value.trim();
  console.log(cityName);
  city.value = "";
};

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  message.textContent = "";
  var crd = pos.coords;
  lat = crd.latitude;
  lng = crd.longitude;
}

function error(err) {
  loading.style.display = "none";
  if (err.message === "Timeout expired") {
    message.textContent = err.message + ", Please try again.";
  } else {
    message.textContent = err.message;
  }
  message.style.color = "red";
}

function geoLocationHandler() {
  loading.style.display = "";
  navigator.geolocation.getCurrentPosition(success, error, options);
}

btcAtmSearch.addEventListener("click", atmSearchHandler);
myLocation.addEventListener("click", geoLocationHandler);
