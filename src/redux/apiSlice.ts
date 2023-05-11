import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { logout } from "../pages/auth/authSlice";

const api_url = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: api_url || "http://localhost:5050",
  prepareHeaders: (headers, { getState }) => {
    // const token = (getState() as RootState).auth.token;

    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      const { token } = JSON.parse(credentials);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
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
    api.dispatch(logout()); // logout user
    api.dispatch(apiSlice.util.resetApiState());
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQuerywithAuth,
  endpoints: (builder) => ({}),
});
