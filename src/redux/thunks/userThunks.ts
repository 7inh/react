import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserProfile: any = createAsyncThunk("user/getUserProfile", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  const data = await response.json();
  return data;
});
