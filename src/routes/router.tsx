import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layout";
import { logout, selectCurrentUser } from "../pages/auth/authSlice";
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
  const dispatch = useAppDispatch();
  const isAuth = !!user;
  const userRoles = user?.roles?.map((role: any) => role.name);
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
  const user = useSelector(selectCurrentUser);
  console.log("user", user);

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
