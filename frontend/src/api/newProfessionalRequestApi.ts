import axios from 'axios';

const apiEndpoint = '//localhost:8080';

export const getAllNewProfessionals = () => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/new-professional/get-all`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const registerNewProfessional = (newProfessional: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/new-professional/register`, newProfessional)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const updateNewProfessional = (request: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/new-professional/update`, request)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const approveNewProfessional = (approval: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/new-professional/approve`, approval)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const denyNewProfessional = (denial: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/new-professional/deny`, denial)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});