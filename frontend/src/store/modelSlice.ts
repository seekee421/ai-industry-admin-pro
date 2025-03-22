import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModelState {
  models: Array<{
    id: string;
    name: string;
    description: string;
    provider: string;
    version: string;
    parameters: {
      maxTokens: number;
      temperature: number;
      topP: number;
      frequencyPenalty: number;
      presencePenalty: number;
    };
    status: 'active' | 'inactive' | 'deprecated';
    created: string;
    updated: string;
  }>;
  loading: boolean;
  error: string | null;
}

const initialState: ModelState = {
  models: [],
  loading: false,
  error: null
};

const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    setModels: (state, action: PayloadAction<ModelState['models']>) => {
      state.models = action.payload;
    },
    addModel: (state, action: PayloadAction<ModelState['models'][0]>) => {
      state.models.push(action.payload);
    },
    updateModel: (state, action: PayloadAction<ModelState['models'][0]>) => {
      const index = state.models.findIndex(model => model.id === action.payload.id);
      if (index !== -1) {
        state.models[index] = action.payload;
      }
    },
    deleteModel: (state, action: PayloadAction<string>) => {
      state.models = state.models.filter(model => model.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setModels, addModel, updateModel, deleteModel, setLoading, setError } = modelSlice.actions;
export default modelSlice.reducer;
