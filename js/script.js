// Create DOM elements from IDs and Class
var hotCryptos = document.querySelector(".hot-cryptos");
var crytposHere = document.querySelector(".cryptos-here");
var tbl = document.querySelector(".table");
var cryptoNews = document.querySelector(".crypto-news");
var topGainers = document.querySelector(".top-gainers");
var modalContent = document.querySelector(".modals");

var modal = document.getElementById("myModal");
var closeBtn = document.getElementById("closeBtn");

// set up variables for functions.
var crypto;
var id;
// set up API key as variable...API key can not go in URL string or
// browser will say there is a security issue

// Create DOM elements from IDs and Class
var scrollEl = document.querySelector("#media-scroller");
var scrollContainerEl = document.querySelector(".media-scroller-container");
var apiUrl =
  "https://api.twitter.com/1.1/search/tweets.json?q=%23crypto&src=typed_query";
var apiBearerToken =
  "AAAAAAAAAAAAAAAAAAAAALljYwEAAAAASl%2BKPo2KBcpLkazky1jIgCG%2FzeY%3DEZJ4YlPiXm8KisMDSM8TEbXfaSZoS94eQj9h19cXqm3LjMJLPZ";

const cryptoPulse = {
	"async": true,
	"crossDomain": true,
	"url": "https://crypto-pulse.p.rapidapi.com/news",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "crypto-pulse.p.rapidapi.com",
		"x-rapidapi-key": "ace563b49cmshf51f6b2f277eccfp1bc75djsn9f362115f89a"
	}}
var twitterRes = {
  data: [
    {
      author_id: "1723531020",
      id: "1490430366930411523",
      text: "RT @crypto_dago: The most important principle of journalism is to show both sides of the story. 99% of the news is guilty of showing only o…",
    },
    {
      author_id: "1267773564352069634",
      id: "1490430366234169344",
      text: "#valerstudios #VLR #blockchain #cryptocurrency #technology #bitcoin #money #crypto #Binance #BNB #cryptocurrencies #fintech @Valerstudios https://t.co/WKhOgXnLGl",
    },
    {
      author_id: "1465309920891265031",
      id: "1490430362261938177",
      text:
        "Everyone check out #crypto services of https://t.co/XxcyJqDnrN! I am so hyped to get in the whitelist for @ChoiseCom MetaFi 🤩🤩\n" +
        "Invite your friends to get more! https://t.co/azcBR67KfU",
    },
    {
      author_id: "1482347600305078281",
      id: "1490430362006216704",
      text:
        "RT @KriptoCeltics: Şubat Ayı Çekilişi 🎺\n" +
        "\n" +
        "Ödül 4.000TL\n" +
        "\n" +
        "✅Takip, \n" +
        "✅RT+Beğeni\n" +
        "\n" +
        "#ValentinesDay #SevgililerGünü #BTC  #Ethereum #BNB  #Crypto #B…",
    },
    {
      author_id: "1468881170691760135",
      id: "1490430361733640199",
      text:
        "🦧 @fatapeclub Roadmap 2.0 step 3 🦧\n" +
        "\n" +
        "📣 Exclusive Live Conferences For #FatApeClub #HODLers 📣\n" +
        "\n" +
        "💎 Rewarding the #DiamondHands 💎\n" +
        "\n" +
        "👀 What live conference subjects would you like to see? #Crypto ? #NFTs ? #Business ? 👀\n" +
        "\n" +
        "#FACfollowFAC #NFT #NFTCommunity https://t.co/4fRIAnfMfC",
    },
    {
      author_id: "1487613831287566336",
      id: "1490430360110628867",
      text:
        "Magandang balita! Nagkaroon ang web3 streaming service ng Dehub ng isang strategic partnership sa ritestream na ilalaunch ngayong February 22, 2022!\n" +
        "\n" +
        "#tothemoon #crypto #dehub #altcoin #metaverse https://t.co/b5gEnY00cn",
    },
    {
      author_id: "1459934042086940673",
      id: "1490430359263084546",
      text:
        "RT @MyRichFarm: The reward rises to 8⃣USDT!🤩🤩\n" +
        "📌$1,000,000 for Sharing\n" +
        "📌LP was locked\n" +
        "📌Completed the audit \n" +
        "📌Earlier in and higher returns\n" +
        "📌…",
    },
    {
      author_id: "1470096558658138112",
      id: "1490430358889848838",
      text:
        "Jig0lo olup ayda 2500-5000 arası para kazanmak için burdan kayıt olabilirsiniz : https://t.co/EMupq5y1XQ \n" +
        "\n" +
        "#tuerkifsaalemi #türkifşa #turkifsa #MahmutOzerİstifa #millişerefsiz #cemyilmaz #pazartesi #pars #Berna #yekta #ıspartaelektrikistiyor #SoemestrTatiliuzatilsin #Crypto #sex https://t.co/zAu7KNbZLh",
    },
    {
      author_id: "1479274498578919432",
      id: "1490430356822106116",
      text:
        "RT @hiRavenCrypto: I just want to remind you\n" +
        "“Crypto don’t sleep but Bank do”🔥\n" +
        "\n" +
        "#Crypto #Altcoins",
    },
    {
      author_id: "1421117552399314946",
      id: "1490430355857281024",
      text: "RT @SerpentXSF: We ended the week around $40.4k so I wouldn't be surprised if we pull back before opening tomorrow. Looks like something tr…",
    },
  ],
  includes: {
    users: [
      {
        name: "Crypto_Dago",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1389001527210221572/LnT6Y0qT_normal.jpg",
        username: "crypto_dago",
        id: "1723531020",
      },
      {
        name: "Yuli",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1267774202008031233/KZTFh1Os_normal.jpg",
        username: "cryptofarma",
        id: "1267773564352069634",
      },
      {
        name: "kinanthi",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1465310754752503809/ccYDGrh6_normal.jpg",
        username: "kinanth14439230",
        id: "1465309920891265031",
      },
      {
        name: "nft cenifer",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1482347916597633029/b_muEm1H_normal.jpg",
        username: "myssteery",
        id: "1482347600305078281",
      },
      {
        name: "ThatNFTGuy",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1489720939210280960/2WNdXaqh_normal.jpg",
        username: "ThatNFTGuyy",
        id: "1468881170691760135",
      },
      {
        name: "DeHub Philippines",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1487613881287843841/7aW3HBz__normal.png",
        username: "DehubP",
        id: "1487613831287566336",
      },
      {
        name: "Dionne Frisby",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1462659667885051905/m6ObAeKl_normal.jpg",
        username: "FrisbyDionne",
        id: "1459934042086940673",
      },
      {
        name: "Mersinli Aysu",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1470097292300632066/YFsmG4oZ_normal.jpg",
        username: "aysu_mersinli",
        id: "1470096558658138112",
      },
      {
        name: "ابن جدددة",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1479277759352479745/EzVtv7AF_normal.jpg",
        username: "AJdddt",
        id: "1479274498578919432",
      },
      {
        name: "M C",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1454239020431462400/tuM1YpLt_normal.jpg",
        username: "MC78970480",
        id: "1421117552399314946",
      },
    ],
  },
  meta: {
    newest_id: "1490430366930411523",
    oldest_id: "1490430355857281024",
    result_count: 10,
    next_token: "b26v89c19zqg8o3fpe74w2kxtrw0amj40feon4f38r4ot",
  },
};

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
    for (var i = 0; i < 100; i++) {
      ///div holder to hold everything
      var hotCryptoDivHolder = document.createElement("div");
      hotCryptoDivHolder.classList = "crypto-div";

      // div header holder
      var hotCryptoHeader = document.createElement("div");
      hotCryptoHeader.classList = "flex flex-row";

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
      cryptoButton.innerText = "Price History Chart";
      cryptoButton.setAttribute('symbol', response.data[i].symbol)
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

    const feed = {
      async: true,
      crossDomain: true,
      url: "https://api.coinlore.net/api/coin/social_stats/?=" + id,
      method: "GET",
      headers: {},
    };

    $.ajax(feed).done(function (response) {
      // var cryptoList = response.reddit.avg_active_users

      for (var i = 0; i < response.length; i++) {
        var cryptoList = id[i].reddit.avg_active_users;
      }
    });
  });

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
    for (var i = 0; i < 15; i++) {
      var cryptoHeadline = document.createElement("h5");
      cryptoHeadline.classList = "";
      cryptoHeadline.textContent = response[i].description;

      var cryptoImageLink = document.createElement("img");
      cryptoImageLink.src = response[i].tags[0].icon;
      cryptoImageLink.classList = "image-size";

      var provider = document.createElement("p");
      provider.classList = "";
      provider.textContent = response[i].source;

      cryptoNews.append(cryptoHeadline, provider, cryptoImageLink);
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

      var topCoins = document.createElement("div")
      topCoins.classList = "top-coins"


      topCoins.append(topGainer, priceChange, priceChangePercent, gainerRank);
      topGainers.append(topCoins);
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

function resetModal(){
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

const populateMediaScroller = (twitterRes) => {
  for (let i = 0; i < twitterRes.data.length; i++) {
    let mediaItemEl = document.createElement("div");
    mediaItemEl.className = "media-item";

    let userInfoEl = document.createElement("div");
    userInfoEl.className = "user-info";

    let userImgEl = document.createElement("img");
    userImgEl.setAttribute(
      "src",
      twitterRes.includes.users[i].profile_image_url
    );
    userInfoEl.append(userImgEl);

    let textContainerEl = document.createElement("div");
    textContainerEl.className = "text-container";

    let usernameEl = document.createElement("p");
    usernameEl.className = "username";
    usernameEl.innerHTML = twitterRes.includes.users[i].name;
    textContainerEl.append(usernameEl);

    let handleEl = document.createElement("p");
    handleEl.className = "handle";
    handleEl.innerHTML = "@" + twitterRes.includes.users[i].username;
    textContainerEl.append(handleEl);

    userInfoEl.append(textContainerEl);
    mediaItemEl.append(userInfoEl);

    let tweetContentEl = document.createElement("div");
    tweetContentEl.className = "tweet-content";

    let tweetTextEl = document.createElement("p");
    tweetTextEl.innerHTML = twitterRes.data[i].text;
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

async function altGetReq() {
  fetch(
    "https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/tweets/search/recent?query=%23crypto&tweet.fields=author_id&expansions=author_id&user.fields=profile_image_url,name,username&max_results=10",
    {
      method: "GET",
      // "mode": "no-cors",
      headers: {
        "User-Agent": "v2RecentSearchJS",
        Authorization: `Bearer ${apiBearerToken}`,
      },
    }
  ).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        populateMediaScroller(data);
      });
    }
  });
}

scrollEl.scrollTo({
  left: -100000,
  behavior: "smooth",
});

scrollIntervalHandler(true, false);

populateMediaScroller(twitterRes); 


scrollContainerEl.addEventListener("click", scrollButtonHandler);
