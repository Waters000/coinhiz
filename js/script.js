// Create DOM elements from IDs and Class 
var hotCryptos = document.querySelector(".hot-cryptos")
var cryptosHere = document.querySelector(".cryptos-here")

// set up variables for functions.
var crypto;

var getCrypto = function (crypto) {
  const settings = {
    async: true,
    crossDomain: true,
    url: "https://api.coinlore.net/api/tickers/?start=200&limit=100",
    method: "GET",
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    console.log(response);

    console.log(response.data[0].csupply);

    for (var i = 0; i < 100; i++) {
      var crytpoName = document.createElement("h2");
      crytpoName.classList = "";
      crytpoName.textContent = "Coin Name: " + response.data[i].name;

      var cryptoSupply = document.createElement("p");
      cryptoSupply.classList = "";
      //    cryptoSupply = response.data[i].csupply;
      cryptoSupply.textContent =
        "Current Mined Supply " + response.data[i].csupply;

    //     for (var i = 0; i < 100; i++){
    //       var cryptoName = document.createElement('h2')
    //       cryptoName.classList = "";
    //       cryptoName.textContent = "Coin Name: " + response.data[i].name;
         
         
    //      var cryptoSupply = document.createElement('p')
    //     cryptoSupply.classList = "";
    //  //    cryptoSupply = response.data[i].csupply;
    //      cryptoSupply.textContent = "Current Mined Supply " + response.data[i].csupply;

      var cryptoTotalSupply = document.createElement("p");
      cryptoTotalSupply.classList = "";

      cryptoTotalSupply.textContent =
        "Total Supply " + response.data[i].msupply;
      //  cryptoTotalSupply = response.data[i].msupply;

      var percentMined = document.createElement("p");
      percentMined.classList = "";
      percentMined.textContent =
        "Percent Mined" + cryptoTotalSupply / cryptoSupply;

      hotCryptos.append(
        crytpoName,
        cryptoSupply,
        cryptoTotalSupply,
        percentMined
      );
    }
  });

  const feed = {
    async: true,
    crossDomain: true,
    url: "https://api.coinlore.net/api/ticker/?id=90",
    method: "GET",
    headers: {},
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
};
var getCoinMrktCap = function() {
    var coinApiKey = '8b2fdf23-c7f8-4ff3-a051-6a6916396f28'
    var coinUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${coinApiKey}&start=1&limit=10&convert=USD`;
    
    fetch(coinUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
        console.log(data.data);
    })
    
}


// start screen by running cityList to show previous storage cities
getCrypto();
