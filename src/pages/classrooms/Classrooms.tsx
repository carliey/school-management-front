import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddClassModal from "./AddClassModal";

type Props = {};

const Classrooms = (props: Props) => {
  const [openAddNew, setOpenAddNew] = useState(false);
  const rows = [
    { name: "Primary one", teacher: "mr A" },
    { name: "Primary two", teacher: "mr b" },
    { name: "Primary three", teacher: "mr c" },
    { name: "Primary four", teacher: "mr d" },
    { name: "Primary five", teacher: "mr e" },
    { name: "Primary six", teacher: "mr f" },
  ];
  return (
    <Box>
      <AddClassModal
        open={openAddNew}
        handleClose={() => setOpenAddNew(false)}
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell align="center">Class</TableCell>
              <TableCell align="center">Teacher</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.teacher}</TableCell>
                <TableCell align="right">edit/delete</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Classrooms;
