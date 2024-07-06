const appId = '1055798523759844273';

// レシピカテゴリを取得する
async function fetchCategories() {
    const response = await fetch(`https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=${appId}`);
    const data = await response.json();
    return data.result.large;
}

// カテゴリのレシピ一覧を取得する
async function fetchRecipes(categoryId) {
    const response = await fetch(`https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${appId}&categoryId=${categoryId}`);
    const data = await response.json();
    return data.result;
}

// カテゴリを表示する
function displayCategories(categories) {
    const categoryTags = document.getElementById('category-tags');
    categoryTags.innerHTML = '';

    categories.forEach(category => {
        const tag = document.createElement('div');
        tag.className = 'category-tag';
        tag.textContent = category.categoryName;
        tag.onclick = () => loadRecipes(category.categoryId);
        categoryTags.appendChild(tag);
    });
}

// レシピを表示する
function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.className = 'recipe-item';

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.foodImageUrl;
        recipeImage.alt = recipe.recipeTitle;

        const recipeTitle = document.createElement('h3');
        recipeTitle.textContent = recipe.recipeTitle;

        const recipeDescription = document.createElement('p');
        recipeDescription.textContent = recipe.recipeDescription;

        recipeItem.appendChild(recipeImage);
        recipeItem.appendChild(recipeTitle);
        recipeItem.appendChild(recipeDescription);

        recipeItem.onclick = () => window.location.href = recipe.recipeUrl;

        recipeList.appendChild(recipeItem);
    });
}

// 初期データのロード
async function loadInitialData() {
    const categories = await fetchCategories();
    displayCategories(categories);
}

// レシピのロード
async function loadRecipes(categoryId) {
    const recipes = await fetchRecipes(categoryId);
    displayRecipes(recipes);
}

document.addEventListener('DOMContentLoaded', loadInitialData);
