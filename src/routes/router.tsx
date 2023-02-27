import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Layout from "../layout";
import { login, logout, selectCurrentUser } from "../pages/auth/authSlice";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/Signup";
import Classrooms from "../pages/classrooms/Classrooms";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/students/Students";
import Subjects from "../pages/subjects/Subjects";
import Teachers from "../pages/teachers/Teachers";
import { useAppDispatch } from "../redux/store";

type Props = {};

type ProtectedRoute = {
  user: any;
  allowedRoles: any;
  children?: any;
};

const ProtectedRoute = ({ user, allowedRoles, children }: ProtectedRoute) => {
  //wrapper component for protected routes

  console.log("user", user, allowedRoles);
  const dispatch = useAppDispatch();
  const isAuth = !!user;
  const userRoles = user?.roles?.map((role: string) => role);
  const hasRequiredRole = userRoles?.filter((role: any) =>
    allowedRoles.includes(role)
  )?.length
    ? true
    : false;

  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }

  if (!userRoles?.length) {
    alert("sorry, user doesnt have any role");
    return dispatch(logout());
  }

  if (!hasRequiredRole) {
    alert("Access Denied");
    return <Navigate to="/" />;
  }

  return children;
};

const Router = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  console.log("user", user);

  useEffect(() => {
    //log the user back in with local storage data on login
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      dispatch(login(JSON.parse(credentials)));
    }
  }, []);

  useEffect(() => {
    //route the user to dashboard, if a logged in user tries to access signin page
    if (!!user && location.pathname === "/signin") {
      navigate("/");
    }
  }, [location, user]);

  return (
    <Routes>
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />

      <Route
        element={
          <ProtectedRoute user={user} allowedRoles={["admin"]}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="classrooms" element={<Classrooms />} />
        <Route path="subjects" element={<Subjects />} />
      </Route>

      <Route path="*" element={<h1>404, page not found</h1>} />
    </Routes>
  );
};

export default Router;
