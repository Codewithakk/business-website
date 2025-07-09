import API from './api'

export default {
    getAllSlides: () => API.get('/api/slider'),
    getSlideById: (id) => API.get(`/api/slider/${id}`),
    createSlide: (slideData) => API.post('/api/slider', slideData),
    updateSlide: (id, slideData) => API.put(`/api/slider/${id}`, slideData),
    deleteSlide: (id) => API.delete(`/api/slider/${id}`)
}