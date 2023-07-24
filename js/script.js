// GLOBAL VARIABLES
// the div with profile information
const overviewDiv = document.querySelector(".overview");
// github username
const username = "alecoad";

// FETCH API JSON DATA
const getData = async function () {
    // fetch info from "username"'s github profile
    const response = await fetch(`https://api.github.com/users/${username}`);
    const user = await response.json();
    console.log(user);
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
};