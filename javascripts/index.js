import MemoManager from './MemoManager.js'
import ContextMenu from './ContextMenu.js'
import LocalStorageClass from './LocalStorageClass.js'
import BgMenu from './BgMenu.js'

const memoSection = document.querySelector('.memoSection')
const contextMenu = new ContextMenu(memoSection)
const localStorageClass = new LocalStorageClass()
const data = localStorageClass.getData()
const memoApp = new MemoManager(data)
const bgMenu = new BgMenu(memoSection)

const contextMenuDiv = document.querySelector('.contextMenu');
let rightClick = null;


memoSection.addEventListener('click', ({target})=>{
        switch(target.dataset.name){
            case "create":
                memoApp.createMemo()
                break;
            case "remove":
                memoApp.removeMemo(target.dataset.id)
                break;
            case "minimize":
                memoApp.minimize(target)
                break;
            case "maximize":
                memoApp.maximize(target)
                break;
            case "post":
                let clickedItem ="";
                if(target.tagName === "HEADER"){
                    clickedItem = target.parentElement
                } else if (target.tagName === "TEXTAREA" || target.tagName === "ARTICLE") {
                    clickedItem = target.parentElement.parentElement.parentElement
                }
                memoApp.bringFront(clickedItem)
                break;
            default:
                contextMenuDiv.classList.remove('menuShow')
                return;
        }
    })

    
memoSection.addEventListener('contextmenu', (e)=>{
    e.preventDefault(); 
    let clickedItem = ""

    if(e.target.tagName === "HEADER"){
        clickedItem = e.target.parentElement
        contextMenu.rightButtonClick(clickedItem, e.clientY, e.clientX)
    } else if (e.target.tagName === "TEXTAREA" || e.target.tagName === "ARTICLE") {
        clickedItem = e.target.parentElement.parentElement.parentElement
        contextMenu.rightButtonClick(clickedItem, e.clientY, e.clientX)
    } 
    
    else if (e.target.className = "memoSection"){
        clickedItem = e.target;
        bgMenu.rightButtonClick(clickedItem, e.clientY, e.clientX)
    } else{
        return;
    }
    rightClick = clickedItem;
    
})

contextMenuDiv.addEventListener('click', ({target})=>{
    switch(target.dataset.name){
        case "color":
            contextMenu.memoColorChange(target.className)
            localStorageClass.colorChange(rightClick, target.className)
            break;
    }   
})


memoSection.addEventListener('change', ({target})=>{
    switch(target.tagName){
        case "TEXTAREA":
            memoApp.updateMemo(target.dataset.id, target.value);
            data[target.dataset.id].text = target.value
            break;
    }    
}) 

memoSection.addEventListener('dragstart',(e)=>{
    if(!e.target.className === 'post'){
        return;
    } 
    memoApp.dragStart(e)
})

memoSection.addEventListener('dragover',(e)=>{
    e.preventDefault();
    if(!e.target.className === 'post'){
        return;
    }
})

memoSection.addEventListener('drop', (e)=>{
    e.preventDefault();
    const id = e.dataTransfer.getData("text")
    let selected = document.querySelector(`[data-id="${id}"]`)    
    let pageXValue = e.pageX-200 - memoApp.shiftX + "px";
    let pageYValue = e.pageY - memoApp.shiftY + "px";

    memoApp.drop(selected, pageXValue, pageYValue)
    localStorageClass.pageUpdate(selected, pageXValue, pageYValue)
})


document.addEventListener('scroll', (e)=>{
    contextMenuDiv.classList.remove('menuShow')
})