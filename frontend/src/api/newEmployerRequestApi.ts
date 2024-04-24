import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const getAllNewEmployers = () => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/new-employer/get-all`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const approveNewEmployer = (username: string, amountDue: string, dueDate: string) => new Promise ((resolve, reject) => {
    axios.delete(`${apiEndpoint}/new-employer/approve?username=${username}&amountDue=${amountDue}&dueDate=${dueDate}`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const updateNewEmployer = (request: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/new-employer/update`, request)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const registerNewEmployer = (newEmployer: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/new-employer/register`, newEmployer)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});