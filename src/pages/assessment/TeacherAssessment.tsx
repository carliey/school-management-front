import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const TeacherAssessment = (props: Props) => {
  const params = useParams();
  console.log(params);
  return <div>TeacherAssessment</div>;
};

export default TeacherAssessment;
