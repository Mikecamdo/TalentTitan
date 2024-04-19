import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const getBalance = (userId: any) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/balance`, userId)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const updateBalance = (userId: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/balance`, userId)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

// export const getBalance = (userId: any) => new Promise ((resolve, reject) => {
//     axios.get(`${apiEndpoint}/balance`, userId)
//     .then(response => resolve(response.data))
//     .catch(error => {
//         resolve(error.response.data);
//     });
// });