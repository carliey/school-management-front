import { Box, Button } from "@mui/material";
import { useMemo, useState } from "react";
import { Teacher } from "../../types/types";
import CreateTeacherModal from "./CreateTeacherModal";
import { useGetTeachersQuery } from "./teachersApiSlice";
import TeachersTable from "./TeachersTable";

type Props = {};

const Teachers = (props: Props) => {
  const [openAddNew, setOpenAddNew] = useState(false);

  const { data, isLoading } = useGetTeachersQuery();

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

  return (
    <Box>
      <CreateTeacherModal
        open={openAddNew}
        handleClose={() => setOpenAddNew(false)}
      />
      <TeachersTable rows={teachers} toggleAddNew={toggleAddNew} />
    </Box>
  );
};

export default Teachers;
