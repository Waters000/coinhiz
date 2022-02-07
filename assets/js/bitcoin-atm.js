// Set all the variables
var geoKey = "AIzaSyAY0aUhmoBFuEw8NhIcYCP9CsR5qj7wA6o";
var btcAtmSearch = document.querySelector("#btc-atm-search");
var city = document.querySelector("#city");
var atmInfoEl = document.querySelector("#atm-info");
var map;
var service;
var infowindow;
var isOpen = false;
var myLocation = document.querySelector("#my-location");
var message = document.querySelector("#message");
var loading = document.querySelector("#loading");
var latlng = {
  lat: 28.5383832,
  lng: -81.3789269,
};

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
      latlng.lat = data.results[0].geometry.location.lat;
      latlng.lng = data.results[0].geometry.location.lng;
      initMap();
    })
    .catch((error) => console.log("error", error));
}

// Initialize the map
function initMap() {
  loading.style.display = "none";
  var location = new google.maps.LatLng(latlng.lat, latlng.lng);

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
            createElement(result);
          }
        }
      );
    }
  }
}

// Create Atm Info Element
function createElement(p) {
  var photo;
  if (p.photos) {
    photo = p.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 });
  } else {
    photo = "./assets/img/200x200-bitcoin.png";
  }

  var place = {
    name: p.name,
    address: p.formatted_address,
    photo: photo,
    url: p.url,
  };

  var div = document.createElement("div");
  var div2 = document.createElement("div");
  var div3 = document.createElement("div");
  div.classList.add(
    "d-flex",
    "align-items-center",
    "col-11",
    "col-md-10",
    "col-lg-8",
    "col-xl-6",
    "rounded",
    "shadow",
    "mt-4",
    "p-2",
    "border"
  );
  var h2 = document.createElement("h2");
  h2.innerText = place.name;
  var p1 = document.createElement("p");
  p1.innerText = place.address;
  var img = document.createElement("img");
  var a = document.createElement("a");
  if (place.photo) {
    img.setAttribute("src", place.photo);
  }
  a.classList.add("btn", "btn-primary", "btn-block", "mt-2");
  a.setAttribute("href", place.url);
  a.setAttribute("target", "_blank");
  a.textContent = "View on Google Maps";
  img.classList.add("img-fluid", "rounded");
  div2.classList.add("col-3");
  div2.appendChild(img);
  div3.setAttribute("class", "card-body");
  div.appendChild(div2);
  div3.append(h2, p1, a);
  div.appendChild(div3);
  atmInfoEl.appendChild(div);
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
  latlng.lat = crd.latitude;
  latlng.lng = crd.longitude;
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
