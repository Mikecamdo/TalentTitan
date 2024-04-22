import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const getBalance = (userId: any) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/balances/get-by-user`, userId)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const updateBalance = (balanceId: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/balances/update`, balanceId)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const addBalance = (balanceId: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/balances/add`, balanceId)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const payBalance = (balanceId: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/balances/pay`, balanceId)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});