import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  datasets: Array<{
    id: string;
    name: string;
    description: string;
    type: 'text' | 'image' | 'audio' | 'video' | 'mixed';
    size: number; // in KB
    records: number;
    created: string;
    updated: string;
    tags: string[];
    status: 'processing' | 'ready' | 'error';
    owner: string;
  }>;
  knowledgeBases: Array<{
    id: string;
    name: string;
    description: string;
    dataSources: string[];
    created: string;
    updated: string;
    status: 'building' | 'ready' | 'updating' | 'error';
    owner: string;
  }>;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  datasets: [],
  knowledgeBases: [],
  loading: false,
  error: null
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDatasets: (state, action: PayloadAction<DataState['datasets']>) => {
      state.datasets = action.payload;
    },
    addDataset: (state, action: PayloadAction<DataState['datasets'][0]>) => {
      state.datasets.push(action.payload);
    },
    updateDataset: (state, action: PayloadAction<DataState['datasets'][0]>) => {
      const index = state.datasets.findIndex(dataset => dataset.id === action.payload.id);
      if (index !== -1) {
        state.datasets[index] = action.payload;
      }
    },
    deleteDataset: (state, action: PayloadAction<string>) => {
      state.datasets = state.datasets.filter(dataset => dataset.id !== action.payload);
    },
    setKnowledgeBases: (state, action: PayloadAction<DataState['knowledgeBases']>) => {
      state.knowledgeBases = action.payload;
    },
    addKnowledgeBase: (state, action: PayloadAction<DataState['knowledgeBases'][0]>) => {
      state.knowledgeBases.push(action.payload);
    },
    updateKnowledgeBase: (state, action: PayloadAction<DataState['knowledgeBases'][0]>) => {
      const index = state.knowledgeBases.findIndex(kb => kb.id === action.payload.id);
      if (index !== -1) {
        state.knowledgeBases[index] = action.payload;
      }
    },
    deleteKnowledgeBase: (state, action: PayloadAction<string>) => {
      state.knowledgeBases = state.knowledgeBases.filter(kb => kb.id !== action.payload);
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
  setDatasets, 
  addDataset, 
  updateDataset, 
  deleteDataset,
  setKnowledgeBases,
  addKnowledgeBase,
  updateKnowledgeBase,
  deleteKnowledgeBase, 
  setLoading, 
  setError 
} = dataSlice.actions;

export default dataSlice.reducer;
