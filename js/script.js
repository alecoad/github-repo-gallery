// GLOBAL VARIABLES
// the div with profile information
const overviewDiv = document.querySelector(".overview");
// github username
const username = "alecoad";
// select the unordered list to display the repos list
const repoListElement = document.querySelector(".repo-list");

// FETCH API JSON DATA
const getData = async function () {
    // fetch info from "username"'s github profile
    const response = await fetch(`https://api.github.com/users/${username}`);
    const user = await response.json();
    // console.log(user);
    // call the function to display user information
    displayData(user);
};

getData();

// FETCH AND DISPLAY USER DATA
const displayData = function (data) {
    // create user info div with class of "user-info"
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    // populate the div with the following html
    userInfoDiv.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> 
    `;
    // append the div to the overview element
    overviewDiv.append(userInfoDiv);
    // fetch repos
    getRepos();
};

// FETCH REPOS
const getRepos = async function () {
    // fetch user's repos
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await response.json();
    // console.log(repos);
    // call the function to display info about each repository
    displayRepos(repos);
};

// DISPLAY INFO ABOUT REPOS
const displayRepos = function (repos) {
    // loop to create a list item for each repo
    for (let repo of repos) {
        const listItem = document.createElement("li");
        listItem.classList.add("repo");
        // create an <h3> element with the repo name
        listItem.innerHTML = `<h3>${repo.name}</h3>`;
        // append the list item to the unordered list of repos
        repoListElement.append(listItem);
    }
};