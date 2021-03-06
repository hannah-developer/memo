import Memo from './Memo.js'

class MemoManager{
    constructor(){
        this.memoSection = document.querySelector('.memoSection')
        this.memos = null;
        this.selected = null;
        this.shiftX = null;
        this.shiftY = null;
        this.data = null;
        this.firstLoad = false;
    }

    updateData = (data) => {
        this.data = data;
        if(this.firstLoad === false){
            this.memos = this.data.map(data => new Memo(data.text, data.color, data.id, data.pageX, data.pageY));
            this.firstLoad = true;
        }
        this.listRender();
    }

    filterData = (data) => {
        this.firstLoad = false;
        this.data = data;
        this.memos = this.data.map(data => new Memo(data.text, data.color, data.id, data.pageX, data.pageY));
        this.firstLoad = true;
        this.listRender();
    }


    createMemo = (data) => {
        const memo = new Memo("", data.color, data.id, data.pageX, data.pageY);
        this.memos.push(memo);
        this.listRender();
    }

    deleteMemo(selected){
        const selectedId = this.memos.findIndex(data => data.memoId === +selected);
        this.memos.splice(selectedId, 1);
        this.listRender();
    }

    deleteAllMemo(){
        this.memos.splice(0);
        this.listRender();
    }

    updateMemo(selected, newValue){
        const selectedId = this.memos.findIndex(data => data.memoId === +selected);
        this.memos[selectedId].memoContents = newValue;
        this.listRender()
    }

    minimize(selected){
        let headerText = selected.querySelector('.headerText');
        const text = selected.querySelector('textarea').value;
        const firstLine = text.split('\n')[0];
        selected.children[1].style.display = "none";
        if(text){
            headerText.innerHTML = firstLine;
        } 
        selected.querySelector('.minimize').src = "images/maximize.svg";
        selected.querySelector('.minimize').dataset.name = 'maximize';
    }

    maximize(selected){
        selected.children[1].style.display = "block";
        selected.src = "images/minimize.svg";
        let headerText = selected.querySelector('.headerText');
        if(headerText){
            headerText.innerHTML = '';
        } 
        selected.querySelector('.minimize').src = "images/minimize.svg";
        selected.querySelector('.minimize').dataset.name = 'minimize';
    }

    bringFront(clickedItem){
        if(this.selected){
            this.selected.style.zIndex = 0;
        }
        this.selected = clickedItem; //store the previously clicked element
        this.selected.style.zIndex = 10;
    }

    dragStart(e){
        const id = e.target.dataset.id;
        e.dataTransfer.setData("text", id);
        this.shiftX = e.pageX - e.target.getBoundingClientRect().left;
        this.shiftY = e.pageY - e.target.getBoundingClientRect().top;
    }

    drop(selected, pageXValue, pageYValue){        
        selected.style.left = pageXValue;
        selected.style.top = pageYValue;
    }

    htmlPositionUpdate(selected, pageXValue, pageYvalue){
        selected.style.left = pageXValue;
        selected.style.top = pageYvalue;
    }
    
    listRender(){ //데이터를 받아서 리스트를 그려주는 역할
        const memosArray = this.memos.map(memo => memo.render()).join('');
        this.memoSection.innerHTML = memosArray;
    }
}


export default MemoManager;