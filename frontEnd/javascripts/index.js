import FetchClass from "./FetchClass.js";
import MemoManager from "./MemoManager.js";
import ContextMenu from "./ContextMenu.js";
import BgMenu from "./BgMenu.js";
import PostItMenu from "./PostItMenu.js";

const memoSection = document.querySelector(".memoSection");
const body = document.querySelector("body");
const memoApp = new MemoManager();
const fetchClass = new FetchClass();
fetchClass.getData(memoApp.updateData);
const postItMenu = new PostItMenu(memoApp.updateData, memoSection);
const bgMenu = new BgMenu(memoApp.updateData, memoSection);
const filterSection = document.querySelector(".memoList");

function getColor() {
    const colors = ["lightblue", "blue", "brightred", "lightpink"];
    const index = Math.floor(Math.random() * 4);
    return colors[index];
}

body.addEventListener("click", e => {
    switch (e.target.dataset.name) {
        case "create":
            fetchClass.createMemo(
                getColor(),
                e.clientX,
                e.clientY,
                memoApp.createMemo
            );
            break;
        case "deleteAll":
            fetchClass.deleteAllMemo().then(text => {
                if (text === "success") {
                    memoApp.deleteAllMemo();
                }
            });
            break;
        case "delete":
            fetchClass.deleteMemo(+e.target.dataset.id).then(text => {
                if (text === "success") {
                    memoApp.deleteMemo(e.target.dataset.id);
                }
            });
            break;
        case "minimize":
            memoApp.minimize(e.target.parentElement.parentElement);
            break;
        case "maximize":
            memoApp.maximize(e.target.parentElement.parentElement);
            break;
        case "post":
            memoApp.bringFront(postItMenu.targetConvert(e.target));
            break;
        default:
            ContextMenu.remove();
            return;
    }
});

memoSection.addEventListener("contextmenu", e => {
    e.preventDefault();
    let clickedItem = "";
    if (e.target.tagName === "HEADER") {
        clickedItem = e.target.parentElement;
        postItMenu.rightButtonClick(clickedItem, e.clientY, e.clientX);
    } else if (
        e.target.tagName === "TEXTAREA" ||
        e.target.tagName === "ARTICLE"
    ) {
        clickedItem = e.target.parentElement.parentElement.parentElement;
        postItMenu.rightButtonClick(clickedItem, e.clientY, e.clientX);
    } else if (e.target.className === "memoSection") {
        clickedItem = e.target;
        bgMenu.rightButtonClick(e.clientY, e.clientX);
    } else {
        return;
    }
});

memoSection.addEventListener("change", ({ target }) => {
    if (target.tagName == !"TEXTAREA") {
        return;
    }
    memoApp.updateMemo(target.dataset.id, target.value);
    fetchClass.updateMemo(target.dataset.id, target.value);
});

memoSection.addEventListener("dragstart", e => {
    if (e.target.className == !"post") {
        return;
    }
    memoApp.dragStart(e);
});

memoSection.addEventListener("dragover", e => {
    e.preventDefault();
    if (e.target.className == !"post") {
        return;
    }
});

memoSection.addEventListener("drop", e => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const selected = document.querySelector(`[data-id="${id}"]`);
    const pageXValue = e.pageX - 200 - memoApp.shiftX + "px";
    const pageYValue = e.pageY - memoApp.shiftY + "px";
    memoApp.drop(selected, pageXValue, pageYValue);
    fetchClass.pageUpdate(selected, pageXValue, pageYValue, memoApp.updateData);
});

filterSection.addEventListener("click", ({ target }) => {
    if (target.tagName === "SECTION" || target.tagName === "UL") {
        return;
    }
    if (target.dataset.name === "all") {
        fetchClass.getData(memoApp.filterData);
    } else {
        fetchClass.colorFilter(target.dataset.name, memoApp.filterData);
    }
});
