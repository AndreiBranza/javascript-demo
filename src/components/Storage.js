import {
    state
} from '../common.js';

const storedJobs = localStorage.getItem('bookmarkedJobs');

if(storedJobs) {
    state.bookmarkJobItems = JSON.parse(storedJobs);
}