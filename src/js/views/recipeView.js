import {elements, imageHTTPS} from './base';
import Fraction from 'fraction.js';

const formatQuant = quant => {
    const roundQuant = Math.round(quant*100)/100;
    const frac = new Fraction(roundQuant);
    return frac.toFraction(true);

}

const displayIng = recipe => {
    const inglist = recipe.ingredients.map(ing => {
        return `
        <div class="ingredient">
            <i class="far fa-check-circle"></i>
            <div class="quantity">${formatQuant(ing.quant)}</div>
            <div class="ingredientName"><span class="unit">${ing.unit}</span>${ing.ingredient}</div>
        </div>
        `
    });
    return inglist.join(' ');
}

export const clearRecipe = () => elements.recipeShowcase.innerHTML = '';

export const displayRecipe = (recipe,isliked=false) => {
    
    const html = `
    <div class="recipePhoto">
                <img src="${imageHTTPS(recipe.image_url)}" alt="" srcset="">
                <h1><span>${recipe.title}</span></h1>
            </div>
            <div class="recipeDetails">
                <div class="time">
                    <i class="far fa-clock"></i>
                    <span class="inputTime">${recipe.time}</span>
                    <span>minutes</span>
                </div>
                <div class="serving">
                    <i class="fas fa-user"></i>
                    <span class="inputPeople">${recipe.servings}</span>
                    <span>Servings</span>
                    <button class="plus">+</button>
                    <button class="minus">-</button>
                </div>
                <div class="heart">
                    <i class="fas fa-heart ${isliked?"liked":""}"></i>                    
                </div>
            </div>
            <div class="ingredientsList">
                ${displayIng(recipe)}
            </div>
            <div class="addBtnContainer">
                <button class="addBtn"><i class="fas fa-shopping-cart"></i>ADD TO SHOPING LIST</button>
            </div>
            <div class="directions">
                <h2>HOW TO COOK IT</h2>
                <div class="content">This recipe was carefully designed and tested by <span class="creator">${recipe.publisher}</span> .Please check out directions at their website.</div>
                <a href="${recipe.link}">
                <button class="dirButton">DIRECTIONS<i class="fas fa-play"></i></button>
                </a>
            </div>
    `;
    elements.recipeShowcase.insertAdjacentHTML('beforeend',html);
}

export const updateServings = (recipe) => document.querySelector('.inputPeople').textContent = recipe.servings;

export const updateIng = (recipe) => {
    const quantityDivs  = Array.from(document.querySelectorAll('.quantity'));
    quantityDivs.forEach((el,i) => {
        el.textContent = formatQuant(recipe.ingredients[i].quant);
    })
}