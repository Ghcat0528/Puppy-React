import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import App from "../App";
import axios from "axios";

export const grabPlayers = async () => {
  try {
    const response = await axios.get(
      "https://fsa-puppy-bowl.herokuapp.com/api/2109-UNF-HY-WEB-PT/players"
    );
    return response.data;
  } catch (error) {
    console.error("We didnt get those players...", error);
  }
};
export const puppyBowlApi = createApi({
  reducerPath: "puppyBowlApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-puppy-bowl.herokuapp.com/api/2109-UNF-HY-WEB-PT/",
  }),
  endpoints: (builder) => ({
    getPlayers: builder.query({
      query: () => "players",
    }),
  }),
});

export const deletePlayer = async (id) => {
    try {
      const response = await axios.delete(
        `https://fsa-puppy-bowl.herokuapp.com/api/2109-UNF-HY-WEB-PT/players/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting the player:', error);
    }
  };
