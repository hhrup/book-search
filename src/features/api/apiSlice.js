import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// GET https://www.googleapis.com/books/v1/volumes?q=flowers&key=yourAPIKey
// GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:authorName&key=yourAPIKey

// API KEY:  AIzaSyAp6SLHaaTOPd_CqeW3xV2ffOaUYnoKBkA
// Use this key in your application by passing it with key=API_KEY parameter.
const apiKey = 'AIzaSyAp6SLHaaTOPd_CqeW3xV2ffOaUYnoKBkA';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://www.googleapis.com/books/v1'}),
  endpoints: builder => ({
    getVolumes: builder.query({
      query: (options) => {
        // const index = options.startIndex === 0 ? 0 : options.startIndex
        const a = 
          '/volumes?q='
            +`${options.title?? ''}`
            +`${options.author !== '' ? `+inauthor:${options.author}` : ''}`
            +`&startIndex=${options.startIndex}`
            +`&key=${apiKey}`;
        console.log(a);
        return a;
      }
    })
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetVolumesQuery } = apiSlice
