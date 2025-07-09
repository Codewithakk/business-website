import API from './api'

export default {
    submitContactForm: (formData) => API.post('/api/contact', formData),
    getAllContactSubmissions: () => API.get('/api/contact'),
    deleteContactSubmission: (id) => API.delete(`/api/contact/${id}`)
}