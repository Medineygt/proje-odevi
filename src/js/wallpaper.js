const images_el = document.querySelector(".images");
const form = document.querySelector("form");
const search = document.querySelector("#search");
const selects = document.querySelector(".selects");
const count = document.querySelector(".count");
const plsmin = document.querySelectorAll("#btn-plsmin");

plsmin.forEach(btn => {

    btn.addEventListener("click", () => {
        let num = Number(count.innerHTML);
        if (btn.classList.contains("btn-left")) {
            if (num > 1) {
                num--;
                count.innerHTML = num;
            }

        }
        if (btn.classList.contains("btn-right")) {
            if (num < 24) {
                num++;
                count.innerHTML = num;
            }
        }
        createWallpaper(document.querySelector(".selects").value, "1920x1080", (num).toString());
    })
})


createWallpaper(document.querySelector(".selects").value, "400x500", 1)

selects.addEventListener("change", () => {
    createWallpaper(document.querySelector(".selects").value, "1920x1080", 1)

    count.innerHTML = 1;

})

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = search?.value === undefined ? "" : search.value;

    const translat = await translate(searchTerm, "en")

    console.log(translat, searchTerm)

    await createWallpaper(translat.response, "1920x1080", 1);

    search.value = "";
});


async function createWallpaper(query, quality, page) {

    const photos = await wallpaperData(query, quality, page);
    images_el.innerHTML = "";
    photos.forEach(photo => {
        let colors_div = "";
        photo.colors.forEach(color => {
            const rgb = hexToRgb(color);
            const text_brigt = textBrigtness([rgb.r, rgb.g, rgb.b]);
            colors_div += `<div class="color" style="background-color: ${color};color:${text_brigt}">${color}</div>`;
        })

        images_el.innerHTML += `
        <div class="image">
        <div class="photo">
            <img src="${photo.thumbs.original}" alt="">
        </div>
        <div class="desc">
            <p class="size">Boyut ${photo.resolution}</p>
            <div class="colors">
            ${colors_div}
            </div>
            <div class="download" url ="${photo.path}">İndir</div>
        </div>
    </div>
        `;
    })

    const downloads = document.querySelectorAll(".download");
    downloads.forEach(downloadx => {
        downloadx.addEventListener("click", async (e) => {
            const url = e.target.getAttribute("url");
            const data = await fetch("/api/imgurltobase64/" + encodeURIComponent(url)).then(x => x.text());
            download("data:image/gif;base64," + data, "image.jpg", "image/gif")
        })
    })
}

function wallpaperData(query, quality, page) {
    return fetch(`/api/wallpaper?query=${query}&quality=${quality}&page=${page}`).then(x => x.json()).then(response => {
        return response;
    })
}
async function translate(word, to) {
    return fetch(`/api/translate?word=${word}&to=${to}`).then(x => x.json()).then(response => {
        return response;
    })
}
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
function textBrigtness(rgb = Array) {
    const brightness = Math.round(
        (
            (parseInt(rgb[0]) * 299) +
            (parseInt(rgb[1]) * 587) +
            (parseInt(rgb[2]) * 114)
        ) / 1000);
    return (brightness > 125) ? '#1a1a1a' : '#eee';
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

