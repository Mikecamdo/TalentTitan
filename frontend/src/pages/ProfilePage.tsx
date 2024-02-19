import { useParams } from "react-router-dom";
import { EmployerProfile } from "../components/ProfilePage/EmployerProfile";
import { ProfessionalProfile } from "../components/ProfilePage/ProfessionalProfile";

export const ProfilePage = () => {
  const { username } = useParams();

  if (!username) {
    return <div>Loading...</div>;
  }

  if (username === "Employer") {
    return <EmployerProfile currentlyViewing={username}/>;
  } else {
    return <ProfessionalProfile currentlyViewing={username}/>;
  }
};

export interface ProfileProps {
    currentlyViewing: string;
}