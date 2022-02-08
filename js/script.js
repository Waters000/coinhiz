// Create DOM elements from IDs and Class
var hotCryptos = document.querySelector(".hot-cryptos");
var crytposHere = document.querySelector(".cryptos-here");
var tbl = document.querySelector(".table");
var cryptoNews = document.querySelector(".crypto-news");
var topGainers = document.querySelector(".top-gainers");
var cryptoNameArr = [];
var nomicsApiKey = "e4679446b20fba0d142a141f118e6089f643ab5b";

// set up variables for functions.
var crypto;
var id;
// set up API key as variable...API key can not go in URL string or
// browser will say there is a security issue

var getCrypto = function () {
  const settings = {
    async: true,
    crossDomain: true,
    url: "https://api.coinlore.net/api/tickers/",
    method: "GET",
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    // console.log(response);

    // console.log(response.data[0].csupply)

    for (var i = 0; i < 100; i++) {
      ///div holder to hold everything
      var hotCryptoDivHolder = document.createElement("div");
      hotCryptoDivHolder.classList = "crypto-div";

      // div header holder
      var hotCryptoHeader = document.createElement("div");
      hotCryptoHeader.classList = "row ";

      var crytpoName = document.createElement("h2");
      crytpoName.classList = "cryptoheader row";
      crytpoName.innerHTML = `<a href="#${response.data[i].name}"><span id='${response.data[i].name}'>${response.data[i].name}</span></a>`;

      var rank = document.createElement("p");
      rank.classList = "row";
      rank.textContent = "Rank: " + response.data[i].rank;

      hotCryptoHeader.append(crytpoName, rank);

      var hotCryptoElementsHolder = document.createElement("div");
      hotCryptoElementsHolder.classList = "row";

      var holderOne = document.createElement("div");
      holderOne.classList = "holderone";

      var cryptoId = document.createElement("p");
      cryptoId.classList = "";
      cryptoId.textContent = "ID: " + response.data[i].id;
      var id = response.data[i].id;
      holderOne.append(cryptoId);

      var holderTwo = document.createElement("div");
      holderTwo.classList = "holdertwo";

      var cryptoSupply = document.createElement("p");
      cryptoSupply.classList = "";
      var cryptoSupplyInt;
      cryptoSupplyInt = response.data[i].csupply;
      cryptoSupply.textContent =
        "Current Mined Supply " +
        parseInt(response.data[i].csupply).toLocaleString("en-US");
      // console.log(cryptoSupplyInt)

      holderTwo.append(cryptoSupply);

      var holderThree = document.createElement("div");
      holderThree.classList = "holderThree";

      var cryptoTotalSupply = document.createElement("p");
      var totalSupplyInt;
      cryptoTotalSupply.classList = "";
      totalSupplyInt = response.data[i].msupply;
      cryptoTotalSupply.textContent =
        "Total Supply " +
        parseInt(response.data[i].msupply).toLocaleString("en-US");

      holderThree.append(cryptoTotalSupply);

      //  console.log(totalSupplyInt)

      var holderFour = document.createElement("div");
      holderFour.classList = "holderFour";

      var cryptoPrice = document.createElement("p");
      cryptoPrice.classList = "";
      cryptoPrice.textContent = "Price: " + "$" + response.data[i].price_usd;

      holderFour.append(cryptoPrice);

      var holderFive = document.createElement("div");
      holderFive.classList = "holderFive";

      var percentMined = document.createElement("p");
      percentMined.classList = "";
      percentMined.textContent =
        "Percent Mined: " +
        parseInt((cryptoSupplyInt / totalSupplyInt) * 100) +
        "%";

      holderFive.append(percentMined);

      var holderSix = document.createElement("div");
      holderSix.classList = "holderSix";

      var cryptoButton = document.createElement("button");
      cryptoButton.classList = "button";
      cryptoButton.innerText = "Social Stats";

      holderSix.append(cryptoButton);

      hotCryptoElementsHolder.append(
        holderTwo,
        holderThree,
        holderFour,
        holderFive,
        holderSix
      );

      hotCryptoDivHolder.append(hotCryptoHeader, hotCryptoElementsHolder);
      crytposHere.append(hotCryptoDivHolder);
    }
    filterGraphByName(response);

    const feed = {
      async: true,
      crossDomain: true,
      url: "https://api.coinlore.net/api/coin/social_stats/?=" + id,
      method: "GET",
      headers: {},
    };

    $.ajax(feed).done(function (response) {
      // console.log(response)
      // var cryptoList = response.reddit.avg_active_users
      // console.log(cryptoList)

      for (var i = 0; i < response.length; i++) {
        var cryptoList = id[i].reddit.avg_active_users;
        // console.log(cryptoList)
      }
    });
  });

  const investingNews = {
    async: true,
    crossDomain: true,
    url: "https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news?pair_ID=1057391&page=1&time_utc_offset=28800&lang_ID=1",
    method: "GET",
    headers: {
      "x-rapidapi-host": "investing-cryptocurrency-markets.p.rapidapi.com",
      "x-rapidapi-key": "ace563b49cmshf51f6b2f277eccfp1bc75djsn9f362115f89a",
    },
  };

  $.ajax(investingNews).done(function (response) {
    //  console.log(response)
    for (var i = 0; i < 10; i++) {
      var cryptoHeadline = document.createElement("h5");
      cryptoHeadline.classList = "";
      cryptoHeadline.textContent =
        response.data[0].screen_data.news[i].HEADLINE;

      var cryptoImageLink = document.createElement("img");
      cryptoImageLink.src = response.data[0].screen_data.news[i].related_image;
      // console.log(cryptoImageLink)

      var provider = document.createElement("p");
      provider.classList = "";
      provider.textContent =
        response.data[0].screen_data.news[i].news_provider_name;

      cryptoNews.append(cryptoHeadline, cryptoImageLink, provider);

      //console.log(cryptoNews)
    }

    const gainers = {
      async: true,
      crossDomain: true,
      url: "https://cryptocurrency-markets.p.rapidapi.com/general/gainer",
      method: "GET",
      headers: {
        "x-rapidapi-host": "cryptocurrency-markets.p.rapidapi.com",
        "x-rapidapi-key": "ace563b49cmshf51f6b2f277eccfp1bc75djsn9f362115f89a",
      },
    };

    $.ajax(gainers).done(function (response) {
      // console.log(response);
      for (var i = 0; i < 10; i++) {
        var topGainer = document.createElement("h3");
        topGainer.classList = "";
        topGainer.textContent = response.result[i].name;

        var priceChange = document.createElement("h7");
        priceChange.classList = "green";
        priceChange.textContent =
          "Price: $" + parseInt(response.result[i].priceChange.price);

        var gainerRank = document.createElement("p");
        gainerRank.classList = "";
        gainerRank.textContent = "  rank: " + response.result[i].rank;

        topGainers.append(topGainer, priceChange, gainerRank);
      }
    });
  });
};
// search coin filter
function searchCrypto() {
  var input = document.getElementById("search");
  var divs = document.getElementsByClassName("crypto-div");
  filter = input.value.toUpperCase();
  for (i = 0; i < divs.length; i++) {
    h2 = divs[i].getElementsByTagName("h2")[0];
    // console.log(h2);
    txtValue = h2.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      divs[i].style.display = "";
    } else {
      divs[i].style.display = "none";
    }
  }
}

function filterGraphByName(response) {
  for (var i = 0; i < response.data.length; i++) {
    var namePush = response.data[i].name;
    // console.log(namePush);
    cryptoNameArr.push(namePush);
  }
  // console.log(cryptoNameArr);
  // cryptoName.addEventListener("click", function(e) {
  //   console.log()
  // })
  getTradeHistory();
}

function getTradeHistory() {
  var apiUrl = `https://api.nomics.com/v1?key=${nomicsApiKey}`;
  var encodedUrl = `https://api.allorigins.win/raw?url=encodeURIComponent('${apiUrl}')`;
  // var urlHeader = new Headers(`Access-Control-Allow-Origin: api.nomics.com`);

  fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      "https://api.nomics.com/v1/currencies/ticker?key=97fcaab1eed91e04fd85a3acd9c69b85c0ccfeb4&ids=BTC,ETH,XRP&interval=1d,30d&convert=EUR&platform-currency=ETH&per-page=100&page=1"
    )}`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));

  
  
}

// start screen by running cityList to show previous storage cities
getCrypto();
