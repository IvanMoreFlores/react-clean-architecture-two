import { JSX } from "react";
import { Navigate } from "react-router";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const user = localStorage.getItem("user");

  if (user) {
    // Redirect to home page if user is authenticated
    return <Navigate to="/" replace />;
  }

  // Render the children components if user is not authenticated
  return children;
};
export default PublicRoute;
