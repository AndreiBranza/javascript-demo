import {
    jobDetailsContentEl,
    BASE_API_URL,
    getData,
    state
} from '../common.js'
import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';


const loadHashChangeHandler = async()=>{
    //get the id from the url
    const id = window.location.hash.substring(1);

    if(id) {
        //remove previous job details content
        jobDetailsContentEl.innerHTML = '';

        //add spinner
        renderSpinner('job-details');

        try {

            // fetch job item data
            const data = await getData(`${BASE_API_URL}/jobs/${id}`);
        
            //extract job item
            const { jobItem } = data;

            //update state
            state.activeJobItem = jobItem;
    
            //remove spinner
            renderSpinner('job-details');
    
            //render the job details
            renderJobDetails(jobItem);
    
        } catch(error) {
            renderSpinner('job-details');
            renderError(error.message);
        }
    }
}

window.addEventListener('DOMContentLoaded', loadHashChangeHandler);
window.addEventListener('hashchange', loadHashChangeHandler);