import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const attemptSignIn = (loginRequest: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/users/login`, loginRequest)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});