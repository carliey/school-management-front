import { apiSlice } from "../../redux/apiSlice";
import { Classroom } from "../../types/types";

const apiSliceWithTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Classrooms", "Teachers"],
});

export const classroomApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getClassrooms: builder.query<any, void>({
      query: () => "/api/classrooms",
      providesTags: ["Classrooms"],
    }),
    getMyClassrooms: builder.query<any, void>({
      query: () => "api/classrooms/mine",
      providesTags: ["Classrooms"],
    }),
    createClassroom: builder.mutation<any, Classroom>({
      query: (values) => ({
        url: "/api/classroom/create",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["Classrooms", "Teachers"],
    }),
    updateClassroom: builder.mutation<
      any,
      { id: number; body: { name: string; teacher_id: number } }
    >({
      query: (values) => ({
        url: `/api/classroom/update/${values.id}`,
        method: "PUT",
        body: values.body,
      }),
      invalidatesTags: ["Classrooms", "Teachers"],
    }),
    changeTeacher: builder.mutation<
      any,
      { id: number; body: { teacher_id: number } }
    >({
      query: (values) => ({
        url: `/api/classroom/change-teacher/${values.id}`,
        method: "PUT",
        body: values.body,
      }),
      invalidatesTags: ["Classrooms"],
    }),
    addSubject: builder.mutation<
      any,
      { id: number; body: { subject_id: number | string } }
    >({
      query: (values) => ({
        url: `/api/classroom/add-subject/${values.id}`,
        method: "PUT",
        body: values.body,
      }),
      invalidatesTags: ["Classrooms"],
    }),
    removeSubject: builder.mutation<
      any,
      { id: number; body: { subject_id: number | string } }
    >({
      query: (values) => ({
        url: `/api/classroom/remove-subject/${values.id}`,
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
  useGetMyClassroomsQuery,
  useCreateClassroomMutation,
  useUpdateClassroomMutation,
  useChangeTeacherMutation,
  useAddSubjectMutation,
  useRemoveSubjectMutation,
  useDeleteTeacherMutation,
} = classroomApiSlice;
