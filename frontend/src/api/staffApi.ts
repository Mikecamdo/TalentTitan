import axios from 'axios';

const apiEndpoint = '//localhost:8080';

export const getStaffByUsername = (username: String) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/staff/get-by-username?username=${username}`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const updateStaff = (user: any) => new Promise ((resolve, reject) => {
    axios.put(`${apiEndpoint}/staff/update`, user)
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

