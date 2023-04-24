import {
  Button,
  Input,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useMemo, useState } from "react";
import { Classroom, Student } from "../../types/types";
import { useGetAttendanceQuery } from "./attendanceApiSlice";
import { useGetClassroomsQuery } from "../classrooms/classroomApiSlice";

type Props = {};
type Attendance = {
  id?: number;
  student: Student;
  is_present: boolean;
  date: string;
};

const AdminAttendance = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState(0);

  const formatDate = (date: Date) => {
    let day = new Date(date).getDate();

    let month = new Date(date).getUTCMonth();

    let year = new Date(date).getFullYear();
    return month + 1 + "/" + day + "/" + year;
  };

  const { data: attendanceData, isFetching: isLoadingAttendance } =
    useGetAttendanceQuery({
      classroom_id: selectedClass,
      date: formatDate(selectedDate),
    });

  const {
    data: classroomsData,
    isLoading: isLoadingClassrooms,
    isFetching: isFetchingClassrooms,
  } = useGetClassroomsQuery();

  const classrooms = useMemo(() => {
    if (classroomsData?.data?.length) {
      return classroomsData.data;
    }
    return [];
  }, [classroomsData]);

  const attendance = useMemo(() => {
    if (attendanceData?.data?.length) {
      return attendanceData?.data;
    }
    return [];
  }, [attendanceData]);

  const loading =
    isLoadingAttendance || isLoadingClassrooms || isFetchingClassrooms;

  return (
    <Box>
      <Stack direction={"row"} justifyContent="space-between">
        <Stack direction={"row"} alignItems="center" gap={2}>
          <Typography>View For:</Typography>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e: any) => setSelectedDate(e.target.value)}
          />
          <Select
            displayEmpty
            onChange={(e: any) => setSelectedClass(e.target.value)}
            value={selectedClass}
            variant="standard"
          >
            <MenuItem value={selectedClass}>Select Classroom</MenuItem>
            {classrooms?.map((item: Classroom) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>
      {loading && <LinearProgress />}
      <TableContainer component={Paper} sx={{ mt: 3, p: 2 }}>
        {!(selectedClass && selectedDate) ? (
          <Typography variant="h6">Select Date and Classroom</Typography>
        ) : !loading && !attendance?.length ? (
          <Typography variant="h6">
            Attendance for selected class and date not found
          </Typography>
        ) : (
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell align="left">student ID</TableCell>
                <TableCell align="left">First name</TableCell>
                <TableCell align="left">Last name</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance.map((row: Attendance, i: number) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">{i + 1}</TableCell>
                  <TableCell align="left">{row.student.id}</TableCell>
                  <TableCell align="left">{row.student.firstname}</TableCell>
                  <TableCell align="left">{row.student.lastname}</TableCell>
                  <TableCell align="left">
                    {row.is_present ? (
                      <Typography fontWeight={"bold"} color="green">
                        Present
                      </Typography>
                    ) : (
                      <Typography fontWeight={"bold"} color="red">
                        Absent
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default AdminAttendance;
