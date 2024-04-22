import {
    sortingEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl
} from '../common.js';

const clickHandler = event => {
    //get clicked button element
    const clickedButtonEl = event.target.closest('sorting__button');

    //stop function if no clicked button element
    if(!clickedButtonEl) return;

    //check it intention is recent or relevancy
    const recent = clickedButtonEl.className.includes('--recent') ? true : false;

    // sort job items
    if (recent) {
        
    } else {

    }
}

sortingEl.addEventListener('click', clickHandler);