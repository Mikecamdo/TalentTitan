import { useParams } from "react-router-dom";
import { EmployerProfile } from "../components/ProfilePage/EmployerProfile";
import { ProfessionalProfile } from "../components/ProfilePage/ProfessionalProfile";

export const ProfilePage = () => {
  const { username } = useParams();

  if (username === "Employer") {
    return <EmployerProfile/>;
  } else {
    return <ProfessionalProfile />;
  }
};