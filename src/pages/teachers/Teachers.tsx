import { Box, Button } from "@mui/material";
import { useState } from "react";
import CreateTeacherModal from "./CreateTeacherModal";
import TeachersTable from "./TeachersTable";

type Props = {};
const teachers = [
  {
    id: 1,
    name: "musa umar",
    email: "m.umar@mail.com",
    phone: "09084728472",
    classroom: "primary 2",
  },
  {
    id: 2,
    name: "jamil shaban",
    email: "jshaban@mail.com",
    phone: "09084728472",
    classroom: "primary 2",
  },
  {
    id: 2,
    name: "Hadiza bala",
    email: "jshaban@mail.com",
    phone: "09084728472",
    classroom: "primary 2",
  },
];

const Teachers = (props: Props) => {
  const [openAddNew, setOpenAddNew] = useState(false);

  const toggleAddNew = () => {
    setOpenAddNew((prev) => !prev);
  };
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
