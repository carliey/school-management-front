import { apiSlice } from "../../redux/apiSlice";
import { Attendance, Classroom } from "../../types/types";

const apiSliceWithTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Attendance"],
});

type QueryParam = {
  classroom_id: number;
  date: string;
};

export const attendanceApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getAttendance: builder.query<any, QueryParam>({
      query: (params) =>
        `/api/attendance?date=${params.date}&classroom_id=${params.classroom_id}`,
      providesTags: ["Attendance"],
    }),

    createAttendance: builder.mutation<any, Attendance>({
      query: (values) => ({
        url: "/api/attendance/create",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const { useGetAttendanceQuery, useCreateAttendanceMutation } =
  attendanceApiSlice;
