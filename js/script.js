// Create DOM elements from IDs and Class 
var hotCryptos = document.querySelector(".hot-cryptos")
var crytposHere = document.querySelector(".cryptos-here")
var tbl = document.querySelector(".table")
var cryptoNews = document.querySelector(".crypto-news")
var topGainers = document.querySelector(".top-gainers")
var modalContent = document.querySelector(".modals")


var modal = document.getElementById('coin-form-modal')
var closeBtn = document.getElementById('closeBtn')

// set up variables for functions.
var crypto;
var id;
// set up API key as variable...API key can not go in URL string or
// browser will say there is a security issue


var getCrypto = function (){
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.coinlore.net/api/tickers/",
        "method": "GET",
        "headers": {
           
        }
    };
    
    $.ajax(settings).done(function (response) {
        //console.log(response);

        //console.log(response.data[0].csupply)

       


        for (var i = 0; i < 100; i++){

           ///div holder to hold everything
            var hotCryptoDivHolder = document.createElement("div")
            hotCryptoDivHolder.classList = "crypto-div";

            // div header holder
            var hotCryptoHeader = document.createElement("div")
            hotCryptoHeader.classList = "flex flex-row ";         
            
            var cryptoName = document.createElement('h2')
            cryptoName.classList = "cryptoheader flex flex-row";
            cryptoName.innerHTML = `<a class="${response.data[i].name}" href="#${response.data[i].name}"><span id='${response.data[i].name}'>${response.data[i].name}</span></a>`;
            cryptoName.setAttribute("symbol", response.data[i].symbol);

            var rank = document.createElement('p')
            rank.classList = "flex flex-row";
            rank.textContent = "Rank: " + response.data[i].rank


            hotCryptoHeader.append(cryptoName, rank)


            var hotCryptoElementsHolder = document.createElement('div')
            hotCryptoElementsHolder.classList = "flex flex-row";

            var holderOne = document.createElement('div')
            holderOne.classList = "holderone";
            


            var cryptoId = document.createElement('p')
            cryptoId.classList = "";
            cryptoId.textContent = "ID: " + response.data[i].id
            var id = response.data[i].id
            holderOne.append(cryptoId)
            
            
            var holderTwo = document.createElement('div')
            holderTwo.classList = "holdertwo";




            var cryptoSupply = document.createElement('p')
           cryptoSupply.classList = "";
           var cryptoSupplyInt;
           cryptoSupplyInt = response.data[i].csupply;
            cryptoSupply.textContent = "Current Mined Supply " +  parseInt(response.data[i].csupply).toLocaleString("en-US");
           // console.log(cryptoSupplyInt)
           

           holderTwo.append(cryptoSupply)

           var holderThree = document.createElement('div')
           holderThree.classList = "holderThree";
          
            var cryptoTotalSupply = document.createElement('p')
             var totalSupplyInt;
          cryptoTotalSupply.classList = "";
          totalSupplyInt = response.data[i].msupply
            cryptoTotalSupply.textContent = "Total Supply " +  parseInt(response.data[i].msupply).toLocaleString("en-US");
       
            holderThree.append(cryptoTotalSupply)
       
            //  console.log(totalSupplyInt)

            var holderFour = document.createElement('div')
            holderFour.classList = "holderFour";

          var cryptoPrice = document.createElement('p')
            cryptoPrice.classList = "";
            cryptoPrice.textContent = "Price: " + "$"+ response.data[i].price_usd

            holderFour.append(cryptoPrice)

        
            var holderFive = document.createElement('div')
            holderFive.classList = "holderFive";

            var percentMined = document.createElement('p')
            percentMined.classList = "";
            percentMined.textContent = "Percent Mined: " + parseInt((cryptoSupplyInt /  totalSupplyInt)*100)+ "%";
           
            holderFive.append(percentMined)

            var holderSix = document.createElement('div')
            holderSix.classList = "holderSix";

            var cryptoButton = document.createElement('button')
            cryptoButton.classList = "button onclick()";
            cryptoButton.innerText = "Social Stats";
            cryptoButton.setAttribute("onClick", "openModal(event)")

            holderSix.append(cryptoButton)

            hotCryptoElementsHolder.append( holderTwo,  holderThree, holderFour, holderFive, holderSix)
           
            hotCryptoDivHolder.append(hotCryptoHeader, hotCryptoElementsHolder )
            crytposHere.append(hotCryptoDivHolder)
 
            cryptoName.addEventListener("click", modalHandler);
          }

    const feed = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.coinlore.net/api/coin/social_stats/?=" + id,
        "method": "GET",
        "headers": {
           
        }
        
    };

 $.ajax(feed).done(function (response) {

    console.log(response)
    // var cryptoList = response.reddit.avg_active_users
    // console.log(cryptoList)

    for (var i = 0; i < response.length; i++) {
            var cryptoList = id[i].reddit.avg_active_users
            console.log(cryptoList)




            
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
	"async": true,
	"crossDomain": true,
	"url": "https://crypto-pulse.p.rapidapi.com/news",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "crypto-pulse.p.rapidapi.com",
		"x-rapidapi-key": "ace563b49cmshf51f6b2f277eccfp1bc75djsn9f362115f89a"
	}
};

$.ajax(cryptoPulse).done(function (response) {
	console.log(response);

	for (var i = 0; i < 15; i++) {

        var cryptoHeadline = document.createElement('h5')
        cryptoHeadline.classList = "";
        cryptoHeadline.textContent = response[i].description


        var cryptoImageLink = document.createElement('img')
        cryptoImageLink.src = response[i].tags[0].icon
        cryptoImageLink.classList = "image-size";
       // console.log(cryptoImageLink)
     

        var provider = document.createElement('p')
        provider.classList = "";
        provider.textContent = response[i].source

        cryptoNews.append(cryptoHeadline, provider, cryptoImageLink)

        //console.log(cryptoNews)
    }

  });


    const gainers = {
        "async": true,
        "crossDomain": true,
        "url": "https://cryptocurrency-markets.p.rapidapi.com/general/gainer",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "cryptocurrency-markets.p.rapidapi.com",
            "x-rapidapi-key": "ace563b49cmshf51f6b2f277eccfp1bc75djsn9f362115f89a"
        }
    };
 

    $.ajax(gainers).done(function (response) {
      //  console.log(response);
       
        for (var i = 0; i < 10; i++){

            var topGainer = document.createElement('h3')
            topGainer.classList = "";
            topGainer.textContent = response.result[i].name
            

            var priceChange = document.createElement('h7')
            priceChange.classList = "green";
            priceChange.textContent = "Price: $" + parseInt(response.result[i].priceChange.price);
            
            var priceChangePercent = document.createElement('h7')
            priceChangePercent.classList = "green";
            priceChangePercent.textContent = "% Gain" + parseInt(response.result[i].priceChange.priceChange24h)+ "%";



            var gainerRank = document.createElement('p')
            gainerRank.classList = "";
            gainerRank.textContent = "  rank: "+ response.result[i].rank;

            topGainers.append(topGainer, priceChange, priceChangePercent, gainerRank)


        }
        
    });







}
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

function openModal() {
  console.log(event.id)
  modal.style.display = "block";

  const socials = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.coinlore.net/api/coin/social_stats/?id=80",
    "method": "GET",
    "headers": {
       
    }
    
};

$.ajax(socials).done(function (response) {

console.log(response)

var redditSocial = document.createElement('h3')
redditSocial.classList = "";
redditSocial.textContent = "Redddit Users Avg " + response.reddit.avg_active_users


modalContent.append(redditSocial)
// var cryptoList = response.reddit.avg_active_users
// console.log(cryptoList)

// for (var i = 0; i < response.length; i++) {
//         var cryptoList = id[i].reddit.avg_active_users
       


});

 
 
}

function closeModal(){
  modal.style.display = "none";
 
}

// start screen by running cityList to show previous storage cities
getCrypto();


closeBtn.addEventListener('click', closeModal)