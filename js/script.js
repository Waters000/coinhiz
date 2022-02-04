// Create DOM elements from IDs and Class 
var hotCryptos = document.querySelector(".hot-cryptos")
var crytposHere = document.querySelector(".cryptos-here")

// set up variables for functions.
var crypto;

// set up API key as variable...API key can not go in URL string or
// browser will say there is a security issue


var getCrypto = function (crypto){
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.coinlore.net/api/tickers/?start=200&limit=100",
        "method": "GET",
        "headers": {
           
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);

        console.log(response.data[0].csupply)


        for (var i = 0; i < 100; i++){
            
            
            var crytpoName = document.createElement('h2')
             crytpoName.classList = "";
             crytpoName.textContent = "Coin Name: " + response.data[i].name;
            
            
            var cryptoSupply = document.createElement('p')
           cryptoSupply.classList = "";
        //    cryptoSupply = response.data[i].csupply;
            cryptoSupply.textContent = "Current Mined Supply " +  parseInt(response.data[i].csupply).toLocaleString("en-US");

            var cryptoTotalSupply = document.createElement('p')
          cryptoTotalSupply.classList = "";
         
            cryptoTotalSupply.textContent = "Total Supply " +  parseInt(response.data[i].msupply).toLocaleString("en-US");
          //  cryptoTotalSupply = response.data[i].msupply;

          var cryptoPrice = document.createElement('p')
            cryptoPrice.classList = "";
            cryptoPrice.textContent = "Price: " + "$"+response.data[i].price_usd


            var percentMined = document.createElement('p')
            percentMined.classList = "";
            percentMined.textContent = "Percent Mined" + (cryptoTotalSupply /  cryptoSupply);
           
            hotCryptos.append(crytpoName, cryptoPrice, cryptoSupply, cryptoTotalSupply, percentMined)
           
            }

    });

   

    const feed = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.coinlore.net/api/ticker/?id=90",
        "method": "GET",
        "headers": {
           
        }
        
    };


    
    $.ajax(feed).done(function (response) {
        console.log(response);

        // for (var i = 0; i < response.length; i++){
        //     var cryptoList = document.createElement('h2')
        //     cryptoList.classList = "";
        //     cryptoList.textContent = response[i].symbol
        
        //     hotCryptos.append(cryptoList)
           
        //     }

    });





}

/// Start Functions
// Get the weather from city value and add to feed 1.
// var getCrypto = function (city) {
//     // Single day weather info
//     var apiUrl = "https://api.coinlore.net/api/tickers/";

//     fetch(apiUrl).then(function (response) {
//         // request was success
//         if (response.ok) {
//             response.json().then(function (city) {
//                 // console log to test response feed is working
//                   console.log(response)
//                 //when working, run displayWeather function
//                // displayWeather(city);

//             });
//             // if not found, window alert no weather found
//         } else {
//             alert("No Weather found");
//         }
//     })
//         .catch(function (error) {

//         })
// };

// from line 248 - set attribute with event to make button on 
// city list fun the GetWeather function
var cityListButton = function (event) {

    event.preventDefault();
    // console to test click on button
    console.log(event.target.textContent)

    // city value is the event trigger from button
    var city = event.target.textContent;
    cityArr.push(city)
    if (city) {
        getWeather(city);

    } else {
        alert("Please enter a City to search")
    }
};

/// takes city from the form and passes into getWeather function
// var formCityName = function (city) {
//     // create value from form with ID cityName to value city
//     var city = cityName.value.trim()
//     //city = event.target.textContent;
//     cityArr.push(city)
//     if (city) {
//         getWeather(city);
//         //cityName.value = "";
//     } else {
//         alert("Please enter a City to search")
//     }

// }
// Display the Weather function
var displayWeather = function (city) {
    // ammended div set to blank to clear previous city data
    cityWeatherEl.innerHTML = "";
    listGroupEl.innerHTML = "";

    // console.log(city)
    /// adds city under the search list.
    var cityNameList = document.createElement('button')
    cityNameList.classList = " btn btn-dark mb-1 w-100";
    cityNameList.textContent = city.city.name;

    // put recent cities into citylistdiv
    cityListEl.append(cityNameList)

    // push city data from OpenWeather into an array
    cityArr.push(city.city.name)
    // add city data as array into local storage
    localStorage.setItem("city-search", JSON.stringify(cityArr));
    // used cityKey to add new key to each entry..used before setting array
    // cityKey = cityKey + 1;

    // setting up div for large, single day weather
    var currentWeatherDiv = document.createElement('div')
    currentWeatherDiv.classList.add("bg",)
    // image icon holder.
    var iconImage = document.createElement('img')
    // used JQuery here, ended up using DOM and JS
    // $("#image").append(iconImage)
    // iconImage.src = "https://openweathermap.org/img/wn/" + city.list[0].weather[0].icon + "@4x.png";

    // var to hold city name
    var cityName = document.createElement('h2')
    cityName.classList = " flex-row align-left";
    cityName.textContent = city.city.name;
    // var to hold image
    var iconImage = document.createElement('img')
    iconImage.src = "https://openweathermap.org/img/wn/" + city.list[0].weather[0].icon + "@4x.png";
    // var to hold temp
    var temperature = document.createElement('p')
    temperature.textContent = "Temperature: " + parseInt((((city.list[0].main.temp) - 273.15) * (9 / 5)) + 32) + "*F";
    // var to hold humidity
    var humidity = document.createElement('p')
    humidity.textContent = "Humity: " + city.list[0].main.humidity + "%";
    // var to hold wind speed
    var windSpeed = document.createElement('p')
    windSpeed.textContent = "Wind Speed: " + parseInt(city.list[0].wind.speed) + " m/hr";
    // var to hold population
    var population = document.createElement('p')
    population.textContent = "Population: " + (city.city.population).toLocaleString("en-US") + " People";

    // add all element to div - line 110
    currentWeatherDiv.append(cityName, iconImage, temperature, humidity, windSpeed, population)
    // add div to dom Element - from HTML
    cityWeatherEl.append(currentWeatherDiv)


    // need to pull in lat, lon because UV is not on this feed
    // UV is only on feed found by lat, lon
    // var from Openweather api
    var lat = city.city.coord.lat
    var lon = city.city.coord.lon

    // second feed for 5 day weather
    var fiveDayApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    // fetched second api feed
    fetch(fiveDayApi).then(function (response) {
        // request was success
        if (response.ok) {
            response.json().then(function (secondFeed) {
                // adds UV to top part of weather
                // uv div holder
                var uvdiv = document.createElement('div')
                var uvIndex = document.createElement('p')
                // adds UV to div
                uvIndex.textContent = "UV Index: " + parseInt(Math.floor(secondFeed.current.uvi))
                // have to set this a a number value for if statement below
                var uvi = parseInt(Math.floor(secondFeed.current.uvi));

                // add uvIndex to uvDiv
                uvdiv.append(uvIndex)
                // left this a Jquery - adds to div with rest of daily weather
                $("#city-weather").append(uvdiv)
                
                
                // uv scale ranges from 0 to 11 as high, sets class color based on if statement
                if (uvi <= 4) {
                    uvdiv.classList.add("green")
                } else if (uvi > 7) {
                    uvdiv.classList.add("red")
                } else {
                    uvdiv.classList.add("yellow")
                }

                // For loop to run weather for 5 days
                for (var i = 0; i < 5; i++) {
                    // sets the 5 day weather div for each day
                    var divWeather = document.createElement('div')
                    divWeather.classList.add("bg-primary",)
                    // var for 5 day images
                    var fiveDayImage = document.createElement('img')
                    fiveDayImage.src = "https://openweathermap.org/img/wn/" + secondFeed.daily[i].weather[0].icon + "@2x.png";
                    // var for 5 day clouds
                    var clouds = document.createElement('p');
                    clouds.setAttribute("width", "50px", "text-color:orange")
                    clouds.textContent = "clouds: " + secondFeed.daily[i].clouds + "%";
                    clouds.classList.add("temp")
                    // var for 5 day date
                    var date = document.createElement('p')
                    date.setAttribute("width", "50px")
                    date.textContent = moment.unix(secondFeed.daily[i].dt).format("MM/DD/YYYY");
                    date.classList.add("temp")
                    // var for 5 day low temp
                    var fiveDayTempLow = document.createElement('p')
                    fiveDayTempLow.setAttribute("width", "50px")
                    fiveDayTempLow.classList.add("temp")
                    fiveDayTempLow.textContent = "Low Temp: " + parseInt((((secondFeed.daily[i].temp.min) - 273.15) * (9 / 5)) + 32);
                    // var for 5 day high temp
                    var fiveDayTempHigh = document.createElement('p')
                    fiveDayTempHigh.setAttribute("width", "50px")
                    fiveDayTempHigh.classList.add("temp")
                    fiveDayTempHigh.textContent = "High Temp: " + parseInt((((secondFeed.daily[i].temp.max) - 273.15) * (9 / 5)) + 32)
                    // var for 5 day weather descrip
                    var dailyWeather = document.createElement('p');
                    dailyWeather.classList.add("temp")
                    dailyWeather.textContent = secondFeed.daily[i].weather[0].description


                    // adds 5 day elements to div
                    divWeather.append(date, fiveDayImage, dailyWeather, clouds, fiveDayTempLow, fiveDayTempHigh)
                    // add div to DOM attached to HTML.
                    listGroupEl.appendChild(divWeather)

                };

                //  check console log to confirm second feed works
              // console.log(secondFeed)
            });
        } else {
            alert("No Weather found");
        }
    })
        .catch(function (error) {
        })
}

// function for to make list for past city names
var cityListNames = function () {
// pulling city names from local storage into empty array.
    var cityArr = (JSON.parse(localStorage.getItem("city-search")))
    // loops over the array
    for (var i = 0; i < cityArr.length; i++) {
        // var for city name, adds H2 and button class
        var citiesListpast = document.createElement("h2");
        citiesListpast.classList.add("btn", "btn-dark", "mb-1", "w-100")
        citiesListpast.textContent = cityArr[i];

        // console log to test if cities list past is pulling in
        //console.log(citiesListpast)

        // sets attribute for onclick, run event function so buttons load
        citiesListpast.setAttribute("onClick", "cityListButton(event)")

        // added city list with JQuery
        $(".city-list").append(citiesListpast)
    }
}

// start screen by running cityList to show previous storage cities
getCrypto();

// listens for a click on the form, run form City to add name and start functions.
//submitBtnEl.addEventListener('click', formCityName)
