import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SystemResources {
  cpu: {
    usage: number;        // percentage (0-1)
    temperature: number;  // in Celsius
  };
  memory: {
    total: number;        // in MB
    used: number;         // in MB
    usage: number;        // percentage (0-1)
  };
  disk: {
    total: number;        // in GB
    used: number;         // in GB
    usage: number;        // percentage (0-1)
  };
  gpu?: {
    usage: number;        // percentage (0-1)
    temperature: number;  // in Celsius
    memory: {
      total: number;      // in MB
      used: number;       // in MB
    };
  };
  timestamp: string;      // ISO string
}

interface ApiStats {
  totalCalls: number;
  successRate: number;    // percentage (0-1)
  averageResponseTime: number; // in ms
  callsByEndpoint: Record<string, number>;
  callsByModel: Record<string, number>;
  callsByApp: Record<string, number>;
  timeRange: {
    from: string;         // ISO string
    to: string;           // ISO string
  };
}

interface AlertEvent {
  id: string;
  type: 'warning' | 'error' | 'critical';
  message: string;
  timestamp: string;      // ISO string
  source: string;
  resolved: boolean;
  resolvedAt?: string;    // ISO string
}

interface MonitorState {
  systemResources: SystemResources | null;
  apiStats: ApiStats | null;
  alerts: AlertEvent[];
  loading: boolean;
  error: string | null;
}

const initialState: MonitorState = {
  systemResources: null,
  apiStats: null,
  alerts: [],
  loading: false,
  error: null
};

const monitorSlice = createSlice({
  name: 'monitor',
  initialState,
  reducers: {
    setSystemResources: (state, action: PayloadAction<SystemResources>) => {
      state.systemResources = action.payload;
    },
    setApiStats: (state, action: PayloadAction<ApiStats>) => {
      state.apiStats = action.payload;
    },
    setAlerts: (state, action: PayloadAction<AlertEvent[]>) => {
      state.alerts = action.payload;
    },
    addAlert: (state, action: PayloadAction<AlertEvent>) => {
      state.alerts.push(action.payload);
    },
    resolveAlert: (state, action: PayloadAction<string>) => {
      const alert = state.alerts.find(a => a.id === action.payload);
      if (alert) {
        alert.resolved = true;
        alert.resolvedAt = new Date().toISOString();
      }
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
  setSystemResources, 
  setApiStats, 
  setAlerts, 
  addAlert, 
  resolveAlert,
  setLoading, 
  setError 
} = monitorSlice.actions;

export default monitorSlice.reducer;
