import {elements, displayLoader, clearLoader} from './views/base';
import Search from './models/Search';
import Recipe from './models/Recipe';
import ShoppingList from './models/ShoppingList';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';
import * as likesView from './views/likesView';


// global state
//search object
//curr recipe opject
// shopping list
//like list
const state = {};

const controlSearch = async () => {
    //get query from view
    const query = searchView.getQuery();
    if(query){
        //create new search object and add to state
        state.search = new Search(query);

        //clear recipe list TODO
        searchView.clearResults();
        displayLoader(elements.recipeListPanel);
        try {
            //search recipe
            await state.search.searchRecipe();

            //display results
            searchView.clearInput();
            clearLoader(elements.recipeListPanel);
            searchView.displayResults(state.search.result);
            if(state.recipe)
            searchView.highlightSelected(state.recipe.id);
        } catch (error) {
            alert(error);
            clearLoader(elements.recipeListPanel);
        }
    }
    

}

elements.searchForm.addEventListener('submit',e =>{
    e.preventDefault();
    controlSearch();
})

const pageClick = (event) => {
    const btn = event.target.closest('.pageBtnWrapper>button');
    if(btn)
    {
        const nextPage = btn.dataset.page;
        searchView.displayResults(state.search.result,parseInt(nextPage));
        
    }
}

elements.pageBtnWrapper.addEventListener('click',pageClick);

//RecipeControlled
const controlRecipe = async () => {
    const id = window.location.hash.replace('#','');
    if(id) {
        //prepare UI
        recipeView.clearRecipe();
        displayLoader(elements.recipeShowcase);

        //create new recipe object
        state.recipe  = new Recipe(id);
        searchView.highlightSelected(id);
        window.s = state;
        try {
            //get recipe data 
            await state.recipe.getRecipe();
            //display recipe
            state.recipe.parseIngredients();
            clearLoader(elements.recipeShowcase);
            if(state.likes)
            recipeView.displayRecipe(state.recipe,state.likes.isLiked(id));
            else
            recipeView.displayRecipe(state.recipe);
        } catch (error) {
            alert(error);
            clearLoader(elements.recipeShowcase);
        }
    }
   

}

//window.addEventListener('hashchange', controlRecipe);
['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));

const plusMinusClick = (event)=>{
    if(event.target.matches('.plus, .plus *')) {
        
        state.recipe.updateServings(true);
        
        
    }
    if(event.target.matches('.minus, .minus *')) {
        if(state.recipe.servings>1)
            state.recipe.updateServings(false);
    }
    if(state.recipe) {
        recipeView.updateIng(state.recipe);
        recipeView.updateServings(state.recipe);
    }
    
    
}

elements.recipeShowcase.addEventListener('click',plusMinusClick);

//shoppinglist

const controlList = event => {
    if (event.target.matches('.addBtn, .addBtn *')) {
        if(!state.shoppingList)
            state.shoppingList = new ShoppingList();
        state.recipe.ingredients.forEach(ingObj => {
            state.shoppingList.addItems(ingObj.quant, ingObj.unit, ingObj.ingredient);
        });
        state.shoppingList.list.forEach(item => {
            shoppingListView.displaySListItem(item);
        })
    }
}

const handleShopfuncs = (event)=>{
    const id  = event.target.closest('.ingredientCard').dataset.itemid;
    if(event.target.matches('.del, .del *')){
        state.shoppingList.deleteItem(id);
        shoppingListView.deleteSLitem(id);
    }
    else if(event.target.matches(".shopQuantity>input")) {
        const value = event.target.value;
        state.shoppingList.updateQuantity(id,value);
    }

    
    
}

elements.recipeShowcase.addEventListener('click', controlList)
elements.shoppingListPanel.addEventListener('click', handleShopfuncs)
window.s = state;

// likes controller

const controlLikes = (event) => {
    if(event.target.matches(".heart, .heart *")) {
        if(!state.likes)
            state.likes = new Likes()
        likesView.toggleLike()
        if(state.likes.isLiked(state.recipe.id)) {
            //remove from state
            state.likes.delLike(state.recipe.id);
            //remove from ui
            likesView.delLikeUi(state.recipe.id)

        }
        else {
            //toggle bottun ui

            //add to state
            const item = state.likes.addLike(
                state.recipe.id,
                state.recipe.title,
                state.recipe.publisher,
                state.recipe.image,
            )
            //add to UI
                likesView.addLikeUi(item);

        }

        likesView.toggleLikeMenu(state.likes.getLikeNums());
    }
}

elements.recipeShowcase.addEventListener('click', controlLikes);

const startup = ()=>{
    state.likes = new Likes();
    state.likes.restoreLike();
    if(state.likes)
    state.likes.list.forEach(item => {likesView.addLikeUi(item);})
    likesView.toggleLikeMenu(state.likes.getLikeNums());
}

window.addEventListener('load',startup);