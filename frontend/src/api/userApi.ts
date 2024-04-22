import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const attemptSignIn = (loginRequest: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/users/login`, loginRequest)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const updatePassword = (loginRequest: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/users/update-password`, loginRequest)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const updateUser = (user: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/users/update`, user)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const attemptRegister = (user: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/users/register`, user)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});