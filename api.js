const API_BASE ="https://dummyjson.com";
const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22400%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23FFEDD5%22/%3E%3C/svg%3E";

function getData(path) {
  return fetch(API_BASE + path).then(function (response) {
    if(response.ok===false){
        throw new Error("Request failed : " + response.status);
    }
    return response.json();
});
}
function getAllRecipes() {
  return getData("/recipes?limit=0")
  .then(function (data) {
    return data.recipes;
  });
}


function getRecipesById(id) {
  return getData("/recipes/" + id);
}

function setupMenu() {
    let menuBtn=document.getElementById("menuBtn");
    let navLinks=document.getElementById("navLinks");
    menuBtn.addEventListener("click",function(){
        navLinks.classList.toggle("open");
    });}
function setFooterYear() {
    document.getElementById("year").textContent = new Date().getFullYear();
}
function buildRecipeCard(recipe){
     let totalTime=recipe.cookTimeMinutes+recipe.prepTimeMinutes;
     let link="recipe-details.html?id="+recipe.id;

     return `
     <div class="recipe-card">
        <div class="recipe-card-image">
            <img src="${recipe.image}" alt="${recipe.name}">
            <img src="${FALLBACK_IMAGE}" alt="Fallback Image" class="fallback-image">
        </div>
       <div class="card-body">
        <div class="card-badges">
          <span class="badge">${recipe.cuisine}</span>
          <span class="badge alt">${recipe.mealType[0]}</span>
        </div>
        <h3><a class="card-title" href="${link}">${recipe.name}</a></h3>
        <div class="card-meta">
          <span class="rating"><span class="star">★</span> ${recipe.rating}</span>
          <span>${totalTime} min</span>
        </div>
        <a class="btn primary-btn small-btn" href="${link}">View Recipe</a>
      </div>
    </div>`;
}
document.addEventListener("DOMContentLoaded",function(){
    setupMenu();
    setFooterYear();
});