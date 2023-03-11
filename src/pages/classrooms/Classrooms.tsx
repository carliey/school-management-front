import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  IconButton,
  LinearProgress,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddClassModal from "./AddClassModal";
import { useGetClassroomsQuery } from "./classroomApiSlice";
import { Classroom, Teacher } from "../../types/types";
import { useGetTeachersQuery } from "../teachers/teachersApiSlice";
import { Delete, Edit } from "@mui/icons-material";

type Props = {};

const Classrooms = (props: Props) => {
  const [openAddNew, setOpenAddNew] = useState(false);
  const [focusedClassroom, setFocusedClassroom] = useState<Classroom | null>(
    null
  );
  const { data, isLoading } = useGetClassroomsQuery();
  const { data: teachers } = useGetTeachersQuery();

  const classrooms = useMemo(() => {
    if (data?.data?.length) {
      return data.data;
    }
    return [];
  }, [data]);

  console.log(classrooms);

  const handleClose = () => {
    setOpenAddNew(false);
    setFocusedClassroom(null);
  };

  useEffect(() => {
    // reset focused classroom
    if (focusedClassroom) {
      setFocusedClassroom(
        classrooms?.find((room: Classroom) => room.id === focusedClassroom.id)
      );
    }
  }, [classrooms]);

  console.log(focusedClassroom);

  return (
    <Box>
      <AddClassModal
        open={openAddNew}
        handleClose={handleClose}
        focusedClassroom={focusedClassroom}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box component="input" type="search" placeholder="search" p={1} />
        <Button
          variant="contained"
          size="small"
          onClick={() => setOpenAddNew(true)}
        >
          Add
        </Button>
      </Box>
      {isLoading && <LinearProgress />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell align="left">Class</TableCell>
              <TableCell align="left">Teacher</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classrooms.map((classroom: Classroom, i: number) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row">{i + 1}</TableCell>
                <TableCell align="left">{classroom.name}</TableCell>
                <TableCell align="left">
                  {teachers?.data?.find(
                    (item: Teacher) => item.id === classroom.teacher_id
                  )?.firstname +
                    " " +
                    teachers?.data?.find(
                      (item: Teacher) => item.id === classroom.teacher_id
                    )?.lastname}
                </TableCell>
                <TableCell align="right">
                  <Stack
                    direction="row"
                    gap={2}
                    sx={{ "&>*": { cursor: "pointer" } }}
                  >
                    <IconButton
                      onClick={() => {
                        setFocusedClassroom(classroom);
                        setOpenAddNew(true);
                      }}
                    >
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton>
                      <Delete color="error" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Classrooms;
