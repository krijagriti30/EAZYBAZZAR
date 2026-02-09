import { Navigate } from "react-router-dom";        // used to redirect users programmatically like navigate() but in jsx 
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {       {/* this component wraps another component like children = the protected page cart , orders and profile etc  */}
  const { isLoggedIn, loading } = useAuth();     {/* gets authentication status from global auth context    ->    isLoggedIn -> true false  , loading -> firebase auth check in progress  */}

  if (loading) {                                  {/* wait until authentication check is complete -> prevents redirect before firebase finishes  */}
    return null; // or spinner
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;        {/* if logged in -> allow acess to the page */}
};

export default ProtectedRoute;
