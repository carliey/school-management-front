import { apiSlice } from "../../redux/apiSlice";
import { Teacher, User } from "../../types/types";

const apiSliceWithTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Teacher"],
});

export const teacherApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query<any, void>({
      query: () => "/api/teachers",
      providesTags: ["Teacher"],
    }),
    createTeacher: builder.mutation<any, Teacher>({
      query: (values) => ({
        url: "/api/teacher/create",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["Teacher"],
    }),
    updateTeacher: builder.mutation<any, { id: number; body: Teacher }>({
      query: (values) => ({
        url: `/api/teacher/update/${values.id}`,
        method: "PUT",
        body: values.body,
      }),
      invalidatesTags: ["Teacher"],
    }),
    deleteTeacher: builder.mutation<any, Teacher>({
      query: (values) => ({
        url: `/api/teacher/delete/${values.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teacher"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teacherApiSlice;
