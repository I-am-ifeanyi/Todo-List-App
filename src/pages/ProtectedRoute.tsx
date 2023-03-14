import { useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { myContextApi } from "../StateManager";
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({
  children,
}: ProtectedRouteProps): JSX.Element | null => {
  const { userDisplayName } = useContext(myContextApi) ?? {};
  const navigate = useNavigate();
  if (userDisplayName) {
    return <>{children}</>;
  } else {
    navigate("/Login");
    return null;
  }
};

export default ProtectedRoute;
