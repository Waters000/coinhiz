// Create DOM elements from IDs and Class
var hotCryptos = document.querySelector(".hot-cryptos");
var crytposHere = document.querySelector(".cryptos-here");
var scrollEl = document.querySelector("#media-scroller");
var scrollContainerEl = document.querySelector(".media-scroller-container");
var apiUrl = "https://api.twitter.com/1.1/search/tweets.json?q=%23crypto&src=typed_query";
var apiBearerToken = "AAAAAAAAAAAAAAAAAAAAALljYwEAAAAASl%2BKPo2KBcpLkazky1jIgCG%2FzeY%3DEZJ4YlPiXm8KisMDSM8TEbXfaSZoS94eQj9h19cXqm3LjMJLPZ";

// var twitterRes = {
//   data: [
//     {
//       author_id: '1723531020',
//       id: '1490430366930411523',
//       text: 'RT @crypto_dago: The most important principle of journalism is to show both sides of the story. 99% of the news is guilty of showing only o…'
//     },
//     {
//       author_id: '1267773564352069634',
//       id: '1490430366234169344',
//       text: '#valerstudios #VLR #blockchain #cryptocurrency #technology #bitcoin #money #crypto #Binance #BNB #cryptocurrencies #fintech @Valerstudios https://t.co/WKhOgXnLGl'
//     },
//     {
//       author_id: '1465309920891265031',
//       id: '1490430362261938177',
//       text: 'Everyone check out #crypto services of https://t.co/XxcyJqDnrN! I am so hyped to get in the whitelist for @ChoiseCom MetaFi 🤩🤩\n' +
//         'Invite your friends to get more! https://t.co/azcBR67KfU'
//     },
//     {
//       author_id: '1482347600305078281',
//       id: '1490430362006216704',
//       text: 'RT @KriptoCeltics: Şubat Ayı Çekilişi 🎺\n' +
//         '\n' +
//         'Ödül 4.000TL\n' +
//         '\n' +
//         '✅Takip, \n' +
//         '✅RT+Beğeni\n' +
//         '\n' +
//         '#ValentinesDay #SevgililerGünü #BTC  #Ethereum #BNB  #Crypto #B…'
//     },
//     {
//       author_id: '1468881170691760135',
//       id: '1490430361733640199',
//       text: '🦧 @fatapeclub Roadmap 2.0 step 3 🦧\n'   +
//         '\n' +
//         '📣 Exclusive Live Conferences For #FatApeClub #HODLers 📣\n' +
//         '\n' +
//         '💎 Rewarding the #DiamondHands 💎\n' +
//         '\n' +
//         '👀 What live conference subjects would you like to see? #Crypto ? #NFTs ? #Business ? 👀\n' +
//         '\n' +
//         '#FACfollowFAC #NFT #NFTCommunity https://t.co/4fRIAnfMfC'
//     },
//     {
//       author_id: '1487613831287566336',
//       id: '1490430360110628867',
//       text: 'Magandang balita! Nagkaroon ang web3 streaming service ng Dehub ng isang strategic partnership sa ritestream na ilalaunch ngayong February 22, 2022!\n' +
//         '\n' +
//         '#tothemoon #crypto #dehub #altcoin #metaverse https://t.co/b5gEnY00cn'
//     },
//     {
//       author_id: '1459934042086940673',
//       id: '1490430359263084546',
//       text: 'RT @MyRichFarm: The reward rises to 8⃣USDT!🤩🤩\n' +
//         '📌$1,000,000 for Sharing\n' +
//         '📌LP was locked\n' +
//         '📌Completed the audit \n' +
//         '📌Earlier in and higher returns\n' +
//         '📌…'
//     },
//     {
//       author_id: '1470096558658138112',
//       id: '1490430358889848838',
//       text: 'Jig0lo olup ayda 2500-5000 arası para kazanmak için burdan kayıt olabilirsiniz : https://t.co/EMupq5y1XQ \n' +
//         '\n' +
//         '#tuerkifsaalemi #türkifşa #turkifsa #MahmutOzerİstifa #millişerefsiz #cemyilmaz #pazartesi #pars #Berna #yekta #ıspartaelektrikistiyor #SoemestrTatiliuzatilsin #Crypto #sex https://t.co/zAu7KNbZLh'
//     },
//     {
//       author_id: '1479274498578919432',
//       id: '1490430356822106116',
//       text: 'RT @hiRavenCrypto: I just want to remind you\n' +
//         '“Crypto don’t sleep but Bank do”🔥\n' +
//         '\n' +
//         '#Crypto #Altcoins'
//     },
//     {
//       author_id: '1421117552399314946',
//       id: '1490430355857281024',
//       text: "RT @SerpentXSF: We ended the week around $40.4k so I wouldn't be surprised if we pull back before opening tomorrow. Looks like something tr…"
//     }
//   ],
//   includes: {
//     users: [
//       {
//         name: 'Crypto_Dago',
//         profile_image_url: 'https://pbs.twimg.com/profile_images/1389001527210221572/LnT6Y0qT_normal.jpg',
//         username: 'crypto_dago',
//         id: '1723531020'
//       },
//       {
//         name: 'Yuli',
//         profile_image_url: 'https://pbs.twimg.com/profile_images/1267774202008031233/KZTFh1Os_normal.jpg',
//         username: 'cryptofarma',
//         id: '1267773564352069634'
//       },
//       {
//         name: 'kinanthi',
//         profile_image_url: 'https://pbs.twimg.com/profile_images/1465310754752503809/ccYDGrh6_normal.jpg',
//         username: 'kinanth14439230',
//         id: '1465309920891265031'
//       },
//       {
//         name: 'nft cenifer',
//         profile_image_url: 'https://pbs.twimg.com/profile_images/1482347916597633029/b_muEm1H_normal.jpg',
//         username: 'myssteery',
//         id: '1482347600305078281'
//       },
//       {
//         name: 'ThatNFTGuy',
//         profile_image_url: 'https://pbs.twimg.com/profile_images/1489720939210280960/2WNdXaqh_normal.jpg',
//         username: 'ThatNFTGuyy',
//         id: '1468881170691760135'
//       },
//       {
//         name: 'DeHub Philippines',
//         profile_image_url: 'https://pbs.twimg.com/profile_images/1487613881287843841/7aW3HBz__normal.png',
//         username: 'DehubP',
//         id: '1487613831287566336'
//       },
//       {
//         name: 'Dionne Frisby',
//         profile_image_url: 'https://pbs.twimg.com/profile_images/1462659667885051905/m6ObAeKl_normal.jpg',
//         username: 'FrisbyDionne',
//         id: '1459934042086940673'
//       },
//       {
//         name: 'Mersinli Aysu',
//         profile_image_url: 'https://pbs.twimg.com/profile_images/1470097292300632066/YFsmG4oZ_normal.jpg',
//         username: 'aysu_mersinli',
//         id: '1470096558658138112'
//       },
//       {
//         name: 'ابن جدددة',
//         profile_image_url: 'https://pbs.twimg.com/profile_images/1479277759352479745/EzVtv7AF_normal.jpg',
//         username: 'AJdddt',
//         id: '1479274498578919432'
//       },
//       {
//         name: 'M C',
//         profile_image_url: 'https://pbs.twimg.com/profile_images/1454239020431462400/tuM1YpLt_normal.jpg',
//         username: 'MC78970480',
//         id: '1421117552399314946'
//       }
//     ]
//   },
//   meta: {
//     newest_id: '1490430366930411523',
//     oldest_id: '1490430355857281024',
//     result_count: 10,
//     next_token: 'b26v89c19zqg8o3fpe74w2kxtrw0amj40feon4f38r4ot'
//   }
// }

// set up variables for functions.
var crypto;
let myInterval;

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

const populateMediaScroller = (twitterRes) => {
  for (let i = 0; i < twitterRes.data.length; i++) {
    let mediaItemEl = document.createElement("div");
    mediaItemEl.className = "media-item";

    let userInfoEl = document.createElement("div");
    userInfoEl.className = "user-info";

    let userImgEl = document.createElement("img");
    userImgEl.setAttribute("src", twitterRes.includes.users[i].profile_image_url);
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
}

// START MEDIA SCROLLER LOGIC
const startScroll = () => {
  myInterval = setInterval(function() {
    // If at the end of the list, scroll to start
    if (scrollEl.scrollLeft >= -10) {
      scrollEl.scrollTo({
        left: -100000, // Dummy value so that it always scrolls back to start
        behavior: "smooth"
      })
    } else {
      scrollEl.scrollTo({
        left: scrollEl.scrollLeft + 250, // Increment scroll
        behavior: "smooth",
      })
    }
  }, 2500);
}

const scrollIntervalHandler = (start, pause) => {
  if (start) {
    startScroll();
  } else if (pause) {
    clearInterval(myInterval);
    startScroll();
  }
}

const scrollButtonHandler = event => {
  let targetEl = event.target;

  if (targetEl.className === "left-button-container" || targetEl.className === "left-arrow") {
    scrollIntervalHandler(false, true);
    scrollEl.scrollTo({
      left: scrollEl.scrollLeft - 250,
      behavior: "smooth"
    })
  } else if (targetEl.className === "right-button-container" || targetEl.className === "right-arrow") {
    console.log(scrollEl.scrollLeft);
    scrollIntervalHandler(false, true); // Restart timer
    if (scrollEl.scrollLeft >= -10) {
      scrollEl.scrollTo({
        left: -100000,
        behavior: "smooth"
      })
    } else {
      scrollEl.scrollTo({
        left: scrollEl.scrollLeft + 250,
        behavior: "smooth"
      })
    }
  }
}
// END MEDIA SCROLLER LOGIC

async function altGetReq() {
  fetch("https://cors-anywhere.herokuapp.com/https://api.twitter.com/2/tweets/search/recent?query=%23crypto&tweet.fields=author_id&expansions=author_id&user.fields=profile_image_url,name,username&max_results=10", {
      "method": "GET",
      // "mode": "no-cors",
      "headers": {
          "User-Agent": "v2RecentSearchJS",
          "Authorization": `Bearer ${apiBearerToken}`
      }
  }).then(response => {
      if (response.ok) {
          response.json().then(data => {
              populateMediaScroller(data);
              console.log("Request Successful");
          })
      }
  })
}

scrollEl.scrollTo({
  left: -100000,
  behavior: "smooth"
})

scrollIntervalHandler(true, false);

// getCrypto();

altGetReq();
scrollContainerEl.addEventListener("click", scrollButtonHandler);