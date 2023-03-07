import { useMemo, useState } from "react";
import { Box, Button, IconButton, LinearProgress, Stack } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateSubjectModal from "./CreateSubjectModal";
import { useGetSubjectsQuery } from "./subjectApiSlice";
import { Subject } from "../../types/types";
import { Delete, Edit } from "@mui/icons-material";

type Props = {};

const Subjects = (props: Props) => {
  const [openAddNew, setOpenAddNew] = useState(false);
  const [focusedSubject, setFocusedSubject] = useState<Subject | null>(null);
  const { data, isLoading } = useGetSubjectsQuery();

  const subjects = useMemo(() => {
    if (data?.data?.length) {
      return data.data;
    }
    return [];
  }, [data]);

  const handleClose = () => {
    setOpenAddNew(false);
    setFocusedSubject(null);
  };

  return (
    <Box>
      {isLoading && <LinearProgress />}
      <CreateSubjectModal
        open={openAddNew}
        handleClose={handleClose}
        focusedSubject={focusedSubject}
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
            {subjects.map((row: Subject, i: number) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row">{i + 1}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="right">
                  <Stack
                    direction="row"
                    gap={2}
                    sx={{ "&>*": { cursor: "pointer" } }}
                  >
                    <IconButton
                      onClick={() => {
                        setFocusedSubject(row);
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

export default Subjects;
