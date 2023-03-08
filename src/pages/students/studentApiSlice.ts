import { apiSlice } from "../../redux/apiSlice";
import { Student } from "../../types/types";

const apiSliceWithTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Students"],
});

export const studentApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getStudentsByClassroom: builder.query<any, number>({
      query: (classroom_id) => `/api/students/${classroom_id}`,
      providesTags: ["Students"],
    }),
    createStudent: builder.mutation<any, Student>({
      query: (values) => ({
        url: "/api/student/create",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["Students"],
    }),
    updateStudent: builder.mutation<any, { id: number; body: Student }>({
      query: (values) => ({
        url: `/api/student/update/${values.id}`,
        method: "PUT",
        body: values.body,
      }),
      invalidatesTags: ["Students"],
    }),
    changeStudentClassroom: builder.mutation<
      any,
      { id: number; body: { classroom_id: number } }
    >({
      query: (values) => ({
        url: `/api/student/change-class/${values.id}`,
        method: "PUT",
        body: values.body,
      }),
      invalidatesTags: ["Students"],
    }),
    deleteStudent: builder.mutation<any, Student>({
      query: (values) => ({
        url: `/api/student/delete/${values.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
  }),
});

export const {
  useGetStudentsByClassroomQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useChangeStudentClassroomMutation,
  useDeleteStudentMutation,
} = studentApiSlice;
