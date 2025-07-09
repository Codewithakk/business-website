import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../services/authService'

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await authService.login(email, password)
            return response.data
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                'Something went wrong'
            return thunkAPI.rejectWithValue({ message })
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        status: 'idle',
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = action.payload.accessToken
                state.user = action.payload.user
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload?.message || 'Login failed'
            })
    }
})

export const { logout, setToken } = authSlice.actions
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export default authSlice.reducer