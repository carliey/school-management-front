import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

type LocalStorageType = {
  token: string;
  user: string;
};

const baseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:5050",
  prepareHeaders: (headers, { getState }) => {
    // const token = (getState() as RootState).auth.token;
    const { token } = JSON.parse(localStorage.getItem("credentials") || "");

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQuerywithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // unauthorised
    alert("Error unauthorised");
    // dispactch logout
    // reset state
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQuerywithAuth,
  endpoints: (builder) => ({}),
});
