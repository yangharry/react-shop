import { createSlice } from '@reduxjs/toolkit';
if (sessionStorage.getItem('user') == null) {
  sessionStorage.setItem('user', JSON.stringify(null));
}

let user = createSlice({
  name: 'user',
  initialState: JSON.parse(sessionStorage.getItem('user')),
  reducers: {
    setUser(state, action) {
      if (!action.payload) {
        sessionStorage.removeItem('user');
      } else {
        sessionStorage.setItem('user', JSON.stringify(action.payload));
      }
      return action.payload;
    },
  },
});

export let { setUser } = user.actions;

export default user;
