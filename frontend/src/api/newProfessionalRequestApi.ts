import axios from 'axios';

const apiEndpoint = '//localhost:8080';

export const getAllNewProfessionals = () => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/new-professional/get-all`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const approveNewProfessional = (username: string) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/new-professional/approve`, username)
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

export const registerNewProfessional = (newProfessional: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/new-professional/register`, newProfessional)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});