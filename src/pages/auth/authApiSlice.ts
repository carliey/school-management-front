import { apiSlice } from "../../redux/apiSlice";
import { User } from "../../types/types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      User,
      { username: FormDataEntryValue; password: FormDataEntryValue }
    >({
      query: (values) => ({
        url: "/signin",
        method: "POST",
        body: { ...values },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
