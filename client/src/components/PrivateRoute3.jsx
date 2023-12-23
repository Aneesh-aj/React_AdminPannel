import { useSelector } from "react-redux";
import SignIn from "../pages/SignIn";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute3() {
  const { currentUser } = useSelector((state) => state.user);
  console.log("the state of user",currentUser)
  return currentUser ? <Navigate to="/"/> :< SignIn/>;
}

export default PrivateRoute3;
