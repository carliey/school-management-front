import { apiSlice } from "../../redux/apiSlice";
import { Classroom } from "../../types/types";

const apiSliceWithTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Classrooms"],
});

export const classroomApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getClassrooms: builder.query<any, void>({
      query: () => "/api/classrooms",
      providesTags: ["Classrooms"],
    }),
    createClassroom: builder.mutation<any, Classroom>({
      query: (values) => ({
        url: "/api/classroom/create",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["Classrooms"],
    }),
    updateClassroom: builder.mutation<any, { id: number; body: {name: string} }>({
      query: (values) => ({
        url: `/api/classroom/update/${values.id}`,
        method: "PUT",
        body: values.body,
      }),
      invalidatesTags: ["Classrooms"],
    }),
    changeTeacher: builder.mutation<any, { id: number; body: {teacher_id: number} }>({
      query: (values) => ({
        url: `/api/classroom/change-teacher/${values.id}`,
        method: "PUT",
        body: values.body,
      }),
      invalidatesTags: ["Classrooms"],
    }),

    deleteTeacher: builder.mutation<any, Classroom>({
      query: (values) => ({
        url: `/api/classroom/delete/${values.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Classrooms"],
    }),
  }),
});

export const {
 useGetClassroomsQuery,
 useCreateClassroomMutation,
 useUpdateClassroomMutation,
 useChangeTeacherMutation,
 useDeleteTeacherMutation
} = classroomApiSlice;
