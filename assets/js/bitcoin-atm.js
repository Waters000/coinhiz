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

// Get coordinates from city
function getGeo(city) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${geoKey}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      // Set the latitude and longitude for the global variables
      lat = data.results[0].geometry.location.lat;
      lng = data.results[0].geometry.location.lng;
      initMap();
    })
    .catch((error) => console.log("error", error));
}

// Initialize the map
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

// Callback function for the text search
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    atmInfoEl.innerHTML = "";
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      service.getDetails(
        {
          placeId: place.place_id,
        },
        function (result, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            createMarker(result);
          }
        }
      );
    }
  }
}

// Set marker on the map
function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;
    const iconBase = "./assets/img/location.png";
    var contentString = `<h1 class="map-h1">${place.name}</h1> <p>${place.formatted_address}</p>`;
  
    var infoWindow = new google.maps.InfoWindow({
      content: contentString,
    });
  
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      title: place.name,
      icon: iconBase,
    });
  
    google.maps.event.addListener(marker, "click", function (event) {
      if (!marker.open) {
        infoWindow.open(map, marker);
        marker.open = true;
      } else {
        infoWindow.close();
        marker.open = false;
      }
      google.maps.event.addListener(map, "click", function () {
        infoWindow.close();
        marker.open = false;
      });
    });
  }

// ATM Search Handler
var atmSearchHandler = function (e) {
  e.preventDefault();
  // Clear the previous search
  atmInfoEl.innerHTML = "";
  var cityName = city.value.trim();
  getGeo(cityName);
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
  initMap();
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

// Get the user current location
function geoLocationHandler() {
  loading.style.display = "";
  navigator.geolocation.getCurrentPosition(success, error, options);
}

btcAtmSearch.addEventListener("click", atmSearchHandler);
myLocation.addEventListener("click", geoLocationHandler);
