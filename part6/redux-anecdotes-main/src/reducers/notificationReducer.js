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
    clearNotification: () => {
      return ""
    }
  }
});

export const { showNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(showNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  }
}

export default notificationSlice.reducer;
