import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import servicesService from '../services/servicesService'

export const fetchServices = createAsyncThunk(
    'services/fetchServices',
    async (_, thunkAPI) => {
        try {
            const response = await servicesService.getAllServices()
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const createService = createAsyncThunk(
    'services/createService',
    async (serviceData, thunkAPI) => {
        try {
            const response = await servicesService.createService(serviceData)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const updateService = createAsyncThunk(
    'services/updateService',
    async ({ id, ...serviceData }, thunkAPI) => {
        try {
            const response = await servicesService.updateService(id, serviceData)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const deleteService = createAsyncThunk(
    'services/deleteService',
    async (id, thunkAPI) => {
        try {
            await servicesService.deleteService(id)
            return id
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const toggleServiceStatus = createAsyncThunk(
    'services/toggleServiceStatus',
    async ({ id, isActive }, thunkAPI) => {
        try {
            const response = await servicesService.updateService(id, { isActive })
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const servicesSlice = createSlice({
    name: 'services',
    initialState: {
        services: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false
                state.services = action.payload
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || 'Failed to fetch services'
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.services.push(action.payload)
            })
            .addCase(updateService.fulfilled, (state, action) => {
                const index = state.services.findIndex(service => service._id === action.payload._id)
                if (index !== -1) {
                    state.services[index] = action.payload
                }
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                state.services = state.services.filter(service => service._id !== action.payload)
            })
            .addCase(toggleServiceStatus.fulfilled, (state, action) => {
                const index = state.services.findIndex(service => service._id === action.payload._id)
                if (index !== -1) {
                    state.services[index].isActive = action.payload.isActive
                }
            })
    }
})

export default servicesSlice.reducer