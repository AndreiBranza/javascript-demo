import {
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    BASE_API_URL
} from '../common.js'

import renderSpinner from './Spinner.js';
import renderError from './Error.js';
import renderJobList from './JobList.js';

const submitHandler = async event => {
    // prevent default behavior
    event.preventDefault();

    // get search text
    const searchText = searchInputEl.value;

    // validation (regular expression example)
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);

    if(patternMatch) {
        renderError('Your search may not contain numbers');
        return;  
    }

    // blur input
    searchInputEl.blur();

    // remove previous job items
    jobListSearchEl.innerHTML = '';

    //render spinner
    renderSpinner('search');

    try {
        
        //fetch search results
        const response = await fetch(`${BASE_API_URL}/jobs?search=${searchText}`);
        const data = await response.json();

        if(!response.ok) {
            throw new Error(data.description);
        }
    
        const { jobItems } = data;
    
        console.log(jobItems);
    
        //remove spinner
        renderSpinner('search');
    
        //render number of results
        numberEl.textContent = jobItems.length;
    
        //render job items in search job list
        renderJobList(jobItems);

    } catch(error) {
            renderSpinner('search');
            renderError(error.message);
    }
}

searchFormEl.addEventListener('submit', submitHandler);