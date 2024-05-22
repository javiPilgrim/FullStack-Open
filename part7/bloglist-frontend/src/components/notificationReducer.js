const initialState = {
  message: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEWBLOG":
      return { ...state, message: action.payload };
    case "CLEAR":
      return { ...state, message: null };
    default:
      return state;
  }
};

export const newBlogNotification = (content) => {
  return {
    type: "NEWBLOG",
    payload: content
  };
};

export default notificationReducer;
