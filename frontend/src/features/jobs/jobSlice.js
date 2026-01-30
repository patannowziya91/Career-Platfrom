import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    jobs: [],
    job: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

const API_URL = 'http://localhost:5000/api/jobs/';

// Create new job
export const createJob = createAsyncThunk(
    'jobs/create',
    async (jobData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(API_URL, jobData, config);
            return response.data.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get all jobs (Public) - Updated for filters
export const getJobs = createAsyncThunk('jobs/getAll', async (filters, thunkAPI) => {
    try {
        let query = '?';
        if (filters) {
            if (filters.keyword) query += `keyword=${filters.keyword}&`;
            if (filters.location) query += `location=${filters.location}&`;
            if (filters.jobType) query += `jobType=${filters.jobType}&`;
            if (filters.category) query += `category=${filters.category}&`;
        }
        const response = await axios.get(API_URL + query);
        return response.data.data;
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user jobs (Employer)
export const getMyJobs = createAsyncThunk(
    'jobs/getMyJobs',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(API_URL + 'myjobs', config);
            return response.data.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete user job
export const deleteJob = createAsyncThunk(
    'jobs/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(API_URL + id, config);
            return id;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update user job
export const updateJob = createAsyncThunk(
    'jobs/update',
    async ({ id, jobData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.put(API_URL + id, jobData, config);
            return response.data.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createJob.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.jobs.push(action.payload);
            })
            .addCase(createJob.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getJobs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getJobs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.jobs = action.payload;
            })
            .addCase(getJobs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMyJobs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyJobs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.jobs = action.payload;
            })
            .addCase(getMyJobs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteJob.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.jobs = state.jobs.filter((job) => job._id !== action.payload);
            })
            .addCase(deleteJob.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateJob.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.jobs.findIndex(job => job._id === action.payload._id);
                if (index !== -1) {
                    state.jobs[index] = action.payload;
                }
            })
            .addCase(updateJob.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = jobSlice.actions;
export default jobSlice.reducer;
