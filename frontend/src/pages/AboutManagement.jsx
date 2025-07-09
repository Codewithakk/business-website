import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchAboutContent, updateAboutContent } from '../redux/aboutSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/admin/AboutManagement.css'; // Ensure you have this CSS file for styling

export default function AboutManagement() {
    const dispatch = useDispatch();
    const { content, loading } = useSelector((state) => state.about);
    const [editorContent, setEditorContent] = useState('');

    useEffect(() => {
        dispatch(fetchAboutContent());
    }, [dispatch]);

    useEffect(() => {
        if (content) {
            setEditorContent(content);
        }
    }, [content]);

    const handleSave = async () => {
        try {
            await dispatch(updateAboutContent(editorContent)).unwrap();
            toast.success('About content updated successfully');
        } catch (error) {
            toast.error(error.message || 'Update failed');
        }
    };

    if (loading) return <div className="loading-text">Loading about content...</div>;

    return (
        <div className="about-management-container">
            <div className="about-management-header">
                <h1>About Section Management</h1>
                <button onClick={handleSave} className="save-button">
                    Save Changes
                </button>
            </div>

            <div className="editor-container">
                <ReactQuill
                    value={editorContent}
                    onChange={setEditorContent}
                    modules={{
                        toolbar: [
                            [{ header: [1, 2, false] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['link', 'image'],
                            ['clean']
                        ]
                    }}
                    theme="snow"
                    className="quill-editor"
                />
            </div>
        </div>
    );
}