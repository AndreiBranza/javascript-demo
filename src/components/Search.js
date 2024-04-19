import {
    searchInputEl,
    searchFormEl,
    spinnerSearchEl,
    jobListSearchEl,
    numberEl,
    errorTextEl,
    errorEl
} from '../common.js'

const submitHandler = event => {
    // prevent default behavior
    event.preventDefault();

    // get search text
    const searchText = searchInputEl.value;

    // validation (regular expression example)
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);

    if(patternMatch) {
        errorTextEl.textContent = 'Your search may not contain Python';
        errorEl.classList.add('error--visible');
        setTimeout(() => errorEl.classList.remove('error--visible'), 3501);
        return;  
    }

    // blur input
    searchInputEl.blur();

    // remove previous job items
    jobListSearchEl.innerHTML = '';

    //render spinner
    spinnerSearchEl.classList.add('spinner--visible');

    //fetch search results
    fetch(`https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`)
        .then(response => {
            if(!response.ok) {
                console.log('Something went wrong.');
                return;
            }

            return response.json();
        })
        .then(data => {
            const { jobItems } = data;

            console.log(jobItems);

            //remove spinner
            spinnerSearchEl.classList.remove('spinner--visible');

            //render number of results
            numberEl.textContent = jobItems.length;

            //render job items in search job list
            jobItems.slice(0,7).forEach(element => {
                jobListSearchEl.insertAdjacentHTML('beforeend',
                `<li class="job-item">
                    <a class="job-item__link" href="${element.id}">
                        <div class="job-item__badge">${element.badgeLetters}</div>
                        <div class="job-item__middle">
                            <h3 class="third-heading">${element.title}</h3>
                            <p class="job-item__company">${element.company}</p>
                            <div class="job-item__extras">
                                <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${element.duration}</p>
                                <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${element.salary}</p>
                                <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${element.location}</p>
                            </div>
                        </div>
                        <div class="job-item__right">
                            <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                            <time class="job-item__time">${element.daysAgo}d</time>
                        </div>
                    </a>
                </li>`
            )
            });
        })
        .catch(error => {
            console.log(error);
        });

}

searchFormEl.addEventListener('submit', submitHandler);