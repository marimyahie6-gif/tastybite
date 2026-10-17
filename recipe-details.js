let detailRoot=document.getElementById("detailsRoot");

function showError (title,message){
    detailRoot.innerHTML=
    '<div class ="state error">' +
    "<h3>" + title + "</h3>"+
    "<p>" + message + "</p>"+
      '<a href="recipes.html" class="btn primary-btn">Back to Recipes</a>' +
    "</div>";
}

function buildList(items){
    let html="";
    for(let i=0;i<items.length;i++){
        html+="<li>"+items[i]+"</li>";
    }
    return html;
}
function showRecipe(recipe){
    document.title=recipe.name+"| TastyBite";
    let totalTime= recipe.prepTimeMinutes + recipe.cookTimeMinutes;
    let badges='<span class="badge">'+recipe.cuisine+'</span>';
    for(let i=0;i<recipe.mealType.length;i++){
        badges+='<span class="badge">'+recipe.mealType[i]+'</span>';
    }
    detailRoot.innerHTML=`
    <div class="details-grid">
      <img src="${recipe.image}" alt="${recipe.name}"
           onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}'">
      <div class="details-info">
        <div class="card-badges">${badges}</div>
        <h1>${recipe.name}</h1>
        <div class="rating-line rating">
          <span class="star">★</span> ${recipe.rating}
          <span style="color:var(--muted);font-weight:400">(${recipe.reviewCount} reviews)</span>
        </div>
        <div class="stats">
          <div class="stat"><span>Prep Time</span><strong>${recipe.prepTimeMinutes} min</strong></div>
          <div class="stat"><span>Cook Time</span><strong>${recipe.cookTimeMinutes} min</strong></div>
          <div class="stat"><span>Total Time</span><strong>${totalTime} min</strong></div>
          <div class="stat"><span>Servings</span><strong>${recipe.servings}</strong></div>
          <div class="stat"><span>Difficulty</span><strong>${recipe.difficulty}</strong></div>
          <div class="stat"><span>Calories</span><strong>${recipe.caloriesPerServing} kcal</strong></div>
        </div>
      </div>
    </div>

    <div class="details-lists">
      <section class="panel">
        <h2>Ingredients</h2>
        <ul>${buildList(recipe.ingredients)}</ul>
      </section>
      <section class="panel">
        <h2>Instructions</h2>
        <ol>${buildList(recipe.instructions)}</ol>
      </section>
    </div>

    <div class="back-wrap"><a href="recipes.html" class="btn secondary-btn">Back to Recipes</a></div>`;
}
function loadRecipe(){
    let params=new URLSearchParams(window.location.search);
    let id=params.get("id");
     
    if(id===null || id===""){
        showError("Recipe Not Found", "The requested recipe could not be found.");
        return;
    }

    getRecipesById(id)
    .then(function(recipe){
        showRecipe(recipe);
    })
    .catch(function(error){
        console.error(error);
        showError("Error Loading Recipe", "An error occurred while loading the recipe. Please try again later.");
    });
}

loadRecipe();