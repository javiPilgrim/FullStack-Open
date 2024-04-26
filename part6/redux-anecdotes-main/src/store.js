import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'


const reducer = {
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
}

const store = configureStore({ reducer })


export default store;