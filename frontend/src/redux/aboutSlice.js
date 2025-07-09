import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import aboutService from '../services/aboutService'

export const fetchAboutContent = createAsyncThunk(
    'about/fetchAboutContent',
    async (_, thunkAPI) => {
        try {
            const response = await aboutService.getAboutContent()
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const updateAboutContent = createAsyncThunk(
    'about/updateAboutContent',
    async (content, thunkAPI) => {
        try {
            const response = await aboutService.updateAboutContent(content)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const aboutSlice = createSlice({
    name: 'about',
    initialState: {
        content: '',
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAboutContent.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAboutContent.fulfilled, (state, action) => {
                state.loading = false
                state.content = action.payload.content
            })
            .addCase(fetchAboutContent.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || 'Failed to fetch about content'
            })
            .addCase(updateAboutContent.fulfilled, (state, action) => {
                state.content = action.payload.content
            })
    }
})

export default aboutSlice.reducer