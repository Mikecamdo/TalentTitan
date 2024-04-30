import axios from 'axios';

const apiEndpoint = '//localhost:8080';

export const getAllDeleteProfessionalsRequests = () => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/delete-professional/get-all`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const requestDeleteProfessional = (professionalId: string) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/delete-professional/request`, professionalId)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const approveDeleteProfessional = (username: string) => new Promise ((resolve, reject) => {
    axios.delete(`${apiEndpoint}/delete-professional/approve?username=${username}`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const denyDeleteProfessional = (denial: any) => new Promise ((resolve, reject) => {
    console.log("DENIAL:");
    console.log(denial);
    axios.post(`${apiEndpoint}/delete-professional/deny`, denial)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});