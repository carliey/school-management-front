import { useState } from "react";
import { Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateSubjectModal from "./CreateSubjectModal";

type Props = {};

const Subjects = (props: Props) => {
  const [openAddNew, setOpenAddNew] = useState(false);
  const subjects = [
    {
      id: 1,
      name: "maths",
      description:
        "Eu eu non tempor eu sunt do veniam ad ex in velit deserunt elit.",
    },
    {
      id: 2,
      name: "english",
      description: "Consequat anim labore amet amet eiusmod.",
    },
    {
      id: 3,
      name: "science",
      description: "Ex laborum consequat culpa occaecat esse voluptate.",
    },
  ];
  return (
    <Box>
      <CreateSubjectModal
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
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell align="left">Subject</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="right">edit/delete</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Subjects;
