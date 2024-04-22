import {
    sortingEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    state
} from '../common.js';

import renderJobList from './JobList.js'

const clickHandler = event => {
    //get clicked button element
    const clickedButtonEl = event.target.closest('.sorting__button');

    //stop function if no clicked button element
    if(!clickedButtonEl) return;

    //check it intention is recent or relevancy
    const recent = clickedButtonEl.className.includes('--recent') ? true : false;

    //make sorting button look (in)active
    if(recent) {
        sortingBtnRecentEl.classList.add('sorting__button--active');
        sortingBtnRelevantEl.classList.remove('sorting__button--active');
    } else {
        sortingBtnRecentEl.classList.remove('sorting__button--active');
        sortingBtnRelevantEl.classList.add('sorting__button--active');
    }

    // sort job items
    if (recent) {
        state.searchJobItems.sort((a, b)=> {
            return a.daysAgo - b.daysAgo;
        });
    } else {
        state.searchJobItems.sort((a, b) => {
            return b.relevanceScore - a.relevanceScore;
        });
    }

    

    //render job items in list
    renderJobList();

}

sortingEl.addEventListener('click', clickHandler);