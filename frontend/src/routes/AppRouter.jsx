import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import AdminLogin from '../pages/AdminLogin'
import AdminDashboard from '../pages/AdminDashboard'
import ProtectedRoute from '../components/ProtectedRoute'
import NotFound from '../pages/NotFound'
import SliderManagement from '../pages/SliderManagement'
import AboutManagement from '../pages/AboutManagement'
import ServicesManagement from '../pages/ServicesManagement'
import TestimonialsManagement from '../pages/TestimonialsManagement'
import ContactEntries from '../pages/ContactEntries'

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route>
                {/* <Route element={<ProtectedRoute />}> */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/slider" element={<SliderManagement />} />
                <Route path="/admin/about" element={<AboutManagement />} />
                <Route path="/admin/services" element={<ServicesManagement />} />
                <Route path="/admin/testimonials" element={<TestimonialsManagement />} />
                <Route path="/admin/contacts" element={<ContactEntries />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRouter