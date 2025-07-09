import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    toggleTestimonialStatus
} from '../redux/testimonialsSlice';
import Modal from '../components/UI/Modal';
import TestimonialForm from '../components/forms/TestimonialForm';
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import '../styles/admin/TestimonialsManagement.css';

export default function TestimonialsManagement() {
    const dispatch = useDispatch();
    const { testimonials, loading } = useSelector((state) => state.testimonials);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(null);

    useEffect(() => {
        dispatch(fetchTestimonials());
    }, [dispatch]);

    const handleSubmit = async (testimonialData) => {
        try {
            if (currentTestimonial) {
                await dispatch(updateTestimonial({ id: currentTestimonial._id, ...testimonialData })).unwrap();
                toast.success('Testimonial updated successfully');
            } else {
                await dispatch(createTestimonial(testimonialData)).unwrap();
                toast.success('Testimonial created successfully');
            }
            setIsModalOpen(false);
            setCurrentTestimonial(null);
        } catch (error) {
            toast.error(error.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await dispatch(deleteTestimonial(id)).unwrap();
                toast.success('Testimonial deleted successfully');
            } catch (error) {
                toast.error(error.message || 'Delete failed');
            }
        }
    };

    const handleToggleStatus = async (id, isActive) => {
        try {
            await dispatch(toggleTestimonialStatus({ id, isActive: !isActive })).unwrap();
            toast.success('Testimonial status updated');
        } catch (error) {
            toast.error(error.message || 'Status update failed');
        }
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
                                <th>Message</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testimonials.map((testimonial) => (
                                <tr key={testimonial._id}>
                                    <td>{testimonial.name}</td>
                                    <td className="message-cell">{testimonial.message}</td>
                                    <td>
                                        <button
                                            onClick={() => handleToggleStatus(testimonial._id, testimonial.isActive)}
                                            className="toggle-button"
                                        >
                                            {testimonial.isActive ? (
                                                <FaToggleOn className="toggle-on" />
                                            ) : (
                                                <FaToggleOff className="toggle-off" />
                                            )}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setCurrentTestimonial(testimonial);
                                                setIsModalOpen(true);
                                            }}
                                            className="edit-button"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(testimonial._id)}
                                            className="delete-button"
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
                    initialValues={currentTestimonial || { name: '', message: '', isActive: true }}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}