const searchbtn = document.querySelector(".searchbtn");
const searchbox = document.querySelector(".searchbox");
const recipecontainer = document.querySelector(".recipe-container");
const recipedetailscontent = document.querySelector(".recipe-details-content");
const recipeclosebtn = document.querySelector(".recipe-close-btn");

//function for api
const fetchapi = async (query) => {
    recipecontainer.innerHTML = "<h2>Fetching ur recipe</h2>";
    try {
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        let response = await data.json();
        recipecontainer.innerHTML = "";

        response.meals.forEach(arr => {
            const recipediv = document.createElement("div");
            recipediv.classList.add("recipe");
            recipediv.innerHTML = `
        <img src = "${arr.strMealThumb}">
        <h3>${arr.strMeal}</h3>
        <p><span>${arr.strArea}</span> Dish</p>
        <p>belongs to <span>${arr.strCategory}</span> Category</p>
     `
            const button = document.createElement("button");
            button.textContent = "View Recipe"
            recipediv.appendChild(button);
            //  add event listener
            button.addEventListener("click", () => {
                openrecipepopup(arr);
            });
            recipecontainer.appendChild(recipediv);
        });
    }
    catch (error) {
        recipecontainer.innerHTML = "<h2>Error in searching recipe!</h2>";
    }
    // console.log(response);
}
const fetchingingredients = (arr) => {
    // console.log(arr);
    let ingredientlist = "";
    for (let index = 1; index <= 20; index++) {
        const ingredients = arr[`strIngredient${index}`];
        if (ingredients) {
            const measure = arr[`strMeasure${index}`];
            ingredientlist += `<li>${measure} ${ingredients}</li>`
        }
        else {
            break;
        }
    }
    return ingredientlist;
}
const openrecipepopup = (arr) => {
    recipedetailscontent.innerHTML = `
    <h2 class = "recipename">${arr.strMeal}</h2>
    <h3>ingredients</h3
    <ul class = "ingredientlist">${fetchingingredients(arr)}
    <div class = "instructions">
    <h3>instructions</h3>
    <p>${arr.strInstructions}</p>
    </div>`;
    recipedetailscontent.parentElement.style.display = "block";
}
recipeclosebtn.addEventListener("click", () => {
    recipedetailscontent.parentElement.style.display = "none";
})
searchbtn.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log("clicked");
    const searchinpt = searchbox.value.trim();
    if (!searchinpt) {
        recipecontainer.innerHTML = `<h2>Type the meal in search</h2>`;
        return;
    }
    fetchapi(searchinpt);
});