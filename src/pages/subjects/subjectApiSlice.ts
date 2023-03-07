import { apiSlice } from "../../redux/apiSlice";
import { Subject } from "../../types/types";

const apiSliceWithTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Subjects"],
});

export const subjectApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getSubjects: builder.query<any, void>({
      query: () => "/api/subjects",
      providesTags: ["Subjects"],
    }),
    createSubject: builder.mutation<any, Subject>({
      query: (values) => ({
        url: "/api/subject/create",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["Subjects"],
    }),

    updateSubject: builder.mutation<any, { id: number; body: Subject }>({
      query: (values) => ({
        url: `/api/subject/update/${values.id}`,
        method: "PUT",
        body: values.body,
      }),
      invalidatesTags: ["Subjects"],
    }),

    deleteSubject: builder.mutation<any, Subject>({
      query: (values) => ({
        url: `/api/subject/delete/${values.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subjects"],
    }),
  }),
});

export const {
  useGetSubjectsQuery,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectApiSlice;
