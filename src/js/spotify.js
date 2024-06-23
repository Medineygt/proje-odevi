const selects = document.querySelector(".selects");

const spotify_main = document.querySelector(".spotify-main")

async function spotifyData(query) {

    spotify_main.innerHTML = "";

    const data = await fetch("/api/spotifysong/" + query).then(x => x.json());

    console.log(data)

    const items = data.content.items.filter(x => x.external_urls !== null);


    for (let i = 0; i < items.length; i++) {

        spotify_main.innerHTML += `
         <a class="song-box" href="${items[i].external_urls.spotify}">
        <div class="song-img">
            <img src="${items[i].images.coverImageUrl || items[i].images[0].url}" alt="">
        </div>
        <div class="song-desc">
            <h3>${remover(items[i].name)}</h3>
            <p>${remover(items[i].description)}</p>
        </div>
    </a>`

    }

}

selects.addEventListener("change", () => {

    spotifyData(document.querySelector(".selects").value)

})

spotifyData("rock");

function remover(text) {

    const rx = new RegExp("<a[\\d\\D]*?\/a>", "g");

    return text.toString().replace(rx, "");
}

particlesJS('particle',
    {
        "particles": {
            "number": {
                "value": 160,
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
                "value": 1,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 4,
                    "size_min": 0.3,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 600
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": false,
                    "mode": "repulse"
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
                    "distance": 250,
                    "size": 0,
                    "duration": 2,
                    "opacity": 0,
                    "speed": 3
                },
                "repulse": {
                    "distance": 400,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    }
);
