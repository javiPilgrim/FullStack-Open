
const initialState = {
  message: "",
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEWBLOG":
      return { ...state, message: action.payload };
    case "CLEAR":
      return { ...state, message: "" };
    default:
      return state;
  }
};

export const newBlogNotification = (content) => {
  return {
    type: "NEWBLOG",
    payload: content,
  };
};

export default notificationReducer;
