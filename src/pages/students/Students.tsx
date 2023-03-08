import React, { useMemo, useState } from "react";
import CreateStudentModal from "./CreateStudentModal";
import StudentsTable from "./StudentsTable";
import { Box, Select, MenuItem, LinearProgress } from "@mui/material";
import { useGetClassroomsQuery } from "../classrooms/classroomApiSlice";
import { Classroom, Student } from "../../types/types";
import { useGetStudentsByClassroomQuery } from "./studentApiSlice";

type Props = {};

const Students = (props: Props) => {
  const [selectedClass, setSelectedClass] = useState(0);
  const [openAddNew, setOpenAddNew] = useState(false);
  const { data: classroomData, isLoading } = useGetClassroomsQuery();
  const { data: studentsData, isFetching: isLoadingStudents } =
    useGetStudentsByClassroomQuery(selectedClass);

  const classrooms = useMemo(() => {
    return classroomData?.data?.map((classroom: Classroom) => classroom) || [];
  }, [classroomData]);

  const students = useMemo(() => {
    if (studentsData?.data?.length) {
      return studentsData?.data;
    }
    return [];
  }, [studentsData]);

  const toggleAddNew = () => {
    setOpenAddNew((prev) => !prev);
  };

  console.log("students", students);
  console.log("students data", studentsData);
  console.log("selectedclass", selectedClass);

  return (
    <Box>
      <CreateStudentModal
        open={openAddNew}
        handleClose={toggleAddNew}
        classrooms={classrooms}
      />
      <Box textAlign={"center"} my={1}>
        <Select
          displayEmpty
          onChange={(e: any) => setSelectedClass(e.target.value)}
        >
          <MenuItem value={selectedClass}>Select Classroom</MenuItem>
          {classrooms?.map((item: Classroom) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {isLoadingStudents && <LinearProgress />}
      <StudentsTable
        classroom={selectedClass}
        allClassrooms={classrooms}
        rows={students}
        toggleAddNew={toggleAddNew}
      />
    </Box>
  );
};

export default Students;
