import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
    fetchServices,
    createService,
    updateService,
    deleteService,
    toggleServiceStatus
} from '../redux/servicesSlice';
import Modal from '../components/UI/Modal';
import ServiceForm from '../components/forms/ServiceForm';
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import '../styles/admin/ServicesManagement.css';

export default function ServicesManagement() {
    const dispatch = useDispatch();
    const { services, loading } = useSelector((state) => state.services);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentService, setCurrentService] = useState(null);

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const handleSubmit = async (serviceData) => {
        try {
            if (currentService) {
                await dispatch(updateService({ id: currentService._id, ...serviceData })).unwrap();
                toast.success('Service updated successfully');
            } else {
                await dispatch(createService(serviceData)).unwrap();
                toast.success('Service created successfully');
            }
            setIsModalOpen(false);
            setCurrentService(null);
        } catch (error) {
            toast.error(error.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await dispatch(deleteService(id)).unwrap();
                toast.success('Service deleted successfully');
            } catch (error) {
                toast.error(error.message || 'Delete failed');
            }
        }
    };

    const handleToggleStatus = async (id, isActive) => {
        try {
            await dispatch(toggleServiceStatus({ id, isActive: !isActive })).unwrap();
            toast.success('Service status updated');
        } catch (error) {
            toast.error(error.message || 'Status update failed');
        }
    };

    return (
        <div className="services-management-container">
            <div className="services-header">
                <h1>Services Management</h1>
                <button
                    onClick={() => {
                        setCurrentService(null);
                        setIsModalOpen(true);
                    }}
                    className="add-service-button"
                >
                    <FaPlus className="button-icon" /> Add New Service
                </button>
            </div>

            {loading ? (
                <div className="loading-text">Loading services...</div>
            ) : (
                <div className="services-grid">
                    {services.map((service) => (
                        <div key={service._id} className="service-card">
                            <img
                                src={service.imageUrl}
                                alt={service.title}
                                className="service-image"
                            />
                            <div className="service-content">
                                <div className="service-header">
                                    <h3>{service.title}</h3>
                                    <button
                                        onClick={() => handleToggleStatus(service._id, service.isActive)}
                                        className="toggle-button"
                                    >
                                        {service.isActive ? (
                                            <FaToggleOn className="toggle-on" />
                                        ) : (
                                            <FaToggleOff className="toggle-off" />
                                        )}
                                    </button>
                                </div>
                                <p className="service-description">{service.description}</p>
                                <div className="service-actions">
                                    <button
                                        onClick={() => {
                                            setCurrentService(service);
                                            setIsModalOpen(true);
                                        }}
                                        className="edit-button"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service._id)}
                                        className="delete-button"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ServiceForm
                    initialValues={currentService || { title: '', imageUrl: '', description: '', isActive: true }}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}