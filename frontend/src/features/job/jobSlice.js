import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import jobService from './jobService'

const initialState = {
    jobs: [],
    job: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}



// Create new job
export const createJob = createAsyncThunk('job/create', async(jobData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await jobService.createJob(jobData, token)
    } catch (error) {
        const message = (error.response && 
            error.response.data && error.response.data.message )
            || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})


// Get user job
export const getJobs = createAsyncThunk('job/getAll', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const myToken = thunkAPI.getState().jobs
        console.log("MyToken", myToken);
        return await jobService.getJobs(token)
    } catch (error) {
        const message = (error.response && 
            error.response.data && error.response.data.message )
            || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})

// Get user job
export const getJob = createAsyncThunk('job/get', async(jobId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await jobService.getJob(jobId, token)
    } catch (error) {
        const message = (error.response && 
            error.response.data && error.response.data.message )
            || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})

// Close job
export const closeJob = createAsyncThunk('job/close', async(jobId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await jobService.closeJob(jobId, token)
    } catch (error) {
        const message = (error.response && 
            error.response.data && error.response.data.message )
            || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
    }
})


export const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(createJob.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(createJob.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
        })
        builder.addCase(createJob.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        builder.addCase(getJobs.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getJobs.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.jobs = action.payload
        })
        builder.addCase(getJobs.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        builder.addCase(getJob.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getJob.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.job = action.payload
        })
        builder.addCase(getJob.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        builder.addCase(closeJob.fulfilled, (state, action) => {
            state.isLoading = false
            state.jobs.map((job) => job._id === action.payload._id ? (job.status = "closed" ) : job)
        })
        
    }
    
})


export const {reset} = jobSlice.actions

export default jobSlice.reducer