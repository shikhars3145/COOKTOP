import { elements, imageHTTPS } from "./base";
import { clipTitles } from "./searchView";


export const addLikeUi = item => {
    const html = `
    <a class = 'card-link' href="#${item.id}">
    <div class="card" data-itemid="${item.id}">
        <img src="${imageHTTPS(item.image)}" alt="" srcset="">
        <div class="cardTitle">${clipTitles(item.title)}</div>
        <div class="cardSubtitle">${item.publisher}</div>
    </div>
    </a>
    `;
    elements.likeListPanel.insertAdjacentHTML('beforeend',html);
}

export const delLikeUi = id => {
    
    const item = document.querySelector(`.likeListPanel  [data-itemid = "${id}"]`).closest('.card-link')
    if(item)
    item.parentElement.removeChild(item);
}

export const toggleLike = () => {
    document.querySelector('.heart>i').classList.toggle('liked');
}

export const toggleLikeMenu = (nums) => {
    if(nums>0)
    elements.likeMenu.style.opacity = "1";
    else
    elements.likeMenu.style.opacity = "0";
}
