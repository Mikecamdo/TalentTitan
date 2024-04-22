import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const getAllNewEmployers = (request: any) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/new-employer/get-all`, request)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const approveNewEmployer = (username: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/new-employer/approve`, username)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const updateNewEmployer = (request: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/new-employer/update`, request)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const registerNewEmployer = (newEmployer: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/new-employer/register`, newEmployer)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});