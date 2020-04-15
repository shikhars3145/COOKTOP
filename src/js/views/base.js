export const elements = {
    searchForm : document.querySelector('.search'),
    searchInput : document.querySelector('.search>input'),
    recipeListPanel : document.querySelector('.recipeListPanel'),
    pageBtnWrapper : document.querySelector('.pageBtnWrapper'),
    recipeShowcase : document.querySelector('.recipeShowcase'),
    shoppingListPanel : document.querySelector('.shoppingListPanel'),
    likeListPanel : document.querySelector('.likeListPanel'),
    likeMenu : document.querySelector('.like')
};

export const displayLoader = parent => {
    parent.insertAdjacentHTML('afterbegin', `
    <div class = "loader">
    <i class="fas fa-sync-alt"></i>
    </div>
    `)
}

export const clearLoader = parent => {
    parent.innerHTML = '';
}