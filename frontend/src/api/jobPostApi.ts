import axios from 'axios';

const apiEndpoint = '//localhost:8080';

export const getAllJobs = () => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/job-posts/get-all`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const getJobByCompanyJobId = (employerUsername: string, jobId: string) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/job-posts/get-by-company-job-id?employerUsername=${employerUsername}&jobId=${jobId}`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const getJobPostsByCompany = (employerUsername: string) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/job-posts/get-by-company?employerUsername=${employerUsername}`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const addJobPost = (jobPost: any) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/job-posts/add`, jobPost)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const updateJobPost = (jobPost: any) => new Promise ((resolve, reject) => {
    axios.put(`${apiEndpoint}/job-posts/update`, jobPost)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
});

export const deleteJobPost = (jobPostId: number) => new Promise ((resolve, reject) => {
    axios.delete(`${apiEndpoint}/job-posts/delete?jobPostId=${jobPostId}`)
    .then(response => resolve(response.data))
    .catch(error => {
        resolve(error.response.data);
    });
})