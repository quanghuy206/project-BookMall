import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: {
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: ""
  }
};


export const accountSlice = createSlice({
  name: 'account',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    doLoginAction: (state, action) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
    doGetAccountAction: (state, action) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload.user
    },
    //Logout 
    doLogoutAccountAction: (state, action) => {
      localStorage.removeItem("access_token")
      state.isAuthenticated = false,
        state.user = {
          email: "",
          phone: "",
          fullName: "",
          role: "",
          avatar: "",
          id: ""
        }
    }
  },


});

export const { doLoginAction, doGetAccountAction, doLogoutAccountAction } = accountSlice.actions;

export default accountSlice.reducer;
