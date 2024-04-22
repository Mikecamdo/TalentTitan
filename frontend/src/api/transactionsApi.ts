import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const displayTransactions = () => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/transactions`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

