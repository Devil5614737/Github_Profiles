let searchBtn = document.getElementById("btn");

function getInput() {
  console.log('hello')
  let input = document.getElementById("input");
  input.addEventListener("input", (e) => {
    fetchData(e.target.value);
  });
}

getInput();

const debounce = function (cb, d) {
  let timer;
 return function (...args){
   if(timer) clearTimeout(timer)
   timer=setTimeout(()=>{
    cb(...args)
   },d)
 }
};

const myDebounce = debounce(getInput, 300);


async function fetchData(query = "") {
  const res = await fetch(`https://api.github.com/users/${query}`);
  const data = await res.json();
  displayData(data);
}
searchBtn.addEventListener("click", () => {
  fetchData();
});

function displayData(data) {
  let card = document.querySelector(".card");
  if (!data.message) {
    card.innerHTML = `<div class="imgContainer">
    <img src=${data.avatar_url} alt="user ">
    </div>
    <div class="info">
    <p class="username">${data.login}</p>
    <p class="bio">${data.bio}</p>
    <div class="stats">
        <p><span>${data.followers}</span>Followers</p>
        <div class="circle"></div>
        <p><span>${data.following}</span>Followings</p>
        <div class="circle"></div>
        <p><span>${data.public_repos}</span>Repositories</p>
    </div>
    </div>`;
    card.classList.remove("active");
  } else {
    card.classList.add("active");
  }
}

