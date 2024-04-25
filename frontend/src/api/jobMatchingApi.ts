import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const addJobMatchingRequest = (professionalUsername: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/job-matching/add`, professionalUsername)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

