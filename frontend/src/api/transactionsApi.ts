import axios from 'axios';

const apiEndpoint = '//localhost:8080';

export const getUserTransactions = (username: String) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/transactions/get-by-user?username=${username}`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

