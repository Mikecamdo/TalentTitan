import Qualification from "./Qualification";

interface Professional {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    email: string;
    username: string;
    schoolName: string;
    degreeName: string;
    completionDate: Date;
    qualifications: Qualification[];
}

export default Professional;