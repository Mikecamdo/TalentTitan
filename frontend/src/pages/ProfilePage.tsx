import { useParams } from "react-router-dom";
import { EmployerProfile } from "../components/ProfilePage/EmployerProfile";
import { ProfessionalProfile } from "../components/ProfilePage/ProfessionalProfile";
import { StaffProfile } from "../components/ProfilePage/StaffProfile";
import { RootProfile } from "../components/ProfilePage/RootProfile";

export const ProfilePage = () => {
  const { username } = useParams();

  if (!username) {
    return <div>Loading...</div>;
  }

  if (username === "Employer") {
    return <EmployerProfile currentlyViewing={username}/>;
  } else if (username === "Staff") {
    return <StaffProfile currentlyViewing={username} />
  } else if (username === "root") {
    return <RootProfile currentlyViewing="root"/>
  } else {
    return <ProfessionalProfile currentlyViewing={username}/>;
  }
};

export interface ProfileProps {
    currentlyViewing: string;
}
