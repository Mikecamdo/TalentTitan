import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/signIn");
  }, []);

  return <div></div>;
};
