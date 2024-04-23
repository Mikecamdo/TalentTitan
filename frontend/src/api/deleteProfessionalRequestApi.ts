import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const getAllDeleteProfessionalsRequests = () => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/delete-professional/get-all`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const approveDeleteProfessional = (professionalId: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/delete-professional/approve`, professionalId)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const requestDeleteProfessional = (professionalId: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/delete-professional/request`, professionalId)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});