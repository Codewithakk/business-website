import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const API_URL = 'http://localhost:3000/api/about';

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
};

const modalVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', damping: 25, stiffness: 500 }
    },
    exit: { y: 50, opacity: 0 }
};

export default function AboutManagement() {
    const [content, setContent] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchAboutContent = async () => {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setContent(response.data.content);
                setEditorContent(response.data.content);
            } catch (error) {
                toast.error('Failed to load about content');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAboutContent();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await axios.put(
                API_URL,
                { content: editorContent },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setContent(response.data.content);
            toast.success('About content updated successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl font-medium text-gray-600">
                    Loading about content...
                </div>
            </div>
        );

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    About Section Management
                </h1>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setIsPreviewOpen(true)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        Preview
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <span className="flex items-center">
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Saving...
                            </span>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ReactQuill
                    value={editorContent}
                    onChange={setEditorContent}
                    modules={{
                        toolbar: [
                            [{ header: [1, 2, false] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['link', 'image'],
                            ['clean'],
                        ],
                    }}
                    theme="snow"
                    className="h-[500px]"
                />
            </div>

            {/* Preview Modal */}
            {isPreviewOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={backdropVariants}
                >
                    <motion.div
                        className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                        variants={modalVariants}
                    >
                        <div className="relative">
                            <div className="px-6 pt-6 pb-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        About Content Preview
                                    </h3>
                                    <button
                                        onClick={() => setIsPreviewOpen(false)}
                                        className="text-gray-400 hover:text-gray-500 transition-colors"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>

                            <div
                                className="p-6 prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: editorContent }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
