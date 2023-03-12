import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { myContextApi } from "../StateManager";

const ProtectedRoute = ({ isUser, children }) => {
  const { userDisplayName } = useContext(myContextApi);
  const navigate = useNavigate();
  if (userDisplayName) {
    return children;
  } else navigate("/Login");
};

export default ProtectedRoute;
