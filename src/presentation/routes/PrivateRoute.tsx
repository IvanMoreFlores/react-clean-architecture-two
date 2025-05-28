import { JSX } from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = localStorage.getItem("user");

  if (!user) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the children components if user is authenticated
  return children;
};
export default PrivateRoute;
