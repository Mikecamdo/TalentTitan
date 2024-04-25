import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const getBalance = (userId: any) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/balances/get-by-user`, { params: { userId } })
    .then(response => resolve(response.data))
    .catch(error => {
        reject(error.response.data);
    });
});


export const updateBalance = (balanceData: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/balances/update`, balanceData)
    .then(response => resolve(response.data))
    .catch(error => {
        reject(error.response.data);
    });
});

export const addBalance = (balanceData: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/balances/add`, balanceData)
    .then(response => resolve(response.data))
    .catch(error => {
        reject(error.response.data);
    });
});

export const payBalance = (balanceData: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/balances/pay`, balanceData)
    .then(response => resolve(response.data))
    .catch(error => {
        reject(error.response.data);
    });
});
