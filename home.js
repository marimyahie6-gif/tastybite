function loadPopularRecipes() {
  const grid = document.getElementById("popularGrid");

  getAllRecipes()
    .then(function (recipes) {
      recipes.sort(function (a, b) {
        return b.rating - a.rating;
      });
      let top = recipes.slice(0,4);
      grid.innerHTML = top.map(buildRecipeCard).join("");
    })
    .catch(function (error) {
      console.error(error);
      grid.innerHTML = `
        <div class="state error">
          <h3>Could not load recipes</h3>
          <p>Please check your connection and try again.</p>
          <button class="btn primary-btn" onclick="loadPopularRecipes()">Retry</button>
        </div>`;
    });
}
loadPopularRecipes();
