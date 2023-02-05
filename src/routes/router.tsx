import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../layout";
import Classrooms from "../pages/classrooms/Classrooms";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/students/Students";
import Subjects from "../pages/Subjects";
import Teachers from "../pages/teachers/Teachers";
type Props = {};

const Router = (props: Props) => {
  return (
    <Routes>
      <Route element={<Layout />}>
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
