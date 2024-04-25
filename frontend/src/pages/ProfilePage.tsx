import { useParams } from "react-router-dom";
import { EmployerProfile } from "../components/ProfilePage/EmployerProfile";
import { ProfessionalProfile } from "../components/ProfilePage/ProfessionalProfile";
import { StaffProfile } from "../components/ProfilePage/StaffProfile";
import { RootProfile } from "../components/ProfilePage/RootProfile";
import { UserContext } from "../App";
import { useContext } from "react";

export const ProfilePage = () => {

  const { username } = useParams();

  const userContext = useContext(UserContext);
  const userType = userContext?.userType;

  if (!username || !userType) {
    return <div>Loading...</div>;
  }

  //TODO: might have to fix this...
  if (userType === "employer") {
    return <EmployerProfile currentlyViewing={username}/>;
  } else if (userType === "staff") {
    if (username === "root") {
      return <RootProfile currentlyViewing="root"/>
    } else {
      return <StaffProfile currentlyViewing={username} />
    }
  } else {
    return <ProfessionalProfile currentlyViewing={username}/>;
  }
};

export interface ProfileProps {
    currentlyViewing: string;
}
