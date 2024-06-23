const colors_box = document.querySelector(".colors-box");
const random = document.querySelector(".random");
const form = document.querySelector("form");
const search = document.querySelector("#search");
const copy_msg = document.querySelector(".copy-msg");
const copy_msg_span = document.querySelector(".copy-msg .text");
colorMaker();
copiedListeneer();

function copiedListeneer() {
    const colors = document.querySelectorAll(".color-box p span");

    colors.forEach(color => {
        color.addEventListener("click", function () {

            navigator.clipboard.writeText(this.innerHTML);

            copy_msg_span.innerHTML = this.innerHTML + " kopyalandı.";
            copy_msg.style.backgroundColor = this.innerHTML;
            copy_msg.classList.add("active");
            setTimeout(() => {
                copy_msg.classList.remove("active");
            }, 4000)

        })
    })
}





random.addEventListener("click", async () => {
    await colorMaker();
    await copiedListeneer();

})

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = search?.value === undefined ? "" : search.value;
    await colorMaker(searchTerm);
    await copiedListeneer();

    search.value = "";
});





function colorMaker(input) {

    input = !input ? "" : input;


    colors_box.innerHTML = "";

    for (let i = 0; i < 36; i++) {

        const color = genColor(input);
        const rgb = hexToRgb(color);
        const text_brigt = textBrigtness([rgb.r, rgb.g, rgb.b]);

        colors_box.innerHTML += `
        <div class="color-box" style="background-color:${color};">
          <p class="hex" style="color:${text_brigt};">HEX: <span class="color">${color}</span></p>
          <p class="rgb" style="color:${text_brigt};">RGB: <span class="color">rgb(${rgb.r}, ${rgb.g}, ${rgb.b})</span></p>
        </div>`
    }
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
function genColor(input) {
    input = !input ? "" : input;
    let list = "abcdef1234567890";

    if (input !== "") {
        const b = input.split("").map(x => list.includes(x))
        if (b.includes(false)) {
            return genColor();

        }
    }

    let color = "";
    for (var i = 0; i < (6 - input.length); i++) {
        color += list[Math.floor(Math.random() * 16)];
    }
    return "#" + (input + color);
}




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
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
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