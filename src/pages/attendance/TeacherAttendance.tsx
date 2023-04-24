import {
  Button,
  Input,
  LinearProgress,
  Paper,
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
import { useParams } from "react-router-dom";
import { Student } from "../../types/types";
import { useGetStudentsByClassroomQuery } from "../students/studentApiSlice";
import { useGetAttendanceQuery } from "./attendanceApiSlice";
import TakeAttendanceModal from "./TakeAttendanceModal";

type Props = {};
type Attendance = {
  id?: number;
  student: Student;
  is_present: boolean;
  date: string;
};

const TeacherAttendance = (props: Props) => {
  const { classroomId } = useParams();

  const classId: number | undefined =
    typeof classroomId === "string" ? parseInt(classroomId) : 0;

  const [openTakeAttendance, setOpenTakeAttendance] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date: Date) => {
    let day = new Date(date).getDate();

    let month = new Date(date).getUTCMonth();

    let year = new Date(date).getFullYear();
    return month + 1 + "/" + day + "/" + year;
  };

  const { data: attendanceData, isFetching: isLoadingAttendance } =
    useGetAttendanceQuery({
      classroom_id: classId,
      date: formatDate(selectedDate),
    });

  const {
    data: studentsData,
    isFetching: isFetchingStudents,
    isLoading: isLoadingStudents,
  } = useGetStudentsByClassroomQuery(classId);

  const students = useMemo(() => {
    if (studentsData?.data?.length) {
      return studentsData?.data;
    }
    return [];
  }, [studentsData]);
  const attendance = useMemo(() => {
    if (attendanceData?.data?.length) {
      return attendanceData?.data;
    }
    return [];
  }, [attendanceData]);

  const handleClose = () => {
    setOpenTakeAttendance(false);
  };

  return (
    <Box>
      <TakeAttendanceModal
        open={openTakeAttendance}
        handleClose={handleClose}
        students={students}
      />
      <Stack direction={"row"} justifyContent="space-between">
        <Stack direction={"row"} alignItems="center">
          <Typography>View For:</Typography>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e: any) => setSelectedDate(e.target.value)}
          />
        </Stack>

        {formatDate(selectedDate) === formatDate(new Date()) &&
          !attendance.length && (
            <Button
              variant="contained"
              onClick={() => setOpenTakeAttendance(true)}
              disabled={isLoadingStudents || isFetchingStudents}
            >
              Take for Today
            </Button>
          )}
      </Stack>
      {(isLoadingAttendance || isLoadingStudents) && <LinearProgress />}
      <TableContainer component={Paper} sx={{ mt: 3, p: 2 }}>
        <Typography>
          Classname attendace for: {formatDate(selectedDate)}
        </Typography>
        {!attendance?.length ? (
          <Typography>Attendance for selected date not found</Typography>
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

export default TeacherAttendance;
