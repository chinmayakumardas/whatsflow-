
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';  // Importing js-cookie for handling cookies

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Assuming action.payload.user contains the necessary attributes (name, role, etc.)
      const user = {
        name: action.payload.user.name,
        email: action.payload.user.email,
        role: action.payload.user.role,  // You can include any additional fields here
        id: action.payload.user.id,
      };

      // Save token and user in cookies
      Cookies.set('auth_token', action.payload.token, { expires: 7 });  // Token expires in 7 days
      Cookies.set('user', JSON.stringify(user), { expires: 7 });  // User expires in 7 days
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      // Clear cookies on logout
      Cookies.remove('auth_token');
      Cookies.remove('user');
      return initialState;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      Cookies.set('user', JSON.stringify(state.user), { expires: 7 });  // Update user in cookies
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
