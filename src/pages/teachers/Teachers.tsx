import { Box, Button, LinearProgress } from "@mui/material";
import { useMemo, useState } from "react";
import { Teacher } from "../../types/types";
import CreateTeacherModal from "./CreateTeacherModal";
import { useGetTeachersQuery } from "./teachersApiSlice";
import TeachersTable from "./TeachersTable";

type Props = {};

interface Data {
  firstname: string;
  lastname: string;
  gender: string;
  phone: number;
  email: string;
  roles?: string[];
  password?: string;
}

const Teachers = (props: Props) => {
  const [openAddNew, setOpenAddNew] = useState(false);
  const [focusedTeacher, setFocusedTeacher] = useState<Teacher | Data | null>(
    null
  );

  const { data, isLoading: isLoadingTeachers } = useGetTeachersQuery();

  const teachers = useMemo(
    () =>
      data?.data?.map((teacher: Teacher) => ({
        ...teacher,
        classroom: teacher.classroom?.map((item) => item.name + "|"),
      })) || [],
    [data]
  );

  const toggleAddNew = () => {
    setOpenAddNew((prev) => !prev);
  };

  console.log("teachers", teachers);

  const handleClose = () => {
    setOpenAddNew(false);
    setFocusedTeacher(null);
  };

  return (
    <Box>
      <CreateTeacherModal
        open={openAddNew}
        handleClose={handleClose}
        focusedTeacher={focusedTeacher}
      />
      {isLoadingTeachers && <LinearProgress />}
      <TeachersTable
        rows={teachers}
        toggleAddNew={toggleAddNew}
        setFocusedTeacher={setFocusedTeacher}
      />
    </Box>
  );
};

export default Teachers;
