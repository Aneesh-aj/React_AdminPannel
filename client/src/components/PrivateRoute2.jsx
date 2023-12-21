import { useSelector } from "react-redux";
import SignUp from "../pages/SignUp";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute2() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Navigate to="/"/>: <SignUp/>;
}

export default PrivateRoute2