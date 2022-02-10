// Create DOM elements from IDs and Class
var hotCryptos = document.querySelector(".hot-cryptos");
var crytposHere = document.querySelector(".cryptos-here");
var tbl = document.querySelector(".table");
var cryptoNews = document.querySelector(".crypto-news");
var topGainers = document.querySelector(".top-gainers");
var modalContent = document.querySelector(".modals");

var storeCryptoArray = [];

var modal = document.getElementById("myModal");
var closeBtn = document.getElementById("closeBtn");
const coinsToSearchTweetsFor = "btc-bitcoin";
var cryptoList = [];
// set up variables for functions.
var crypto;
var id;

// Create DOM elements from IDs and Class
var scrollEl = document.querySelector("#media-scroller");
var scrollContainerEl = document.querySelector(".media-scroller-container");
var apiUrl = `https://api.coinpaprika.com/v1/coins/${coinsToSearchTweetsFor}/twitter`;

// set up variables for functions.
var crypto;
let myInterval;

function createCryptoEl(response) {
  ///div holder to hold everything
  var hotCryptoDivHolder = document.createElement("div");
  hotCryptoDivHolder.classList = "crypto-div";

  // div header holder
  var hotCryptoHeader = document.createElement("div");
  hotCryptoHeader.classList = "rank-class-header flex flex-row";

  var cryptoFave = document.createElement("button");
  cryptoFave.classList = "fa fa-star text-3xl mx-2";
  cryptoFave.setAttribute("id", `${response.name}`);
  cryptoFave.addEventListener("click", function () {
    this.classList.toggle("text-yellow-500");
  });
  if (isCryptoExists(response.name)) {
    cryptoFave.classList.add("text-yellow-500");
  }
  cryptoFave.addEventListener("click", storeCrypto);

  var crytpoName = document.createElement("h2");
  crytpoName.classList = "cryptoheader flex flex-row";
  crytpoName.textContent = response.name;

  var rank = document.createElement("p");
  rank.classList = "rank-class ";
  rank.textContent = "Rank: " + response.rank;

  hotCryptoHeader.append(cryptoFave, crytpoName, rank);

  var hotCryptoElementsHolder = document.createElement("div");
  hotCryptoElementsHolder.classList = "flex flex-row";

  var holderOne = document.createElement("div");
  holderOne.classList = "holderone";

  var cryptoId = document.createElement("p");
  cryptoId.classList = "";
  cryptoId.textContent = "ID: " + response.id;
  var id = response.id;
  holderOne.append(cryptoId);

  var holderTwo = document.createElement("div");
  holderTwo.classList = "holdertwo";

  var cryptoSupply = document.createElement("p");
  cryptoSupply.classList = "";
  var cryptoSupplyInt;
  cryptoSupplyInt = response.csupply;
  cryptoSupply.textContent =
    "Current Mined Supply " +
    parseInt(response.csupply).toLocaleString("en-US");

  holderTwo.append(cryptoSupply);

  var holderThree = document.createElement("div");
  holderThree.classList = "holderThree";

  var cryptoTotalSupply = document.createElement("p");
  var totalSupplyInt;
  cryptoTotalSupply.classList = "";
  totalSupplyInt = response.msupply;
  cryptoTotalSupply.textContent =
    "Total Supply " + parseInt(response.msupply).toLocaleString("en-US");

  holderThree.append(cryptoTotalSupply);

  var holderFour = document.createElement("div");
  holderFour.classList = "holderFour";

  var cryptoPrice = document.createElement("p");
  cryptoPrice.classList = "";
  cryptoPrice.textContent = "Price: " + "$" + response.price_usd;

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
  cryptoButton.innerText = "Price History Chart";
  cryptoButton.classList = "button-chart";
  cryptoButton.setAttribute("symbol", response.symbol);
  cryptoButton.addEventListener("click", modalHandler);
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

var getCrypto = function () {
  const settings = {
    async: true,
    crossDomain: true,
    url: "https://api.coinlore.net/api/tickers/",
    method: "GET",
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    var cryptoObj = {
      data: response.data,
    };
    cryptoList = cryptoObj;
    for (var i = 0; i < 100; i++) {
      // var cryptoObj = {
      //   name: response[i].name,
      //   symbol: response[i].symbol,
      // };
      if (
        window.location.pathname === "/" ||
        window.location.pathname === "/index.html" ||
        window.location.pathname === "/coinhiz/" ||
        window.location.pathname === "/coinhiz/index.html"
      ) {
        createCryptoEl(response.data[i]);
      }
    }
  });

  var createTopGainerEl = function (response) {
    var cryptoHeadline = document.createElement("h5");
    cryptoHeadline.classList = "";
    cryptoHeadline.textContent = response.description;

    var cryptoImageLink = document.createElement("img");
    cryptoImageLink.src = response.tags[0].icon;
    cryptoImageLink.classList = "image-size";

    var provider = document.createElement("p");
    provider.classList = "";
    provider.textContent = response.source;

    cryptoNews.append(cryptoHeadline, provider, cryptoImageLink);
  };

  const cryptoPulse = {
    async: true,
    crossDomain: true,
    url: "https://crypto-pulse.p.rapidapi.com/news",
    method: "GET",
    headers: {
      "x-rapidapi-host": "crypto-pulse.p.rapidapi.com",
      "x-rapidapi-key": "ace563b49cmshf51f6b2f277eccfp1bc75djsn9f362115f89a",
    },
  };

  $.ajax(cryptoPulse).done(function (response) {
    for (var i = 0; i < 25; i++) {
      if (
        window.location.pathname === "/" ||
        window.location.pathname === "/index.html" ||
        window.location.pathname === "/coinhiz/" ||
        window.location.pathname === "/coinhiz/index.html"
      ) {
        createTopGainerEl(response[i]);
      }
    }
  });

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
    for (var i = 0; i < 10; i++) {
      if (
        window.location.pathname === "/" ||
        window.location.pathname === "/index.html" ||
        window.location.pathname === "/coinhiz/" ||
        window.location.pathname === "/coinhiz/index.html"
      ) {
        var topGainer = document.createElement("h3");
        topGainer.classList = "";
        topGainer.textContent = response.result[i].name;

        var priceChange = document.createElement("h7");
        priceChange.classList = "green";
        priceChange.textContent =
          "Price: $" + parseInt(response.result[i].priceChange.price);

        var priceChangePercent = document.createElement("h6");
        priceChangePercent.classList = "green";
        priceChangePercent.textContent =
          "Gain: " +
          parseInt(response.result[i].priceChange.priceChange24h) +
          "%";

        var gainerRank = document.createElement("p");
        gainerRank.classList = "";
        gainerRank.textContent = "Rank: " + response.result[i].rank;

        var topCoins = document.createElement("div");
        topCoins.classList = "top-coins";

        topCoins.append(topGainer, priceChange, priceChangePercent, gainerRank);
        topGainers.append(topCoins);
      }
    }
  });
};

function searchCrypto() {
  var input = document.getElementById("search");
  var divs = document.getElementsByClassName("crypto-div");
  filter = input.value.toUpperCase();
  for (i = 0; i < divs.length; i++) {
    h2 = divs[i].getElementsByTagName("h2")[0];
    txtValue = h2.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      divs[i].style.display = "";
    } else {
      divs[i].style.display = "none";
    }
  }
}

function saveCrypto() {
  localStorage.setItem("fav", JSON.stringify(storeCryptoArray));
}

function storeCrypto(e) {
  e.preventDefault();
  var id = e.target.getAttribute("id");
  const cryptoObject = {
    id: id,
  };
  if (storeCryptoArray.length) {
    for (var i = 0; i < storeCryptoArray.length; i++) {
      if (storeCryptoArray[i].id === id) {
        storeCryptoArray.splice(i, 1);
        saveCrypto();
        return;
      }
    }
  }
  storeCryptoArray.push(cryptoObject);
  saveCrypto();
}

function onLoad() {
  var fav = JSON.parse(localStorage.getItem("fav"));
  if (!fav) {
    storeCryptoArray = [];
  } else {
    storeCryptoArray = fav;
  }
}
onLoad();

function isCryptoExists(symbol) {
  for (var i = 0; i < storeCryptoArray.length; i++) {
    if (storeCryptoArray[i].id === symbol) {
      return true;
    }
  }
  return false;
}

function resetModal() {
  modal.innerHTML = "";
  var modalContent = document.createElement("div");
  var span = document.createElement("span");
  var symbol = document.createElement("div");
  var asset = document.createElement("div");
  var title = document.createElement("div");
  var h1 = document.createElement("h1");
  var h2 = document.createElement("h2");
  var details = document.createElement("div");
  var canvas = document.createElement("canvas");
  var card = document.createElement("div");
  card.classList = "cards";
  modalContent.classList = "modal-content";
  span.classList = "close";
  symbol.classList = "symbol";
  asset.classList = "asset-info";
  title.classList = "title";
  details.classList = "details";
  h2.classList = "asset-price";
  h2.setAttribute("id", "Price");
  canvas.setAttribute("id", "chart");
  span.innerHTML = "&times;";
  title.append(h1);
  details.append(h2);
  asset.append(title, details);
  symbol.append(asset, canvas);
  card.append(symbol);
  modalContent.append(card, span);
  modal.append(modalContent);
}

function getChart(symbol) {
  var url = `https://min-api.cryptocompare.com/data/v2/histominute?fsym=${symbol}&tsym=USD&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      var h1 = document.querySelector(".title h1");
      h1.textContent = symbol;
      const data = json.Data.Data;
      const times = data.map((obj) => obj.time);
      const prices = data.map((obj) => obj.high);
      let currentPrice = prices[prices.length - 1].toFixed(2);
      document.querySelector("#Price").textContent = "$" + currentPrice;
      var chart = document.getElementById("chart").getContext("2d");
      var gradient = chart.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(247,147,26,.5)");
      gradient.addColorStop(0.425, "rgba(253, 70, 70, 0.15)");

      Chart.defaults.global.defaultFontFamily = "Red Hat Text";
      Chart.defaults.global.defaultFontSize = 12;
      createChart = new Chart(chart, {
        type: "line",
        data: {
          labels: times,
          datasets: [
            {
              label: "$",
              data: prices,
              backgroundColor: gradient,
              borderColor: "rgba(253, 70, 70, 0.15)",
              borderJoinStyle: "round",
              borderCapStyle: "round",
              borderWidth: 3,
              pointRadius: 0,
              pointHitRadius: 10,
              lineTension: 0.2,
            },
          ],
        },

        options: {
          title: {
            display: false,
            text: "Heckin Chart!",
            fontSize: 35,
          },

          legend: {
            display: false,
          },

          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },

          // removes the grid lines
          scales: {
            xAxes: [
              {
                display: false,
                gridLines: {},
              },
            ],
            yAxes: [
              {
                display: false,
                gridLines: {},
              },
            ],
          },

          tooltips: {
            callbacks: {
              //This removes the tooltip title
              title: function () {},
            },
            //this removes legend color
            displayColors: false,
            yPadding: 10,
            xPadding: 10,
            position: "nearest",
            caretSize: 10,
            backgroundColor: "rgba(255,255,255,.9)",
            bodyFontSize: 15,
            bodyFontColor: "#303030",
          },
        },
      });
    });
}

function modalHandler() {
  modal.style.display = "block";
  var symbol = this.getAttribute("symbol");
  getChart(symbol);
}

// Get the modal
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");
// When the user clicks on <span> (x), close the modal

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    resetModal();
    modal.style.display = "none";
  }
  for (i = 0; i < span.length; i++) {
    span[i].onclick = function () {
      resetModal();
      modal.style.display = "none";
    };
  }
};

// start screen by running cityList to show previous storage cities
getCrypto();

if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html" ||
  window.location.pathname === "/coinhiz/" ||
  window.location.pathname === "/coinhiz/index.html"
) {
  const truncateTweetStatus = (status) => {
    if (status.length > 175) {
      let newStatus = status.substring(0, 175);
      newStatus += "...";

      status = newStatus;
    }

    return status;
  };

  const redirectToTweetSource = (src) => {
    window.open(src, "_blank");
  };

  const populateMediaScroller = (twitterRes) => {
    for (let i = 0; i < twitterRes.length; i++) {
      let mediaItemEl = document.createElement("div");
      mediaItemEl.setAttribute("data-tweet-source", twitterRes[i].status_link);
      // mediaItemEl.setAttribute("onclick", "test(mediaItemEl.getAttribute('data-tweet-source))");
      mediaItemEl.className = "media-item";

      let userInfoEl = document.createElement("div");
      userInfoEl.className = "user-info";

      let userImgEl = document.createElement("img");
      userImgEl.className = "userImg";
      userImgEl.setAttribute("src", twitterRes[i].user_image_link);
      userInfoEl.append(userImgEl);

      let textContainerEl = document.createElement("div");
      textContainerEl.className = "text-container";

      let usernameEl = document.createElement("p");
      usernameEl.className = "username";
      usernameEl.innerHTML = twitterRes[i].user_name;
      textContainerEl.append(usernameEl);

      let handleEl = document.createElement("p");
      handleEl.className = "handle";
      handleEl.innerHTML = "@" + twitterRes[i].user_name;
      // textContainerEl.append(handleEl);

      userInfoEl.append(textContainerEl);
      mediaItemEl.append(userInfoEl);

      let tweetContentEl = document.createElement("div");
      tweetContentEl.className = "tweet-content";

      let tweetTextEl = document.createElement("p");
      tweetTextEl.className = "tweet-text";
      tweetTextEl.innerHTML = truncateTweetStatus(twitterRes[i].status);
      tweetContentEl.append(tweetTextEl);

      mediaItemEl.append(tweetContentEl);

      scrollEl.append(mediaItemEl);
    }
  };

  // START MEDIA SCROLLER LOGIC
  const startScroll = () => {
    myInterval = setInterval(function () {
      // If at the end of the list, scroll to start
      if (scrollEl.scrollLeft >= -10) {
        scrollEl.scrollTo({
          left: -100000, // Dummy value so that it always scrolls back to start
          behavior: "smooth",
        });
      } else {
        scrollEl.scrollTo({
          left: scrollEl.scrollLeft + 250, // Increment scroll
          behavior: "smooth",
        });
      }
    }, 5000);
  };

  const scrollIntervalHandler = (start, pause) => {
    if (start) {
      startScroll();
    } else if (pause) {
      clearInterval(myInterval);
      startScroll();
    }
  };

  const scrollButtonHandler = (event) => {
    let targetEl = event.target;

    if (
      targetEl.className === "left-button-container" ||
      targetEl.className === "left-arrow"
    ) {
      scrollIntervalHandler(false, true);
      scrollEl.scrollTo({
        left: scrollEl.scrollLeft - 250,
        behavior: "smooth",
      });
    } else if (
      targetEl.className === "right-button-container" ||
      targetEl.className === "right-arrow"
    ) {
      scrollIntervalHandler(false, true); // Restart timer
      if (scrollEl.scrollLeft >= -10) {
        scrollEl.scrollTo({
          left: -100000,
          behavior: "smooth",
        });
      } else {
        scrollEl.scrollTo({
          left: scrollEl.scrollLeft + 250,
          behavior: "smooth",
        });
      }
    }
  };
  // END MEDIA SCROLLER LOGIC

  async function getTweets() {
    fetch(apiUrl).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          populateMediaScroller(data);
        });
      }
    });
  }

  const tweetClickHandler = (event) => {
    let targetEl = event.target;

    // TODO: Refactor this, this sucks
    if (
      targetEl.className === "media-item" ||
      targetEl.className === "username" ||
      targetEl.className === "handle" ||
      targetEl.className === "userImg" ||
      targetEl.className === "tweet-text"
    ) {
      if (targetEl.className !== "media-item") {
        targetEl = targetEl.closest(".media-item");
      }
      redirectToTweetSource(targetEl.getAttribute("data-tweet-source"));
    }
  };

  scrollEl.scrollTo({
    left: -100000,
    behavior: "smooth",
  });

  scrollIntervalHandler(true, false);

  //populateMediaScroller(twitterRes); // Comment this out to test api
  getTweets(); // Uncomment this to test api
  scrollEl.addEventListener("click", tweetClickHandler);
  scrollContainerEl.addEventListener("click", scrollButtonHandler);

  function genCryptoNameArr(response) {
    for (var i = 0; i < response.data.length; i++) {
      var namePush = response.data[i].name;
      cryptoNameArr.push(namePush);
    }
  }
}
