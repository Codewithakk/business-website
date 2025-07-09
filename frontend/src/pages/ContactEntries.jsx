import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchContactSubmissions, deleteContactSubmission } from '../redux/contactSlice';
import { FaTrash, FaEnvelope, FaUser, FaCalendar } from 'react-icons/fa';
import { format } from 'date-fns';
import '../styles/admin/ContactEntries.css';

export default function ContactEntries() {
    const dispatch = useDispatch();
    const { submissions, loading } = useSelector((state) => state.contact);

    useEffect(() => {
        dispatch(fetchContactSubmissions());
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            try {
                await dispatch(deleteContactSubmission(id)).unwrap();
                toast.success('Submission deleted successfully');
            } catch (error) {
                toast.error(error.message || 'Delete failed');
            }
        }
    };

    if (loading) return <div className="loading-text">Loading submissions...</div>;

    return (
        <div className="contact-entries-container">
            <h1>Contact Form Submissions</h1>

            <div className="entries-table-container">
                {submissions.length === 0 ? (
                    <div className="empty-message">No submissions found</div>
                ) : (
                    <table className="entries-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((submission) => (
                                <tr key={submission._id}>
                                    <td>
                                        <div className="table-cell">
                                            <FaUser className="table-icon" />
                                            <span>{submission.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="table-cell">
                                            <FaEnvelope className="table-icon" />
                                            <span>{submission.email}</span>
                                        </div>
                                    </td>
                                    <td className="message-cell">{submission.message}</td>
                                    <td>
                                        <div className="table-cell">
                                            <FaCalendar className="table-icon" />
                                            <span>{format(new Date(submission.createdAt), 'MMM dd, yyyy HH:mm')}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(submission._id)}
                                            className="delete-button"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}