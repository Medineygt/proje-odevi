const elements = document.querySelectorAll(".tool-bar i");
const toolbody = document.querySelector(".tool-body");
const form = document.querySelector("form");
const search = document.querySelector("#search");
const buttons = document.querySelector(".buttons");
const wiki_main = document.querySelector(".wiki-main");
const copy = document.querySelector(".copy");
const copynav = document.querySelector(".copynav");
const download_btn = document.querySelector(".download");

elements.forEach(elem => {
    elem.addEventListener("click", function () {
        elements.forEach(x => x.classList.remove("active"));
        this.classList.add("active");
    })
});

let copynavtext = "", globaldata;

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    buttons.style.display = "none";
    wiki_main.innerHTML = "";
    copynavtext = "";

    if (!searchTerm) return;


    let data = await wiki(searchTerm);

    globaldata = data[0]

    data = data[0];

    if (!data?.title || !data?.extract) return console.log(false)

    copynavtext = data.extract;

    buttons.style.display = "flex";
    wiki_main.innerHTML = `
    <div class="wiki-title">
       <div class="title">${data.title}</div>
       <div class="photo">
       ${data?.thumbnail?.source ? `<img src="${data?.thumbnail?.source}" alt="">` : ""}
        </div>
    </div >

        <div class="wiki-desc">
            <p> &nbsp;&nbsp;&nbsp; ${data.extract.replace("\n", "<br><br>&nbsp;&nbsp;&nbsp;")}</p></div>

    `;
    search.value = "";
});

copy.addEventListener("click", () => {

    navigator.clipboard.writeText(copynavtext);
    copynav.classList.add("active");

    setTimeout(() => {
        copynav.classList.remove("active");
    }, 3000);

})

download_btn.addEventListener("click", () => {

    createPDF(globaldata);
})

async function wiki(query) {
    const data = await fetch("/api/wiki/" + query).then(x => x.json());
    return data;
}



function createPDF(wikidatas) {

    var doc = new jspdf.jsPDF();

    doc.addFileToVFS("Amiri-Regular.ttf", amiriFont);
    doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
    doc.setFont("Amiri");

    doc.setFontSize(40);
    doc.text(wikidatas.title, 5, 40);
    if (wikidatas?.thumbnail?.source !== undefined) doc.addImage(wikidatas?.thumbnail?.source, "JPEG", 150, 10, 50, 50);

    doc.setFontSize(15);

    const desc_length = Math.ceil((Number(wikidatas.extract.length) / 85));

    console.log(desc_length)

    let first = 80, sec = 0;

    for (let i = 0; i < desc_length; i++) {
        doc.text(wikidatas.extract.slice(sec, (sec + 85)), 5, first);
        sec += 100
        first += 5;
    }
    // Making Data URI
    var out = doc.output();
    var url = 'data:application/pdf;base64,' + btoa(out);

    var iframe = "<iframe width='100%' height='100%' src='" + url + "'></iframe>"
    var x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();

    document.location.href = url;
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


