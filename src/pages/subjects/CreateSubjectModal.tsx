import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField, Box, Stack, Typography } from "@mui/material";

interface ComponentProps {
  open: boolean;
  handleClose: () => void;
}

export default function CreateSubjectModal({
  open,
  handleClose,
}: ComponentProps) {
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
        <DialogTitle id="alert-dialog-title">Create Subject</DialogTitle>
        <Box component="form" onSubmit={handleSubmit} p={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="name *"
                variant="outlined"
                name="name"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="description "
                variant="outlined"
                name="description"
                multiline
              />
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
