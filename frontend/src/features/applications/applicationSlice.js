import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    applications: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

const API_URL = 'http://localhost:5000/api/applications/';

// Apply for a job
export const applyForJob = createAsyncThunk(
    'applications/apply',
    async (applicationData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(API_URL, applicationData, config);
            return response.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get my applications (Seeker)
export const getMyApplications = createAsyncThunk(
    'applications/getMyApplications',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(API_URL + 'my-applications', config);
            return response.data.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get applications for a job (Employer)
export const getJobApplications = createAsyncThunk(
    'applications/getJobApplications',
    async (jobId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(API_URL + 'job/' + jobId, config);
            return response.data.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update application status (Employer)
export const updateApplicationStatus = createAsyncThunk(
    'applications/updateStatus',
    async ({ id, status }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.patch(
                API_URL + id,
                { status },
                config
            );
            return response.data.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(applyForJob.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(applyForJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // Ideally show a toast
            })
            .addCase(applyForJob.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMyApplications.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyApplications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.applications = action.payload;
            })
            .addCase(getMyApplications.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getJobApplications.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getJobApplications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.applications = action.payload;
            })
            .addCase(getJobApplications.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateApplicationStatus.fulfilled, (state, action) => {
                const index = state.applications.findIndex(app => app._id === action.payload._id);
                if (index !== -1) {
                    state.applications[index] = action.payload;
                }
            });
    },
});

export const { reset } = applicationSlice.actions;
export default applicationSlice.reducer;
