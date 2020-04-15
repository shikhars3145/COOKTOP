import uniqid from 'uniqid';
export default class ShoppingList {
    constructor(){
        this.list = [];
    }

    addItems(quant, unit, ingredient) {
        const item = {
            id : uniqid(),
            quant,
            unit,
            ingredient
        };

        this.list.push(item);
        return item;
    }

    deleteItem(id) {
        const delInd = this.list.findIndex(el => el.id == id);
        this.list.splice(delInd,1);
    }

    updateQuantity(id,newQuant) {
        this.list.find(el => el.id == id).quant = newQuant;
    }
}