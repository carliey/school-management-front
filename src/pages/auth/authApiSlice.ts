import { apiSlice } from "../../redux/apiSlice";
import { User } from "../../types/types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (values) => ({
        url: "/signin",
        method: "POST",
        body: { ...values },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
