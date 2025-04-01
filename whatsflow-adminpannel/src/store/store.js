import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './features/authSlice';
// import userReducer from './slices/userSlice';
// import templateReducer from './slices/templateSlice';
import notificationReducer from './features/notificationSlice';
// import messageReducer from './slices/messageSlice';
// import customerReducer from './slices/customerSlice';
const rootReducer = combineReducers({
  auth: authReducer,
//   users: userReducer,
//   customers: customerReducer,
//   templates: templateReducer,
  notifications: notificationReducer,
// message: messageReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
