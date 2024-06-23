const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// http://www.omdbapi.com/?apikey=315796c1&t=spiderman

const moviesE = document.querySelector(".moviesAll");
const form = document.querySelector("form");
const search = document.querySelector("#search");
const trends = document.querySelector(".trends");
const err = document.querySelector(".err");

async function getMovies(url) {
    moviesE.innerHTML = "";
    const movies = await fetch(url).then(x => x.json()).then((res) => {
        return res.results.filter(data => data.poster_path !== null);
    });


    if (!movies?.length) return err.style.display = "flex";

    err.style.display = "none";

    movies.forEach(movie => {
        const { poster_path, original_language, overview, vote_average, title, release_date } = movie;

        moviesE.innerHTML += `
        <div class="movies">
        <div class="poster">
            <img src="${IMGPATH + poster_path}" alt="">
        </div>
            <div class="name">${title}</div>
            <div class="rate" style="color:${rateColor(vote_average)} ;">${vote_average.toString().includes(".") ? vote_average : vote_average + ".0"}</div>

        <div class="overview">
        <h3>${title}</h3>
        ${overview}</div>
    </div>`

    })

}

function rateColor(rate) {

    return rate >= 8 ? "#74DE2D" : rate >= 5 ? "#F98D1C" : "#F9371C"
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (!searchTerm) return getMovies(APIURL);
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
});

trends.addEventListener("click", () => {
    getMovies(APIURL);
})

getMovies(APIURL);
