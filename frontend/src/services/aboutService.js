import API from './api'

export default {
    getAboutContent: () => API.get('/api/about'),
    updateAboutContent: (content) => API.put('/api/about', { content })
}