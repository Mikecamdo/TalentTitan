import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const getAllEmployers = () => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/employers/get-all`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const getEmployerByUsername = (username: string) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/employers/get-by-username?username=${username}`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error);
    });
});

export const updateEmployer = (username: string, employer: any) => new Promise ((resolve, reject) => {
    axios.put(`${apiEndpoint}/employers/update?username=${username}`, employer)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error);
    });
});

export const createEmployer = (employer: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/employers/register`, employer)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

