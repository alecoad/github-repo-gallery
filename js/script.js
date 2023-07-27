// GLOBAL VARIABLES
// the div with profile information
const overviewDiv = document.querySelector(".overview");
// github username
const username = "alecoad";
// select the unordered list to display the repos list
const repoList = document.querySelector(".repo-list");
// select the section "repos", where all the repo information appears
const repoSection = document.querySelector(".repos");
// select the section "repo-data", where the individual repo data appears
const repoData = document.querySelector(".repo-data");
// select the "back to repo gallery" button
const galleryReturn = document.querySelector(".view-repos");
// select the input with the "search by name" placeholder
const filterInput = document.querySelector(".filter-repos");

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
        repoList.append(listItem);
    }
};

// ADD A CLICK EVENT
repoList.addEventListener("click", function (e) {
    // if an "h3" element is clicked...
    if (e.target.matches("h3")) {
        // get the repo name from the clicked "h3"
        const repoName = e.target.innerText;
        // call function to get specific repo info
        getRepoInfo(repoName);
    }
});

// FUNCTION TO GET SPECIFIC REPO INFO
const getRepoInfo = async function (repoName) {
    // make a fetch request to grab information about the specific repo
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    // resolve and save the JSON response
    const repoInfo = await response.json();
    console.log(repoInfo);
    // fetch data from language_url property of repoInfo
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    // save the JSON response
    const languageData = await fetchLanguages.json();
    // console.log(languageData);
    // add each language to an array
    const languages = [];
    for (let language in languageData) {
        languages.push(language);
    }
    // console.log(languages);
    // call function to display specific repo info
    displayRepoInfo(repoInfo, languages);
};

// FUNCTION TO DISPLAY SPECIFIC REPO INFO
const displayRepoInfo = function (repoInfo, languages) {
    // clear any existing repo data
    repoData.innerHTML = "";
    // create a new div element to add repo info
    const newDiv = document.createElement("div");
    // add some new html
    newDiv.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
    // append the new div element to the "repo-data" section
    repoData.append(newDiv);
    // unhide the "repo-data" section
    repoData.classList.remove("hide");
    // hide the "repos" list
    repoList.classList.add("hide");
    // unhide the "back to repo gallery" button
    galleryReturn.classList.remove("hide");
};

// CLICK EVENT TO THE "BACK" BUTTON
galleryReturn.addEventListener("click", function () {
    // display repo section
    repoSection.classList.remove("hide");
    // hide individual repo data
    repoData.classList.add("hide");
    // hide the "back" button as well
    galleryReturn.classList.add("hide");
});