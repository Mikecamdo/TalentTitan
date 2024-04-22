import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const getAllProfessionals = () => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/professionals/get-all`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const getProfessionalInfo = (username: any) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/professionals/get-by-username`, username)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const updateProfessionalInfo = (username: any) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/professionals/update`, username)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const createProfessional = (professional: any) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/professionals/register`, professional)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const toggleJobMatching = (request: any) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/professionals/toggle-job-matching`, request)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

