import API from './api'

export default {
    getAllTestimonials: () => API.get('/api/testimonials'),
    getTestimonialById: (id) => API.get(`/api/testimonials/${id}`),
    createTestimonial: (testimonialData) => API.post('/api/testimonials', testimonialData),
    updateTestimonial: (id, testimonialData) => API.put(`/api/testimonials/${id}`, testimonialData),
    deleteTestimonial: (id) => API.delete(`/api/testimonials/${id}`)
}