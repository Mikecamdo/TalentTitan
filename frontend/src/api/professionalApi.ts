import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const getProfessionalInfo = (professionalId: any) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/users/professional/getProfessional`, professionalId)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const updateProfessionalInfo = (professionalId: any) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/users/professional`, professionalId)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const createProfessional = (userId: any) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/users/professional`, userId)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

