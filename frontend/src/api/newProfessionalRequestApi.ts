import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const getAllNewProfessionals = (request: any) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/new-professional/get-all`, request)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const approveNewProfessional = (username: any) => new Promise ((resolve, reject) => {
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

export const registerNewProfessional = () => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/new-professional/register`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});