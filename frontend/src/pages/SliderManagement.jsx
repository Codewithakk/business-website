import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import {
    fetchSlides,
    createSlide,
    updateSlide,
    deleteSlide,
    toggleSlideStatus
} from '../redux/sliderSlice';
import Modal from '../components/UI/Modal';
import SlideForm from '../components/forms/SlideForm';
import '../styles/admin/SliderManagement.css';

export default function SliderManagement() {
    const dispatch = useDispatch();
    const { slides, loading } = useSelector((state) => state.slider);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(null);

    useEffect(() => {
        dispatch(fetchSlides());
    }, [dispatch]);

    const handleSubmit = async (slideData) => {
        try {
            if (currentSlide) {
                await dispatch(updateSlide({ id: currentSlide._id, ...slideData })).unwrap();
                toast.success('Slide updated successfully');
            } else {
                await dispatch(createSlide(slideData)).unwrap();
                toast.success('Slide created successfully');
            }
            setIsModalOpen(false);
            setCurrentSlide(null);
        } catch (error) {
            toast.error(error.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this slide?')) {
            try {
                await dispatch(deleteSlide(id)).unwrap();
                toast.success('Slide deleted successfully');
            } catch (error) {
                toast.error(error.message || 'Delete failed');
            }
        }
    };

    const handleToggleStatus = async (id, isActive) => {
        try {
            await dispatch(toggleSlideStatus({ id, isActive: !isActive })).unwrap();
            toast.success('Slide status updated');
        } catch (error) {
            toast.error(error.message || 'Status update failed');
        }
    };

    return (
        <div className="slider-management-container">
            <div className="slider-header">
                <h1>Slider Management</h1>
                <button
                    onClick={() => {
                        setCurrentSlide(null);
                        setIsModalOpen(true);
                    }}
                    className="add-slide-button"
                >
                    <FaPlus className="button-icon" /> Add New Slide
                </button>
            </div>

            {loading ? (
                <div className="loading-text">Loading slides...</div>
            ) : (
                <div className="slides-table-container">
                    <table className="slides-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Alt Text</th>
                                <th>Order</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slides.map((slide) => (
                                <tr key={slide._id}>
                                    <td>
                                        <img src={slide.imageUrl} alt={slide.altText} className="slide-image" />
                                    </td>
                                    <td>{slide.altText}</td>
                                    <td>{slide.order}</td>
                                    <td>
                                        <button
                                            onClick={() => handleToggleStatus(slide._id, slide.isActive)}
                                            className="toggle-button"
                                        >
                                            {slide.isActive ? (
                                                <FaToggleOn className="toggle-on" />
                                            ) : (
                                                <FaToggleOff className="toggle-off" />
                                            )}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setCurrentSlide(slide);
                                                setIsModalOpen(true);
                                            }}
                                            className="edit-button"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(slide._id)}
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
                <SlideForm
                    initialValues={currentSlide || { imageUrl: '', altText: '', order: 0, isActive: true }}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}