import {elements, imageHTTPS} from './base'

export const highlightSelected = (id) => {
    if(id){
        if(document.querySelectorAll('.card'))
            document.querySelectorAll('.card').forEach(el=> el.classList.remove('activeCard'));
        if(document.querySelector(`.recipeList a[href="#${id}"`))
            document.querySelector(`.recipeList a[href="#${id}"`).firstElementChild.classList.add('activeCard');
    }
}

export const getQuery = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.recipeListPanel.innerHTML = '';
    elements.pageBtnWrapper.innerHTML = '';
}

export const clipTitles = (title, limit = 17)  =>
{
    const clippedTitle = [];
    if(title.length > limit)
    {
        title.split(' ').reduce((acc,cur)=>{
            if(acc+cur.length<17)
            {
                clippedTitle.push(cur);
            }
            return acc+cur.length;
        }, 0)

        return `${clippedTitle.join(' ')}...`

    }
    return title;
} 

const displayRecipeCard = (recipe) => {
    const markup = `
    <a class = 'card-link' href="#${recipe.recipe_id}">
        <div class="card">
            <img src="${imageHTTPS(recipe.image_url)}" alt="${clipTitles(recipe.title)}" srcset="">
            <div class="cardTitle">${clipTitles(recipe.title)}</div>
            <div class="cardSubtitle">${recipe.publisher}</div>
        </div>
    </a>
    `
    elements.recipeListPanel.insertAdjacentHTML('beforeend',markup);

}

const diplayPageButtons = (cur, total) =>
{
    
    if(cur === 1)
    {
        //display next
    
        elements.pageBtnWrapper.insertAdjacentHTML('beforeend',`
        <button class="next" data-page="${cur+1}">PAGE <span>${cur+1}</span> &gt;  </button>
        `)


    }
    else if(cur === total)
    {
        //display prev
        
        elements.pageBtnWrapper.insertAdjacentHTML('beforeend',`
        <button class="prev" data-page="${cur-1}">&lt; PAGE <span>${cur-1}</span> </button>
        `)
    }
    else{
        //display both
        
        elements.pageBtnWrapper.insertAdjacentHTML('beforeend',`
        <button class="prev" data-page="${cur-1}">&lt; PAGE <span>${cur-1}</span> </button>
        <button class="next" data-page="${cur+1}">PAGE <span>${cur+1}</span> &gt;  </button>
        `)
    }
}

export const displayResults = (recipes, page = 1, cardsPerPage = 10) => {
    clearResults();
    const start = (page - 1)*cardsPerPage;
    const end = page * cardsPerPage;
    recipes.slice(start,end).forEach(displayRecipeCard);
    diplayPageButtons(page,Math.ceil(recipes.length/cardsPerPage));
}