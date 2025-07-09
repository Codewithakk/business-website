import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import contactService from '../services/contactService'

export const fetchContactSubmissions = createAsyncThunk(
    'contact/fetchContactSubmissions',
    async (_, thunkAPI) => {
        try {
            const response = await contactService.getAllContactSubmissions()
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const deleteContactSubmission = createAsyncThunk(
    'contact/deleteContactSubmission',
    async (id, thunkAPI) => {
        try {
            await contactService.deleteContactSubmission(id)
            return id
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        submissions: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContactSubmissions.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchContactSubmissions.fulfilled, (state, action) => {
                state.loading = false
                state.submissions = action.payload
            })
            .addCase(fetchContactSubmissions.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || 'Failed to fetch contact submissions'
            })
            .addCase(deleteContactSubmission.fulfilled, (state, action) => {
                state.submissions = state.submissions.filter(sub => sub._id !== action.payload)
            })
    }
})

export default contactSlice.reducer