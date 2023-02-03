import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField, Box, Select, MenuItem, Stack } from "@mui/material";

interface ComponentProps {
  open: boolean;
  handleClose: () => void;
}

export default function CreateTeacherModal({
  open,
  handleClose,
}: ComponentProps) {
  const classrooms = [
    { id: 1, name: "primary one" },
    { id: 2, name: "primary two" },
    { id: 3, name: "primary three" },
  ];
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create Teacher</DialogTitle>
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="outlined-basic"
                label="First name *"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="outlined-basic"
                label="Middle name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="outlined-basic"
                label="Last name *"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="outlined-basic"
                label="Phone *"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                id="outlined-basic"
                label="Email "
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Select displayEmpty fullWidth defaultValue={""}>
                <MenuItem value="">Select gender</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Select displayEmpty fullWidth defaultValue={""}>
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
            <Button variant="contained" color="primary">
              Save
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </div>
  );
}
