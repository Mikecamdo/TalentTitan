import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const getQualificationsByProfessionals = (username: any) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/qualifications/get-by-professional`, username)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const getQualificationsByJob = (id: any) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/qualifications/get-by-job`, id)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const addQualifications = (qualifications: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/qualifications/add`, qualifications)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const updateQualifications = (qualifications: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/qualifications/update`, qualifications)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

