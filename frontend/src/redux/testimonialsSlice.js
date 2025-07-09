import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import testimonialsService from '../services/testimonialsService'

export const fetchTestimonials = createAsyncThunk(
    'testimonials/fetchTestimonials',
    async (_, thunkAPI) => {
        try {
            const response = await testimonialsService.getAllTestimonials()
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const createTestimonial = createAsyncThunk(
    'testimonials/createTestimonial',
    async (testimonialData, thunkAPI) => {
        try {
            const response = await testimonialsService.createTestimonial(testimonialData)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const updateTestimonial = createAsyncThunk(
    'testimonials/updateTestimonial',
    async ({ id, ...testimonialData }, thunkAPI) => {
        try {
            const response = await testimonialsService.updateTestimonial(id, testimonialData)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const deleteTestimonial = createAsyncThunk(
    'testimonials/deleteTestimonial',
    async (id, thunkAPI) => {
        try {
            await testimonialsService.deleteTestimonial(id)
            return id
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const toggleTestimonialStatus = createAsyncThunk(
    'testimonials/toggleTestimonialStatus',
    async ({ id, isActive }, thunkAPI) => {
        try {
            const response = await testimonialsService.updateTestimonial(id, { isActive })
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const testimonialsSlice = createSlice({
    name: 'testimonials',
    initialState: {
        testimonials: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestimonials.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchTestimonials.fulfilled, (state, action) => {
                state.loading = false
                state.testimonials = action.payload
            })
            .addCase(fetchTestimonials.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || 'Failed to fetch testimonials'
            })
            .addCase(createTestimonial.fulfilled, (state, action) => {
                state.testimonials.push(action.payload)
            })
            .addCase(updateTestimonial.fulfilled, (state, action) => {
                const index = state.testimonials.findIndex(t => t._id === action.payload._id)
                if (index !== -1) {
                    state.testimonials[index] = action.payload
                }
            })
            .addCase(deleteTestimonial.fulfilled, (state, action) => {
                state.testimonials = state.testimonials.filter(t => t._id !== action.payload)
            })
            .addCase(toggleTestimonialStatus.fulfilled, (state, action) => {
                const index = state.testimonials.findIndex(t => t._id === action.payload._id)
                if (index !== -1) {
                    state.testimonials[index].isActive = action.payload.isActive
                }
            })
    }
})

export default testimonialsSlice.reducer