const APIurl = "https://api.github.com/users/";

async function getUser(username) {

    const res = await fetch(APIurl + username).then(x => x.json());

    document.querySelector(".photo img").src = res.avatar_url;

    document.querySelector(".username").innerHTML = res.name;
    document.querySelector(".bio").innerHTML = res.bio;

    document.querySelector(".data .repossize").innerHTML = res.public_repos + " <span>Repo</span>";

    document.querySelector(".data .follow").innerHTML = res.following + " <span>Takip</span>";

    document.querySelector(".data .follower").innerHTML = res.followers + " <span>Takipçi</span>";

    const repos = document.querySelector(".repos .repo");

    repos.innerHTML = "";
    let repositories = await fetch(APIurl + username + "/repos").then(x => x.json());

    repositories = repositories.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 10);

    for(let i = 0 ; i< repositories.length; i++){
        repos.innerHTML+=`
        <a href="${repositories[i].html_url}">${repositories[i].name}</a> 
        `
    }

};

getUser("medineygt");



const form = document.querySelector("form");
const search = document.querySelector("#search");

form.addEventListener("submit", (e) => {

    e.preventDefault();
    const searchTerm = search.value;
    if (!searchTerm) return getUser("medineygt");
    console.log(searchTerm)
    getUser(searchTerm)
    search.value = "";
});
