import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Grid,
  TextField,
  Box,
  Select,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Add, DeleteOutline } from "@mui/icons-material";

interface ComponentProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddClassModal({ open, handleClose }: ComponentProps) {
  const teachers = [
    { id: 1, name: "mr a" },
    { id: 2, name: "mr b" },
    { id: 3, name: "mr c" },
  ];
  const subjects = [
    { id: 1, name: "maths" },
    { id: 2, name: "english" },
    { id: 3, name: "physics" },
  ];

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(e);
    const formData = new FormData(e.target);
    console.log("submitted", formData.get("name"));
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create Classroom</DialogTitle>
        <Box component="form" onSubmit={handleSubmit} p={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-basic"
                label="name *"
                variant="outlined"
                name="name"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Select displayEmpty fullWidth defaultValue={""} name="class">
                <MenuItem value="">Select Teacher</MenuItem>
                {teachers.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Stack direction={"row"} gap={1}>
              <Select displayEmpty fullWidth defaultValue={""} size="small">
                <MenuItem value="">Select Subject</MenuItem>
                {teachers.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <Button size="small" variant="contained">
                Add
              </Button>
            </Stack>
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S/N</TableCell>
                  <TableCell align="center">Subject</TableCell>
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
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="right">
                      <DeleteOutline />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack gap={2} direction="row" justifyContent={"flex-end"} mt={2}>
            <Button variant="contained" color="error">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </div>
  );
}
