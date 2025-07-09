import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import sliderService from '../services/sliderService'

export const fetchSlides = createAsyncThunk(
    'slider/fetchSlides',
    async (_, thunkAPI) => {
        try {
            const response = await sliderService.getAllSlides()
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const createSlide = createAsyncThunk(
    'slider/createSlide',
    async (slideData, thunkAPI) => {
        try {
            const response = await sliderService.createSlide(slideData)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const updateSlide = createAsyncThunk(
    'slider/updateSlide',
    async ({ id, ...slideData }, thunkAPI) => {
        try {
            const response = await sliderService.updateSlide(id, slideData)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const deleteSlide = createAsyncThunk(
    'slider/deleteSlide',
    async (id, thunkAPI) => {
        try {
            await sliderService.deleteSlide(id)
            return id
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const toggleSlideStatus = createAsyncThunk(
    'slider/toggleSlideStatus',
    async ({ id, isActive }, thunkAPI) => {
        try {
            const response = await sliderService.updateSlide(id, { isActive })
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const sliderSlice = createSlice({
    name: 'slider',
    initialState: {
        slides: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSlides.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchSlides.fulfilled, (state, action) => {
                state.loading = false
                state.slides = action.payload
            })
            .addCase(fetchSlides.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || 'Failed to fetch slides'
            })
            .addCase(createSlide.fulfilled, (state, action) => {
                state.slides.push(action.payload)
            })
            .addCase(updateSlide.fulfilled, (state, action) => {
                const index = state.slides.findIndex(slide => slide._id === action.payload._id)
                if (index !== -1) {
                    state.slides[index] = action.payload
                }
            })
            .addCase(deleteSlide.fulfilled, (state, action) => {
                state.slides = state.slides.filter(slide => slide._id !== action.payload)
            })
            .addCase(toggleSlideStatus.fulfilled, (state, action) => {
                const index = state.slides.findIndex(slide => slide._id === action.payload._id)
                if (index !== -1) {
                    state.slides[index].isActive = action.payload.isActive
                }
            })
    }
})

export default sliderSlice.reducer