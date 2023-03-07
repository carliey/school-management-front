import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Grid,
  TextField,
  Box,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";
import { Subject } from "../../types/types";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
} from "./subjectApiSlice";
import { toast } from "react-hot-toast";

interface ComponentProps {
  open: boolean;
  handleClose: () => void;
  focusedSubject?: Subject | null;
}

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

export default function CreateSubjectModal({
  open,
  handleClose,
  focusedSubject,
}: ComponentProps) {
  const [createSubject, { isLoading: isCreating }] = useCreateSubjectMutation();
  const [updateSubject, { isLoading: isUpdating }] = useUpdateSubjectMutation();

  const formik = useFormik({
    initialValues: {
      name: focusedSubject?.name || "",
      description: focusedSubject?.description || "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (focusedSubject) {
        handleUpdateSubject(values);
      } else {
        handleCreateSubject(values);
      }
    },
  });

  const handleCreateSubject = async (data: Subject) => {
    try {
      const res = await createSubject(data).unwrap();
      console.log(res);
      toast.success("subject created successfully");
      handleClose();
    } catch (error) {
      toast.error("Error");
      console.log("caught", error);
    }
  };

  const handleUpdateSubject = async (data: Subject) => {
    try {
      const res = await updateSubject({
        id: focusedSubject?.id,
        body: data,
      }).unwrap();
      console.log(res);
      toast.success("subject created successfully");
      handleClose();
    } catch (error) {
      toast.error("Error");
      console.log("caught", error);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {(isCreating || isUpdating) && <LinearProgress />}
        <DialogTitle>
          {Boolean(focusedSubject) ? "Update" : "Create"} Subject
        </DialogTitle>
        <Box component="form" onSubmit={formik.handleSubmit} p={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="name *"
                variant="outlined"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
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
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
          </Grid>

          <Stack gap={2} direction="row" justifyContent={"flex-end"} mt={2}>
            <Button variant="contained" color="error" onClick={handleClose}>
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
