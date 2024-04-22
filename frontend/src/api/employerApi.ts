import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const getAllEmployers = () => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/employers/get-all`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const getEmployerByUsername = (username: any) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/employers/get-by-username`, username)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const updateEmployer = (username: any, employer: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/employers/update`, username, employer)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const createEmployer = (employer: any) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/employers/register`, employer)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

