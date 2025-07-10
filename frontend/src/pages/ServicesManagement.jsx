import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from '../components/UI/Modal';
import ServiceForm from '../components/forms/ServiceForm';
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import '../styles/admin/ServicesManagement.css';

const API_URL = 'http://localhost:3000/api/services';

export default function ServicesManagement() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentService, setCurrentService] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            setLoading(true);
            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setServices(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (serviceData) => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            if (currentService) {
                await axios.put(`${API_URL}/${currentService._id}`, serviceData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                toast.success('Service updated successfully');
            } else {
                await axios.post(API_URL, serviceData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                toast.success('Service created successfully');
            }
            setIsModalOpen(false);
            setCurrentService(null);
            fetchServices(); // Refresh the list
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isModalOpen]);

    const handleDelete = async (id) => {
        const accessToken = localStorage.getItem('accessToken');
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await axios.delete(`${API_URL}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                toast.success('Service deleted successfully');
                fetchServices(); // Refresh the list
            } catch (error) {
                toast.error(error.response?.data?.message || 'Delete failed');
            }
        }
    };

    const handleToggleStatus = async (id, isActive) => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            await axios.patch(
                `${API_URL}/${id}/status`,
                { isActive: !isActive },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            toast.success('Service status updated');
            fetchServices(); // Refresh the list
        } catch (error) {
            toast.error(error.response?.data?.message || 'Status update failed');
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
                    initialValues={
                        currentService || {
                            title: '',
                            imageUrl: '',
                            description: '',
                            serviceLink: '',
                            isActive: true,
                        }
                    }
                    onSubmit={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}
