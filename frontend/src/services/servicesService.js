import API from './api'

export default {
    getAllServices: () => API.get('/api/services'),
    getServiceById: (id) => API.get(`/api/services/${id}`),
    createService: (serviceData) => API.post('/api/services', serviceData),
    updateService: (id, serviceData) => API.put(`/api/services/${id}`, serviceData),
    deleteService: (id) => API.delete(`/api/services/${id}`)
}