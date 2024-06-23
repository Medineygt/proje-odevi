const dataURL = url => "/api/youtubesong/" + url;
const songsEl = document.querySelector(".songs-info");
const form = document.querySelector("form");
const search = document.querySelector("#search");
const downloadBTN = document.querySelector(".download");
const plswait = document.querySelector(".plswait");
const youtube_embed = document.querySelector(".youtube-embed");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (!searchTerm) return;

    data(searchTerm).then(() => {
        song_clicker();
    })

    search.value = "";
});

downloadBTN.addEventListener("click", async () => {

    plswait.classList.add("active");
    const video = document.querySelector(".selected-song");
    const videoURL = video.getAttribute("url");
    const videoID = youtube_video_id(videoURL);
    const song_name = video.querySelector(".song-detail").querySelector(".title").innerHTML.trim().replaceAll(/([^\s\^\[\^\]\^\-\^\(\^\)\a-zA-Z0-9])/g, "");

    window.location.replace("/api/youtubedownload" + `?videoID=${videoID}&videoName=${song_name}`);

    window.addEventListener("beforeunload", () => {
        plswait.classList.remove("active");
    });

});

function youtube_valid(exec) { const regexp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/; return regexp.test(exec); };

function youtube_video_id(url) { const regexp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/, match = url.match(regexp); return match[2]; };

function song_clicker() {
    const songs = document.querySelectorAll(".song");

    songs.forEach(elem => {
        elem.addEventListener("click", function () {

            const url = this.getAttribute("url");
            youtube_embed.src = "https://www.youtube.com/embed/" + youtube_video_id(url);

            document.querySelector(".song-selected").style.display = "flex"

            const selectedSongElem = document.querySelector(".selected-song");
            selectedSongElem.innerHTML = "";


            selectedSongElem.setAttribute("url", url);

            const song_img = this.querySelector(".song-img")
            const song_detail = this.querySelector(".song-detail");

            const new_song_img = song_img.cloneNode(true);
            const new_song_detail = song_detail.cloneNode(true);

            selectedSongElem.appendChild(new_song_img);
            selectedSongElem.appendChild(new_song_detail);
   
        })
    })

}
async function data(url) {

    if (youtube_valid(url)) url = youtube_video_id(url);

    const data = await fetch(dataURL(url)).then(x => x.json());

    songsEl.style.display = "block";
    songsEl.innerHTML = "";

    data.forEach(element => {
        songsEl.innerHTML += `
        <div url = "${element.url}" class="song">
        <div class="song-img">
            <img src="${element.thumbnail.url}"
                alt="">
        </div>

        <div class="song-detail">
            <div class="title">
                ${element.title.slice(0, 80)}
            </div>

            <div class="detail">
                <p class="views">Görüntülenme ${numCut(element.views)}</p>

                <p class="duration">Süre ${element.duration_formatted}</p>

            </div>

        </div>

    </div>
        `;
    });

}
function numCut(str, size = 3, sembol = ".") {
    return str.toString()
        .split("")
        .reverse()
        .map((a, i) => (i % size === 0 ? a + sembol : a))
        .reverse()
        .join("")
        .slice(0, -1);
};
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

