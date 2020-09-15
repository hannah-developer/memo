class ContextMenu{
    constructor(){
        this.clickedItem = null;
    }

    memoColorChange(colorName){
        this.clickedItem.classList.remove(`${this.clickedItem.dataset.color}`)
        this.clickedItem.classList.add(`${colorName}`)
        this.clickedItem.dataset.color = `${colorName}`
    }

    rightButtonClick(clickedItem, clientY,clientX){
        this.clickedItem = clickedItem
        const contextMenu = document.querySelector('.contextMenu');
        contextMenu.style.top = clientY + "px";
        contextMenu.style.left = clientX + "px";
        contextMenu.classList.add('menuShow')
    }

}

export default ContextMenu;
