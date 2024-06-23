const express = require("express");
const ytdl = require("ytdl-core");
const youtube_sr = require("youtube-sr").default;
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const superagent = require("superagent");
const translate = require("translate-google");

const mongoose = require("mongoose");

const app = express();
const server_path = path.join(__dirname, "/");
const views_path = server_path + "/src/views";



app.use(express.static(server_path));


app.get("/", (req, res) => {
    res.sendFile(views_path + "/index.html");
});

const viewsFileName = fs.readdirSync("./src/views")
const file_type = ".html"


viewsFileName.forEach(file => {
    app.get(`/${file.split(file_type)[0]}`, (req, res) => {
        res.sendFile(views_path + "/" + file);
    })
})



/*
app.get("/:file", (req, res) => {
    res.sendFile(views_path + "/" + req.params.file + ".html");
});
*/
app.get("/api/spotifysong/:song", async (req, res) => {
    const query = req.params.song;
    axios.get("https://open.spotify.com/genre/" + query).then(response => {
        const data = response.data.toString().split("Spotify.Entity =")[1].split("</script>")[0].trim().split(";")[0];
        const obj = JSON.parse(data);
        return res.send(data);
    }).catch(err => { return res.send(Object.create(null)) });
});

app.get("/api/youtubesong/:song", async (req, res) => {
    const query = req.params.song;
    youtube_sr.search(query, { limit: 5, safeSearch: true }).then(data => {
        return res.send(data);
    }).catch(() => {
        return res.send(Object.create(null));
    })
});

app.get("/api/youtubedownload", async (req, res) => {
    res.setHeader('Content-disposition', 'attachment; filename=' + req.query.videoName + ".mp3");
    ytdl("https://www.youtube.com/watch?v=" + req.query.videoID, {
        filter: 'audioonly',
        format: "mp3"
    }).pipe(res);
});

app.get("/api/wiki/:query", async (req, res) => {

    superagent.get("https://tr.wikipedia.org/w/api.php")
        .query({
            action: "query",
            prop: "extracts|pageimages",
            pithumbsize: 1920,
            format: "json",
            titles: req.params.query,
            exintro: "",
            explaintext: "",
            redirects: "",
            formatversion: 2
        }).then(response => {
            return res.send(JSON.parse(response.text).query.pages);
        });

});

app.get("/api/wallpaper", (req, res) => {
    const q = req.query.query;
    const quality = req.query.quality;
    const page = req.query.page;
    axios.get(`https://wallhaven.cc/api/v1/search?q=${q}&atleast=${quality}&page=${page}`).then(async response => {
        const data = response.data.data
        return res.send(data);
    })
})

app.get("/api/imgurltobase64/:query", async (req, res) => {
    const query = req.params.query;

    const data = await getBase64(decodeURIComponent(query));
    res.send(data);
})

app.get("/api/translate", (req, res) => {
    const word = req.query.word;
    const to = req.query.to;
    translate(word, { to }).then(response => {
        return res.send({ word, response });
    }).catch(err => {
        return res.send(null);
    })
})


app.use((req, res) => {
    res.sendFile(views_path + "/error.html");

})

const listener = app.listen( 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});


function getBase64(url) {
    return axios
        .get(url, {
            responseType: 'arraybuffer'
        })
        .then(response => Buffer.from(response.data, 'binary').toString('base64'))
}


