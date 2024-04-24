import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const getAllDeleteEmployersRequests = () => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/delete-employer/get-all`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const approveDeleteEmployer = (employerId: string) => new Promise ((resolve, reject) => {
    axios.delete(`${apiEndpoint}/delete-employer/approve?employerId=${employerId}`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const requestDeleteEmployer = (employerId: string) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/delete-employer/request?employerId=${employerId}`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});