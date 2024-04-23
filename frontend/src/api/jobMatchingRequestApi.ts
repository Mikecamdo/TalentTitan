import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const getJobMatchingRequests = () => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/job-matching-requests/get-all`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const addJobMatchingRequest = (professionalUsername: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/job-matching-requests/add`, professionalUsername)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const approveJobMatchingRequest = (professionalUsername: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/job-matching-requests/update`, professionalUsername)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

