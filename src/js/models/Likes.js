export default class Likes {
    constructor(){
        this.list = [];
    }

    addLike(id,title,publisher,image) {
        const likeItem = {id,title,publisher,image};
        this.list.push(likeItem);
        this.storeLikes();
        return likeItem
    }

    delLike(id) {
       const index = this.list.findIndex(el => el.id===id);
       this.list.splice(index,1);
       this.storeLikes();
    }

    isLiked(id) {
        return this.list.findIndex(el => el.id==id) !== -1;
    }

    getLikeNums() {
        if(!this.list)
        return 0;
        return this.list.length;
    }
    storeLikes() {
        localStorage.setItem("likes", JSON.stringify(this.list));
    }

    restoreLike() {
        const storedLikes = JSON.parse(localStorage.getItem("likes"))
        if(storedLikes)
        this.list = storedLikes;
    }
} 