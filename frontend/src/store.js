import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import incidentReducer from './slices/incidentSlice';
import taskReducer from './slices/taskSlice';
import evidenceReducer from './slices/evidenceSlice';
import timelineReducer from './slices/timelineSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    incidents: incidentReducer,
    tasks: taskReducer,
    evidence: evidenceReducer,
    timeline: timelineReducer,
    users: userReducer,
  },
});

export default store;