import axios from 'axios';

const apiEndpoint = '//localhost:8080';

export const getBalance = (username: string) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/balances/get-by-user?username=${username}`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const updateBalance = (balance: any) => new Promise ((resolve, reject) => {
    axios.put(`${apiEndpoint}/balances/update`, balance)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const addBalance = (balance: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/balances/add`, balance)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const payBalance = (payment: any) => new Promise ((resolve, reject) => {
    axios.patch(`${apiEndpoint}/balances/pay`, payment)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});
