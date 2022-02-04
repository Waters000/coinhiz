// Create DOM elements from IDs and Class
var hotCryptos = document.querySelector(".hot-cryptos");
var crytposHere = document.querySelector(".cryptos-here");
var scrollEl = document.querySelector("#media-scroller");
var scrollContainerEl = document.querySelector(".media-scroller-container");

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

// getCrypto();

scrollEl.scrollTo({
  left: -100000,
  behavior: "smooth"
})

const scrollInterval = () => {
  setInterval(function() {
    scrollEl.scrollTo({
      left: scrollEl.scrollLeft + 250, // Increment scroll
      behavior: "smooth",
    })

    // If at the end of the list, scroll to start
    if (scrollEl.scrollLeft == 0) {
      scrollEl.scrollTo({
        left: -100000, // Dummy value so that it always scrolls back to start
        behavior: "smooth"
      })
    }
  }, 5000);
}

// scrollInterval();

const scrollButtonHandler = event => {
  let targetEl = event.target;

  if (targetEl.className === "left-button-container") {
    console.log("Gotcha");
  } else if (targetEl.className === "right-button-container") {
    console.log("On the right");
  }
}

scrollContainerEl.addEventListener("click", scrollButtonHandler);