import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  applications: Array<{
    id: string;
    name: string;
    description: string;
    type: string;
    status: 'development' | 'testing' | 'production' | 'deprecated';
    apiKey: string;
    created: string;
    updated: string;
    models: string[];
    knowledgeBases: string[];
    owner: string;
    accessControl: {
      public: boolean;
      allowedUsers: string[];
      allowedDepartments: string[];
    };
  }>;
  loading: boolean;
  error: string | null;
}

const initialState: AppState = {
  applications: [],
  loading: false,
  error: null
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setApplications: (state, action: PayloadAction<AppState['applications']>) => {
      state.applications = action.payload;
    },
    addApplication: (state, action: PayloadAction<AppState['applications'][0]>) => {
      state.applications.push(action.payload);
    },
    updateApplication: (state, action: PayloadAction<AppState['applications'][0]>) => {
      const index = state.applications.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state.applications[index] = action.payload;
      }
    },
    deleteApplication: (state, action: PayloadAction<string>) => {
      state.applications = state.applications.filter(app => app.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { 
  setApplications, 
  addApplication, 
  updateApplication, 
  deleteApplication, 
  setLoading, 
  setError 
} = appSlice.actions;

export default appSlice.reducer;
