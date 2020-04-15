import axios from 'axios'
export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.publisher = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.link = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            this.SetTime();
            this.SetServings()
        } catch (error) {
            alert(error);
        }
    }

    SetTime() {
        const ingLen = this.ingredients.length;
        const frac = Math.ceil(ingLen/3);
        this.time = frac * 15;

    }

    SetServings() {
        this.servings = 4;
    }

    parseIngredients() {

        const unitsLong = ['tablespoons','tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups' , 'pounds']
        const unitsShort = ['tbsp','tbsp','oz','oz', 'tsp', 'tsp', 'cup', 'pound','kg','g'];

        const newIngredients = this.ingredients.map(el => {
            //uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit,i) => {
                ingredient  = ingredient.replace(unit,unitsShort[i]);
            });
            //remove parenthesis
            ingredient = ingredient.replace(/\s*\((.*)\)\s*/g,' ')
            ingredient = ingredient.replace('-','+');
            //turn into count unit ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(u => unitsShort.includes(u));
            let ingObj;
            if(unitIndex>-1)
            {
                ingObj = {
                    quant : arrIng.slice(0,unitIndex).join('+'),
                    unit : arrIng[unitIndex],
                    ingredient : arrIng.slice(unitIndex+1).join(' ')
                }

                if(ingObj.quant=='')
                ingObj.quant = "1";
                else
                ingObj.quant = eval(ingObj.quant);

            }
            else if(parseInt(arrIng[0],10))
            {
                ingObj = {
                    quant : eval(arrIng[0]),
                    unit : '',
                    ingredient : arrIng.slice(1).join(' ')
                }
            }
            else if(unitIndex == -1)
            {
                ingObj = {
                    quant : eval('1'),
                    unit : '',
                    ingredient
                }
            }
            return ingObj;
        })

        this.ingredients = newIngredients;
    }

    updateServings(isInc) {
        const newServing = isInc?this.servings+1:this.servings-1;

        this.ingredients.forEach(ingObj => {ingObj.quant*= newServing/this.servings;});

        this.servings = newServing;
        
    }
}