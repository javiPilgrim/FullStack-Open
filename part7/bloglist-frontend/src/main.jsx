import ReactDOM from "react-dom/client";
import App from "./App";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from "./components/notificationReducer";

const store = createStore(notificationReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
  )