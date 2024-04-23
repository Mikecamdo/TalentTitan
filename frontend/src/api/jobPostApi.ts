import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const getJobPostByCompany = (employerUsername: any) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/job-posts/get-by-company`, employerUsername)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const addJobPost = (jobPost: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/job-posts/add`, jobPost)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const updateJobPost = (jobPost: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/job-posts/update`, jobPost)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

