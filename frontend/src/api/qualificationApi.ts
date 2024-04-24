import axios from 'axios';

const apiEndpoint = '//localhost:8080'

export const getQualificationsByProfessional = (username: string) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/qualifications/get-by-professional?username=${username}`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const getQualificationsByJob = (employerId: string, companyJobId: string) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/qualifications/get-by-job?employerId=${employerId}&companyJobId=${companyJobId}`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const addQualifications = (qualifications: any) => new Promise ((resolve, reject) => {
    console.log("QUALS:");
    console.log(qualifications);
    axios.post(`${apiEndpoint}/qualifications/add`, qualifications)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const updateQualifications = (qualifications: any) => new Promise ((resolve, reject) => {
    axios.put(`${apiEndpoint}/qualifications/update`, qualifications)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

