import { useParams } from "react-router-dom";
import { EmployerProfile } from "../components/ProfilePage/EmployerProfile";
import { ProfessionalProfile } from "../components/ProfilePage/ProfessionalProfile";
import { StaffProfile } from "../components/ProfilePage/StaffProfile";
import { RootProfile } from "../components/ProfilePage/RootProfile";
import { UserContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { getProfessional } from "../api/professionalApi";

export const ProfilePage = () => {
  const { username } = useParams();

  const userContext = useContext(UserContext);
  const currentUser = userContext?.currentUser;
  const userType = userContext?.userType;

  const [isProfessional, setIsProfessional] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (username) {
      getProfessional(username).then((response: any) => {
        if (response) {
          setIsProfessional(true);
        }
        setReady(true);
      });
    }
  }, [username]);

  if (!username || !currentUser || !userType || !ready) {
    return <div>Loading...</div>;
  }

  if (currentUser === username) {
    // viewing your own profile
    if (userType === "employer") {
      return <EmployerProfile currentlyViewing={username} />;
    } else if (userType === "staff") {
      if (username === "root") {
        return <RootProfile currentlyViewing="root" />;
      } else {
        return <StaffProfile currentlyViewing={username} />;
      }
    } else {
      return <ProfessionalProfile currentlyViewing={username} />;
    }
  } else {
    // viewing someone else's profile
    if (isProfessional) {
      console.log("SHOWING PROFESSIONAL!!")
      return <ProfessionalProfile currentlyViewing={username} />;
    } else {
      return <EmployerProfile currentlyViewing={username} />;
    }
  }
};

export interface ProfileProps {
  currentlyViewing: string;
}
