// Create DOM elements from IDs and Class
var hotCryptos = document.querySelector(".hot-cryptos");
var crytposHere = document.querySelector(".cryptos-here");
var tbl = document.querySelector(".table");
var cryptoNews = document.querySelector(".crypto-news");
var topGainers = document.querySelector(".top-gainers");
var modalContent = document.querySelector(".modals");

var modal = document.getElementById("coin-form-modal");
var closeBtn = document.getElementById("closeBtn");
const coinsToSearchTweetsFor = "btc-bitcoin"

// set up variables for functions.
var crypto;
var id;

// Create DOM elements from IDs and Class
var scrollEl = document.querySelector("#media-scroller");
var scrollContainerEl = document.querySelector(".media-scroller-container");
var apiUrl =
  `https://api.coinpaprika.com/v1/coins/${coinsToSearchTweetsFor}/twitter`;

// set up variables for functions.
var crypto;
let myInterval;

var getCrypto = function () {
  const settings = {
    async: true,
    crossDomain: true,
    url: "https://api.coinlore.net/api/tickers/",
    method: "GET",
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    //console.log(response);

    //console.log(response.data[0].csupply)

    for (var i = 0; i < 100; i++) {
      ///div holder to hold everything
      var hotCryptoDivHolder = document.createElement("div");
      hotCryptoDivHolder.classList = "crypto-div";

      // div header holder
      var hotCryptoHeader = document.createElement("div");
      hotCryptoHeader.classList = "flex flex-row ";

      var crytpoName = document.createElement("h2");
      crytpoName.classList = "cryptoheader flex flex-row";
      crytpoName.textContent = response.data[i].name;

      var rank = document.createElement("p");
      rank.classList = "flex flex-row";
      rank.textContent = "Rank: " + response.data[i].rank;

      hotCryptoHeader.append(crytpoName, rank);

      var hotCryptoElementsHolder = document.createElement("div");
      hotCryptoElementsHolder.classList = "flex flex-row";

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
      cryptoButton.classList = "button onclick()";
      cryptoButton.innerText = "Social Stats";
      cryptoButton.setAttribute("onClick", "openModal(event)");

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

    const feed = {
      async: true,
      crossDomain: true,
      url: "https://api.coinlore.net/api/coin/social_stats/?=" + id,
      method: "GET",
      headers: {},
    };

    $.ajax(feed).done(function (response) {
      console.log(response);
      // var cryptoList = response.reddit.avg_active_users
      // console.log(cryptoList)

      for (var i = 0; i < response.length; i++) {
        var cryptoList = id[i].reddit.avg_active_users;
        console.log(cryptoList);
      }
    });
  });

  // const coinRanking = {
  // 	"async": true,
  // 	"crossDomain": true,
  // 	"url": "https://coinranking1.p.rapidapi.com/stats?referenceCurrencyUuid=yhjMzLPhuIDl",
  // 	"method": "GET",
  // 	"headers": {
  // 		"x-rapidapi-host": "coinranking1.p.rapidapi.com",
  // 		"x-rapidapi-key": "ace563b49cmshf51f6b2f277eccfp1bc75djsn9f362115f89a"
  // 	}
  // };

  // $.ajax(coinRanking).done(function (response) {
  // 	console.log(response);
  // });

  // //crypto News 2000/mo
  // const investing = {
  // 	"async": true,
  // 	"crossDomain": true,
  // 	"url": "https://crypto-news15.p.rapidapi.com/news/",
  // 	"method": "GET",
  // 	"headers": {
  // 		"x-rapidapi-host": "crypto-news15.p.rapidapi.com",
  // 		"x-rapidapi-key": "ace563b49cmshf51f6b2f277eccfp1bc75djsn9f362115f89a"
  // 	}
  // };

  // $.ajax(investing).done(function (response) {
  // 	console.log(response);
  // });

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
    console.log(response);

    for (var i = 0; i < 15; i++) {
      var cryptoHeadline = document.createElement("h5");
      cryptoHeadline.classList = "";
      cryptoHeadline.textContent = response[i].description;

      var cryptoImageLink = document.createElement("img");
      cryptoImageLink.src = response[i].tags[0].icon;
      cryptoImageLink.classList = "image-size";
      // console.log(cryptoImageLink)

      var provider = document.createElement("p");
      provider.classList = "";
      provider.textContent = response[i].source;

      cryptoNews.append(cryptoHeadline, provider, cryptoImageLink);

      //console.log(cryptoNews)
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
    //  console.log(response);

    for (var i = 0; i < 10; i++) {
      var topGainer = document.createElement("h3");
      topGainer.classList = "";
      topGainer.textContent = response.result[i].name;

      var priceChange = document.createElement("h7");
      priceChange.classList = "green";
      priceChange.textContent =
        "Price: $" + parseInt(response.result[i].priceChange.price);

      var priceChangePercent = document.createElement("h7");
      priceChangePercent.classList = "green";
      priceChangePercent.textContent =
        "% Gain" +
        parseInt(response.result[i].priceChange.priceChange24h) +
        "%";

      var gainerRank = document.createElement("p");
      gainerRank.classList = "";
      gainerRank.textContent = "  rank: " + response.result[i].rank;

      topGainers.append(topGainer, priceChange, priceChangePercent, gainerRank);
    }
  });
};
// search coin filter
function searchCrypto() {
  var input = document.getElementById("search");
  var divs = document.getElementsByClassName("crypto-div");
  filter = input.value.toUpperCase();
  for (i = 0; i < divs.length; i++) {
    h2 = divs[i].getElementsByTagName("h2")[0];
    console.log(h2);
    txtValue = h2.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      divs[i].style.display = "";
    } else {
      divs[i].style.display = "none";
    }
  }
}

function openModal() {
  console.log(event.id);
  modal.style.display = "block";

  const socials = {
    async: true,
    crossDomain: true,
    url: "https://api.coinlore.net/api/coin/social_stats/?id=80",
    method: "GET",
    headers: {},
  };

  $.ajax(socials).done(function (response) {
    console.log(response);

    var redditSocial = document.createElement("h3");
    redditSocial.classList = "";
    redditSocial.textContent =
      "Redddit Users Avg " + response.reddit.avg_active_users;

    modalContent.append(redditSocial);
    // var cryptoList = response.reddit.avg_active_users
    // console.log(cryptoList)

    // for (var i = 0; i < response.length; i++) {
    //         var cryptoList = id[i].reddit.avg_active_users
  });
}

function closeModal() {
  modal.style.display = "none";
}

// start screen by running cityList to show previous storage cities
getCrypto();

closeBtn.addEventListener("click", closeModal);

const truncateTweetStatus = status => {
  if (status.length > 175) {
    let newStatus = status.substring(0, 175);
    newStatus += "...";

    status = newStatus;
  }

  return status;
}

const redirectToTweetSource = src => {
  window.open(src, '_blank');
}

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
    userImgEl.setAttribute(
      "src",
      twitterRes[i].user_image_link
    );
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
  }, 2500);
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
    console.log(scrollEl.scrollLeft);
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
  fetch(apiUrl)
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          populateMediaScroller(data);
          console.log(data);
        });
      }
  });
}

const tweetClickHandler = event => {
  let targetEl = event.target;

  // TODO: Refactor this, this sucks
  if (targetEl.className === "media-item" || targetEl.className === "username" || targetEl.className === "handle" || targetEl.className === "userImg" || targetEl.className === "tweet-text") {
    if (targetEl.className !== "media-item") {
      targetEl = targetEl.closest(".media-item");
    }
    redirectToTweetSource(targetEl.getAttribute("data-tweet-source"));
  }
}

scrollEl.scrollTo({
  left: -100000,
  behavior: "smooth",
});

scrollIntervalHandler(true, false);

//populateMediaScroller(twitterRes); // Comment this out to test api
getTweets(); // Uncomment this to test api
scrollEl.addEventListener("click", tweetClickHandler);
scrollContainerEl.addEventListener("click", scrollButtonHandler);
