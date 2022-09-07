import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://powerful-falls-13113.herokuapp.com/",
  }),
  endpoints: (builder) => ({
    getAllEvents: builder.query({ query: () => "events/" }),
    getEventById: builder.query({ query: (eventid) => `events/${eventid}` }),
  }),
});

export const { useGetAllEvents, useGetEventById } = eventsApi;
