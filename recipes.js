let PER_PAGE=10;
let currentPage=1;
let searchText="";
let allRecipes=[];
let filteredRecipes=[];


let recipesGrid=document.getElementById("recipesGrid");
let resultsCount=document.getElementById("resultsCount");
let pagination = document.getElementById("pagination");
let searchInput = document.getElementById("searchInput");
let mealFilter = document.getElementById("mealFilter");
let cuisineFilter = document.getElementById("cuisineFilter");
let sortSelect = document.getElementById("sortSelect");



function fillFilters(){
    let meals =[];
    let cuisines =[];

    for( let i=0;i<allRecipes.length;i++){
        let recipe=allRecipes[i];
        for(let j=0;j<recipe.mealType.length;j++){
            let meal=recipe.mealType[j];
            if( meals.indexOf(meal)===-1){
                meals.push(meal);
            } 
        }
        if( cuisines.indexOf(recipe.cuisine)===-1){
            cuisines.push(recipe.cuisine);
        }
    }
    meals.sort();
    cuisines.sort();

    for( let m=0;m<meals.length;m++){
        mealFilter.innerHTML+=`<option value="${meals[m]}">${meals[m]}</option>`;
    }
    for( let c=0;c<cuisines.length;c++){
        cuisineFilter.innerHTML+=`<option value="${cuisines[c]}">${cuisines[c]}</option>`;
    }
}

function applyFilters(){
    let meal=mealFilter.value;
    let cuisine=cuisineFilter.value;
    let sort=sortSelect.value;
    let text=searchText.value.trim().toLowerCase();
     
    filteredRecipes=allRecipes.filter(function(recipe){
        let nameOk=recipe.name.toLowerCase().includes(text);
        let mealOk=meal==="" || recipe.mealType.includes(meal);
        let cuisineOk=cuisine==="" || recipe.cuisine===cuisine;
        return nameOk && mealOk && cuisineOk;
    });
    if(sort==="name"){
        filteredRecipes.sort(function(a,b){
            return a.name.localeCompare(b.name);
        });
    } else if(sort==="rating"){
        filteredRecipes.sort(function(a,b){
            return b.rating-a.rating;
        });
    }
    currentPage=1;
    showPage();}
    function showPage(){
        let total=filteredRecipes.length;

        if(total===0){
            resultsCount.textContent="0 recipes found";
            recipesGrid.innerHTML=
            '<div class ="state">' +
            "<h3>No recipes found</h3>" +
            "<p>Try adjusting your search or filters.</p>" +
            "</div>";
            pagination.innerHTML="";
            return;

        }
        let totalPages=Math.ceil(total/PER_PAGE);
        let start=(currentPage-1)*PER_PAGE;
        let pageRecipes=filteredRecipes.slice(start,start+PER_PAGE);
         resultsCount.textContent="Showing " + pageRecipes.length + " of " + total + " recipes";
        recipesGrid.innerHTML=pageRecipes.map(buildRecipeCard).join("");
        showPagination(totalPages);
    }
function showPagination(totalPages){
    pagination.innerHTML=  
    '<button class="btn secondary-btn small-btn" id="prevBtn">Previous</button>' +
    '<span class="page-status">Page ' + currentPage + " of " + totalPages + "</span>" +
    '<button class="btn secondary-btn small-btn" id="nextBtn">Next</button>';
    let prevBtn=document.getElementById("prevBtn");
    let nextBtn=document.getElementById("nextBtn");
    prevBtn.disabled=currentPage===1;
    nextBtn.disabled=currentPage===totalPages;
    prevBtn.addEventListener("click",function(){
        currentPage=currentPage-1;
        showPage();
    });
    nextBtn.addEventListener("click",function(){
        currentPage=currentPage+1;
        showPage();
    });
}
document.getElementById("toolbar").addEventListener("submit",function(event){
    event.preventDefault();
    searchText.value=searchInput.value.trim();
    applyFilters();
});
document.getElementById("clearBtn").addEventListener("click",function(){
    searchInput.value="";
    mealFilter.value="";
    searchText="";
    cuisineFilter.value="";
    sortSelect.value="default";
    applyFilters();
});
mealFilter.addEventListener("change",applyFilters);
cuisineFilter.addEventListener("change",applyFilters);
sortSelect.addEventListener("change",applyFilters);


getAllRecipes()
.then(function(recipes){
    allRecipes=recipes;
    fillFilters();
    applyFilters();
})
.catch(function(){
    resultsCount.textContent="";
    recipesGrid.innerHTML=
 '<div class="state error">' +
      "<h3>Could not load recipes</h3>" +
      "<p>Something went wrong while contacting the API. Please try again.</p>" +
      '<button class="btn primary-btn" onclick="location.reload()">Retry</button>' +
      "</div>";
});