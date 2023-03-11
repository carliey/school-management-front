import { apiSlice } from "../../redux/apiSlice";
import { Teacher, User } from "../../types/types";

const apiSliceWithTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Teachers"],
});

export const teacherApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query<any, void>({
      query: () => "/api/teachers",
      providesTags: ["Teachers"],
    }),
    createTeacher: builder.mutation<any, Teacher>({
      query: (values) => ({
        url: "/api/teacher/create",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["Teachers"],
    }),
    updateTeacher: builder.mutation<any, { id: number; body: Teacher }>({
      query: (values) => ({
        url: `/api/teacher/update/${values.id}`,
        method: "PUT",
        body: values.body,
      }),
      invalidatesTags: ["Teachers"],
    }),
    deleteTeacher: builder.mutation<any, Teacher>({
      query: (values) => ({
        url: `/api/teacher/delete/${values.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teachers"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teacherApiSlice;
