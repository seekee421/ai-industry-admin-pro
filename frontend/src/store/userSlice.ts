import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  users: Array<{
    id: string;
    username: string;
    name: string;
    role: string;
    department: string;
    email?: string;
    phone?: string;
    status: 'active' | 'inactive';
  }>;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserState['users']>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<UserState['users'][0]>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<UserState['users'][0]>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setUsers, addUser, updateUser, deleteUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
