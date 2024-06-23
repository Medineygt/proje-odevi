const api = "https://api.coinbase.com/v2/exchange-rates?currency=";

const form = document.querySelector("form");
const search = document.querySelector("#search");
const currencys = document.querySelector(".currencys");
const selects = document.querySelector(".selects");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (!searchTerm) return;

    currencyMaker(searchTerm, "TRY");

    search.value = "";
});

function currencyMaker(curren) {

    curren = Math.ceil(parseInt(curren));

    if (curren <= 0 || isNaN(curren)) return console.log(false);


    fetch(api + selects.value).then(x => x.json()).then(currn => {

        const { data } = currn;
        const rates = Object.keys(data.rates);

        currencys.innerHTML = "";

        rates.forEach(x => {

            const _name = _CURRENCY[x]?.name || null;
            const _symbol = _CURRENCY[x]?.symbol || null;
            const _currency = Number(data.rates[x].slice(0, 5)) || null;


            if (_name !== null && _symbol !== null && _currency !== null) {

                let _curren = (_currency * curren);

                _curren = _curren < 1 ? _curren.toString().slice(0, 4) : _curren.toString().split(".")[0];

                currencys.innerHTML += `
                <div class="curren">
                    <p>
                     <span class="sembol">${_CURRENCY[data.currency].symbol}</span>
                     <span class="curren1">${curren} ${_CURRENCY[data.currency].name}</span>
                   </p>
                   <p class="area">
                    <span class="sembol">${_symbol}</span>
                    <span class="curren1">≌ ${_curren} ${_name}</span>
                   </p>
                </div>
                `;
            }
        })

        return;
    })
}


const _CURRENCY = {
    EUR: { type: "currency", name: "Euro", symbol: "€", decimal: ",", position: "pre" },
    USD: { type: "currency", name: "Amerikan Doları", symbol: "$", decimal: ".", position: "pre" },
    CAD: { type: "currency", name: "Kanada Doları", symbol: "$", decimal: ".", position: "pre" },
    HKD: { type: "currency", name: "Hong Kong Doları", symbol: "$", decimal: ".", position: "pre" },
    ISK: { type: "currency", name: "İzlanda Kronu", symbol: "kr", decimal: ",", position: "post" },
    PHP: { type: "currency", name: "Filipin Pesosu", symbol: "₱", decimal: ".", position: "pre" },
    DDK: { type: "currency", name: "Danimarka  Kronu", symbol: "kr.", decimal: ",", position: "post" },
    HUF: { type: "currency", name: "Macar Forinti", symbol: "Ft", decimal: ",", position: "post" },
    CZK: { type: "currency", name: "Çek Korunası", symbol: "Kč", decimal: ",", position: "post" },
    AUD: { type: "currency", name: "Australian Doları", symbol: "$", decimal: ".", position: "pre" },
    RON: { type: "currency", name: "Rumen Leyi", symbol: "L", decimal: ",", position: "post" },
    SEK: { type: "currency", name: "İsveç Kronu", symbol: "kr", decimal: ",", position: "post" },
    IDR: { type: "currency", name: "Endonezya Rupisi", symbol: "Rp", decimal: ",", position: "pre" },
    INR: { type: "currency", name: "Hindistan Rupisi", symbol: "₹", decimal: ".", position: "pre" },
    BRL: { type: "currency", name: "Brezilya Reali", symbol: "R$", decimal: ",", position: "pre" },
    RUB: { type: "currency", name: "Rus Rublesi", symbol: "₽", decimal: ",", position: "pre" },
    HRK: { type: "currency", name: "Hırvatistan Kunası", symbol: "kn", decimal: ",", position: "post" },
    JPY: { type: "currency", name: "Japon Yeni", symbol: "¥", decimal: ".", position: "pre" },
    TBH: { type: "currency", name: "Tayland Bahtı", symbol: "฿", decimal: ".", position: "pre" },
    CHF: { type: "currency", name: "İsviçre Frangı", symbol: "Fr.", decimal: ",", position: "post" },
    SGD: { type: "currency", name: "Singapur Doları", symbol: "$", decimal: ".", position: "pre" },
    PLN: { type: "currency", name: "Polonya Zlotisi", symbol: "zł", decimal: ",", position: "pre" },
    BGN: { type: "currency", name: "Bulgar Levası", symbol: "Лв.", decimal: ",", position: "pre" },
    TRY: { type: "currency", name: "Türk Lirası", symbol: "₺", decimal: ".", position: "pre" },
    CNY: { type: "currency", name: "Çin Yuanı", symbol: "¥", decimal: ".", position: "pre" },
    NOK: { type: "currency", name: "Norveç Kronu", symbol: "kr", decimal: ".", position: "post" },
    NZD: { type: "currency", name: "Yeni Zelanda Doları", symbol: "$", decimal: ".", position: "pre" },
    ZAR: { type: "currency", name: "Güney Afrika Randı", symbol: "R", decimal: ".", position: "pre" },
    MXN: { type: "currency", name: "Meksika Pesosu", symbol: "$", decimal: ".", position: "pre" },
    ILS: { type: "currency", name: "İsrail Şekeli", symbol: "₪", decimal: ".", position: "pre" },
    GBP: { type: "currency", name: "İngiliz Sterlini ", symbol: "£", decimal: ".", position: "pre" },
    KRW: { type: "currency", name: "Güney Kore Wonu", symbol: "₩", decimal: ".", position: "pre" },
    MYR: { type: "currency", name: "Malezya Ringgiti", symbol: "RM", decimal: ".", position: "pre" },

}

Object.keys(_CURRENCY).forEach(c => {

    if (c === "TRY") {
        selects.innerHTML += `<option selected="selected" value="${c}">${_CURRENCY[c].name}</option>`;
    } else {
        selects.innerHTML += `<option value="${c}">${_CURRENCY[c].name}</option>`;
    };
});

currencyMaker(1, selects.value);

particlesJS('particle',

    {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": false,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true,
        "config_demo": {
            "hide_card": false,
            "background_color": "#b61924",
            "background_image": "",
            "background_position": "50% 50%",
            "background_repeat": "no-repeat",
            "background_size": "cover"
        }
    }

);