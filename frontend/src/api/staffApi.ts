import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const updateStaff = (user: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/staff/update`, user)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const attemptRegister = (staff: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/staff/register`, staff)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

