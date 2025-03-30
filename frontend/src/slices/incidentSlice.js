import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  incidents: [],
  incident: null,
  activeIncidents: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new incident
export const createIncident = createAsyncThunk(
  'incidents/create',
  async (incidentData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${state.auth.user.token}`,
        },
      };

      const { data } = await axios.post('/api/incidents', incidentData, config);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all incidents
export const getIncidents = createAsyncThunk(
  'incidents/getAll',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${state.auth.user.token}`,
        },
      };

      const { data } = await axios.get('/api/incidents', config);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get active incidents
export const getActiveIncidents = createAsyncThunk(
  'incidents/getActive',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${state.auth.user.token}`,
        },
      };

      const { data } = await axios.get('/api/incidents/active', config);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get incident details
export const getIncidentDetails = createAsyncThunk(
  'incidents/getDetails',
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${state.auth.user.token}`,
        },
      };

      const { data } = await axios.get(`/api/incidents/${id}`, config);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update incident
export const updateIncident = createAsyncThunk(
  'incidents/update',
  async ({ id, incidentData }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${state.auth.user.token}`,
        },
      };

      const { data } = await axios.put(`/api/incidents/${id}`, incidentData, config);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update incident status
export const updateIncidentStatus = createAsyncThunk(
  'incidents/updateStatus',
  async ({ id, status }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${state.auth.user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/incidents/${id}/status`,
        { status },
        config
      );
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete incident
export const deleteIncident = createAsyncThunk(
  'incidents/delete',
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${state.auth.user.token}`,
        },
      };

      await axios.delete(`/api/incidents/${id}`, config);
      return id;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const incidentSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    reset: (state) => initialState,
    clearIncident: (state) => {
      state.incident = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createIncident.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createIncident.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incidents.push(action.payload);
      })
      .addCase(createIncident.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getIncidents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIncidents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incidents = action.payload;
      })
      .addCase(getIncidents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getActiveIncidents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveIncidents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.activeIncidents = action.payload;
      })
      .addCase(getActiveIncidents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getIncidentDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIncidentDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incident = action.payload;
      })
      .addCase(getIncidentDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateIncident.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateIncident.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incident = action.payload;
        state.incidents = state.incidents.map((incident) =>
          incident._id === action.payload._id ? action.payload : incident
        );
      })
      .addCase(updateIncident.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateIncidentStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateIncidentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incident = action.payload;
        state.incidents = state.incidents.map((incident) =>
          incident._id === action.payload._id ? action.payload : incident
        );
      })
      .addCase(updateIncidentStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteIncident.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteIncident.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incidents = state.incidents.filter(
          (incident) => incident._id !== action.payload
        );
      })
      .addCase(deleteIncident.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearIncident } = incidentSlice.actions;
export default incidentSlice.reducer;