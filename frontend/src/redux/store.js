import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import sliderReducer from './sliderSlice'
import aboutReducer from './aboutSlice'
import servicesReducer from './servicesSlice'
import testimonialsReducer from './testimonialsSlice'
import contactReducer from './contactSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        slider: sliderReducer,
        about: aboutReducer,
        services: servicesReducer,
        testimonials: testimonialsReducer,
        contact: contactReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})