
const form = document.querySelector("form");
const search = document.querySelector("#search");
const forecasts = document.querySelector(".forecasts");
const err = document.querySelector(".err");
const weatherAll = document.querySelector(".weatherAll");
form.addEventListener("submit", (e) => {

    e.preventDefault();
    const searchTerm = search.value;
    if (!searchTerm) {
        weather_writer("istanbul");

        err.classList.add("active");
        setTimeout(() => {
            err.classList.remove("active");
        }, 5_000);
        weather_writer("istanbul");

        return;
    }
    weather_writer(searchTerm);
    search.value = "";
});

weather_writer("istanbul");

function xmlToJson(xml) {
    // Create the return object
    var obj = {};
    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj[attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }
    // do children
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof (obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}

async function weather({ location = "istanbul", degree = "C", lang = "tr-TR" }) {

    const url = `https://weather.service.msn.com/find.aspx?src=outlook&weadegreetype=${degree}&culture=${lang}&weasearchstr=${location}`;

    const data = await fetch(url).then(x => x.text());
    var parser = new DOMParser();
    var xml = parser.parseFromString(data, "text/xml");

    return xmlToJson(xml);
}

function weather_svg(skycode, observationtime) {
    function observation() {
        if (!observationtime) observationtime = "05:00:00";

        const num = Number(observationtime.split(":")[0]);

        return num > 4 && num < 19 ? true : false;
    }

    return skycode >= 0 && skycode < 9
        ? observation()
            ? "/src/img/weather/animated/cloudy-day-1.svg"
            : "/src/img/weather/animated/cloudy-night-1.svg"
        : skycode >= 9 && skycode < 19
            ? "/src/img/weather/animated/rainy-5.svg"
            : skycode >= 19 && skycode < 29
                ? observation()
                    ? "/src/img/weather/animated/cloudy-day-2.svg"
                    : "/src/img/weather/animated/cloudy-night-2.svg"
                : skycode >= 29 && skycode < 39
                    ? observation()
                        ? "/src/img/weather/animated/day.svg"
                        : "/src/img/weather/animated/night.svg"
                    : skycode >= 39 && skycode < 49
                        ? observation()
                            ? "/src/img/weather/animated/cloudy-day-3.svg"
                            : "/src/img/weather/animated/cloudy-night-3.svg"
                        : skycode >= 49 && skycode < 59
                            ? "/src/img/weather/animated/rainy-4.svg"
                            : skycode >= 59 && skycode < 69
                                ? "/src/img/weather/animated/rainy-5.svg"
                                : skycode >= 69 && skycode < 79
                                    ? "/src/img/weather/animated/rainy-6.svg"
                                    : skycode >= 79 && skycode <= 99
                                        ? "/src/img/weather/animated/thunder.svg"
                                        : observation()
                                            ? "/src/img/weather/animated/day.svg"
                                            : "/src/img/weather/animated/night.svg";
}

async function weather_writer(location) {
    let data = await weather({ location });
    const response = data?.weatherdata?.weather[0];
    weatherAll.innerHTML = "";

    if (!response) {
        err.classList.add("active");
        setTimeout(() => {
            err.classList.remove("active");
        }, 5_000);
        weather_writer("istanbul");
        return
    }

    const weather_datas = data.weatherdata.weather


    const date = new Date();
    const month = {
        0: "Ocak",
        1: "Şubat",
        2: "Mart",
        3: "Nisan",
        4: "Mayıs",
        5: "Haziran",
        6: "Temmuz",
        7: "Ağustos",
        8: "Eylül",
        9: "Ekim",
        10: "Kasım",
        11: "Aralık"
    }

    for (let i = 0; i < weather_datas.length; i++) {
        weatherAll.innerHTML += `
        <div class="weather">

          <div class="weatherPhoto">
          <img src="${weather_svg(weather_datas[i].current.skycode, response.current.observationtime)}" alt="">
          </div>

          <div class="location">${weather_datas[i].weatherlocationname.slice(0, 15)}</div>

          <div class="day">${weather_datas[i].current.day + ", " + date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear()}</div>

          <div class="degree">${weather_datas[i].current.temperature + "°c"}</div>

          <span class="stick">----------------------</span>

          <div class="cloud">${weather_datas[i].current.skytext}</div>

          <div class="FH">${"Hissedilen " + weather_datas[i].current.feelslike + "°c /" + " Nem %" + weather_datas[i].current.humidity}</div>

          <div class="forecasts">
          ${forecast_Maker(weather_datas[i].forecast.slice(2))}
          </div>

        </div>
        `;
    }

    function forecast_Maker(forecast) {
        let text = ""

        for (let i = 0; i < forecast.length; i++) {

            text += `                    
<div class="forecast">
    <div class="photo">
        <img src="${weather_svg(forecast[i].skycodeday)}" alt="">
    </div>
    <div class="degree">${forecast[i].high}°c / ${forecast[i].low}°c</div>
    <div class="day">${forecast[i].day}</div>
</div>`;
        }
        return text;

    }
    VanillaTilt.init(document.querySelectorAll(".weather"), {
        max: 15,
    })
}

