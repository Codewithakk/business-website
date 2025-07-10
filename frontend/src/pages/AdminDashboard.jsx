import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaImages, FaInfoCircle, FaTools, FaComments, FaEnvelope } from 'react-icons/fa';
import '../styles/admin/AdminDashboard.css';

export default function AdminDashboard() {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="admin-dashboard">
            <div className="dashboard-container">
                <h1>Admin Dashboard</h1>

                <div className="dashboard-grid">
                    <DashboardCard
                        icon={<FaImages size={24} />}
                        title="Slider Management"
                        description="Manage homepage slider images"
                        link="/admin/slider"
                    />

                    <DashboardCard
                        icon={<FaInfoCircle size={24} />}
                        title="About Section"
                        description="Update about us content"
                        link="/admin/about"
                    />

                    <DashboardCard
                        icon={<FaTools size={24} />}
                        title="Services Management"
                        description="Manage services section"
                        link="/admin/services"
                    />

                    <DashboardCard
                        icon={<FaComments size={24} />}
                        title="Testimonials"
                        description="Manage client testimonials"
                        link="/admin/testimonials"
                    />

                    <DashboardCard
                        icon={<FaEnvelope size={24} />}
                        title="Contact Entries"
                        description="View contact form submissions"
                        link="/admin/contacts"
                    />
                </div>
            </div>
        </div>
    );
}

function DashboardCard({ icon, title, description, link }) {
    return (
        <Link to={link} className="dashboard-card">
            <div className="card-header">
                <div className="card-icon">
                    {icon}
                </div>
                <h3>{title}</h3>
            </div>
            <p className="card-description">{description}</p>
        </Link>
    );
}