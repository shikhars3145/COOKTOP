import { elements } from "./base";

export const displaySListItem = item => {
    const html = `
    <div class="ingredientCard" data-itemid="${item.id}">
        <div class="shopQuantity">
            <input type="number" value="${item.quant}" step="${item.quant}" class="shopQuanVal" min="0.1">
            <div class="shopUnit">${item.unit}</div>
        </div>
        <div class="shopItemName">${item.ingredient}</div>
        <div class="del"><i class="fas fa-times-circle"></i></div>
    </div>
    `;
    elements.shoppingListPanel.insertAdjacentHTML('beforeend',html);
}

export const deleteSLitem = id => {
    const item = document.querySelector(`[data-itemid=${id}]`);
    if(item)
        item.parentElement.removeChild(item);
}