import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../components/UI/Modal';
import TestimonialForm from '../components/forms/TestimonialForm';
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaStar } from 'react-icons/fa';
import '../styles/admin/TestimonialsManagement.css';

export default function TestimonialsManagement() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/testimonials');
            if (!response.ok) {
                throw new Error('Failed to fetch testimonials');
            }
            const data = await response.json();
            setTestimonials(data);
        } catch (error) {
            toast.error(error.message || 'Failed to load testimonials');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (testimonialData) => {
        try {
            // Validate rating
            if (testimonialData.rating < 1 || testimonialData.rating > 5) {
                throw new Error('Rating must be between 1 and 5');
            }

            let response;
            if (currentTestimonial) {
                // Update existing testimonial
                response = await fetch(`http://localhost:3000/api/testimonials/${currentTestimonial._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(testimonialData)
                });
            } else {
                // Create new testimonial
                response = await fetch('http://localhost:3000/api/testimonials', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(testimonialData)
                });
            }

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Operation failed');
            }

            toast.success(`Testimonial ${currentTestimonial ? 'updated' : 'created'} successfully`);
            fetchTestimonials();
            setIsModalOpen(false);
            setCurrentTestimonial(null);
        } catch (error) {
            toast.error(error.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/testimonials/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Delete failed');
                }

                toast.success('Testimonial deleted successfully');
                fetchTestimonials();
            } catch (error) {
                toast.error(error.message || 'Delete failed');
            }
        }
    };

    const handleToggleStatus = async (id, isActive) => {
        try {
            const response = await fetch(`http://localhost:3000/api/testimonials/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isActive: !isActive })
            });

            if (!response.ok) {
                throw new Error('Status update failed');
            }

            toast.success('Testimonial status updated');
            fetchTestimonials();
        } catch (error) {
            toast.error(error.message || 'Status update failed');
        }
    };

    const renderRatingStars = (rating) => {
        return (
            <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                    <FaStar
                        key={i}
                        className={i < rating ? 'star-filled' : 'star-empty'}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="testimonials-management-container">
            <div className="testimonials-header">
                <h1>Testimonials Management</h1>
                <button
                    onClick={() => {
                        setCurrentTestimonial(null);
                        setIsModalOpen(true);
                    }}
                    className="add-testimonial-button"
                >
                    <FaPlus className="button-icon" /> Add New Testimonial
                </button>
            </div>

            {loading ? (
                <div className="loading-text">Loading testimonials...</div>
            ) : (
                <div className="testimonials-table-container">
                    <table className="testimonials-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Position</th>
                                <th>Message</th>
                                <th>Rating</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testimonials.map((testimonial) => (
                                <tr key={testimonial._id}>
                                    <td>{testimonial.name}</td>
                                    <td>{testimonial.email}</td>
                                    <td>{testimonial.position}</td>
                                    <td className="message-cell">
                                        {testimonial.message.length > 50
                                            ? `${testimonial.message.substring(0, 50)}...`
                                            : testimonial.message}
                                    </td>
                                    <td>{renderRatingStars(testimonial.rating)}</td>
                                    <td>
                                        <button
                                            onClick={() => handleToggleStatus(testimonial._id, testimonial.isActive)}
                                            className={`status-button ${testimonial.isActive ? 'active' : 'inactive'}`}
                                            title={testimonial.isActive ? 'Active' : 'Inactive'}
                                        >
                                            {testimonial.isActive ? (
                                                <FaToggleOn className="toggle-icon active" />
                                            ) : (
                                                <FaToggleOff className="toggle-icon inactive" />
                                            )}
                                        </button>
                                    </td>
                                    <td className="actions-cell">
                                        <button
                                            onClick={() => {
                                                setCurrentTestimonial(testimonial);
                                                setIsModalOpen(true);
                                            }}
                                            className="edit-button"
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(testimonial._id)}
                                            className="delete-button"
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <TestimonialForm
                    initialValues={currentTestimonial || {
                        name: '',
                        email: '',
                        position: '',
                        rating: 5,
                        message: '',
                        isActive: true
                    }}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}