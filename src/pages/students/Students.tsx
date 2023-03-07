import React, { useMemo, useState } from "react";
import CreateStudentModal from "./CreateStudentModal";
import StudentsTable from "./StudentsTable";
import { Box, Select, MenuItem } from "@mui/material";
import { useGetClassroomsQuery } from "../classrooms/classroomApiSlice";
import { Classroom } from "../../types/types";

type Props = {};

const students = [
  {
    id: 1,
    name: "musa umar",
    gender: "male",
    soo: "kaduna",
  },
  {
    id: 2,
    name: "musa sulaiman",
    gender: "male",
    soo: "kaduna",
  },
];

const Students = (props: Props) => {
  const [classroom, setClassroom] = useState("Primary one");
  const [openAddNew, setOpenAddNew] = useState(false);
  const { data: classroomData, isLoading } = useGetClassroomsQuery();

  const classrooms = useMemo(() => {
    return classroomData?.data?.map((classroom: Classroom) => classroom) || [];
  }, [classroomData]);
  console.log("classrooms", classroomData);

  const toggleAddNew = () => {
    setOpenAddNew((prev) => !prev);
  };

  return (
    <Box>
      <CreateStudentModal
        open={openAddNew}
        handleClose={toggleAddNew}
        classrooms={classrooms}
      />
      <Box textAlign={"center"} my={1}>
        <Select displayEmpty defaultValue={""}>
          <MenuItem value="">Select Classroom</MenuItem>
          {classrooms?.map((item) => (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <StudentsTable
        classroom={classroom}
        rows={students}
        toggleAddNew={toggleAddNew}
      />
    </Box>
  );
};

export default Students;
