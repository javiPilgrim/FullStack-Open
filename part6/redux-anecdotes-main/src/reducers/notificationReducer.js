import { createSlice } from "@reduxjs/toolkit";

const initialState = ""


const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      console.log('El payload es: ',action.payload)
      return action.payload;
    },
    clearNotification: (state, action) => {
      return ""
    }
  }
});

export const { showNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
