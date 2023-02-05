import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField, Box, Select, MenuItem, Stack } from "@mui/material";

interface ComponentProps {
  open: boolean;
  handleClose: () => void;
}

export default function CreateStudentModal({
  open,
  handleClose,
}: ComponentProps) {
  const classrooms = [
    { id: 1, name: "primary one" },
    { id: 2, name: "primary two" },
    { id: 3, name: "primary three" },
  ];

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(e);
    const formData = new FormData(e.target);
    console.log("submitted", formData.get("firstname"));
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create Student</DialogTitle>
        <Box component="form" onSubmit={handleSubmit} p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                id="outlined-basic"
                label="First name *"
                variant="outlined"
                name="firstname"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                id="outlined-basic"
                label="Middle name"
                variant="outlined"
                name="middlename"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                id="outlined-basic"
                label="Last name *"
                variant="outlined"
                name="lastname"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                type={"date"}
                id="outlined-basic"
                label="DOB"
                variant="outlined"
                name="dob"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                id="outlined-basic"
                label="State of origin "
                variant="outlined"
                name="soo"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select displayEmpty fullWidth defaultValue={""} name="gender">
                <MenuItem value="">Select gender</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Select displayEmpty fullWidth defaultValue={""} name="class">
                <MenuItem value="">Select Classroom</MenuItem>
                {classrooms.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
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
