import '../styles/ContactForm.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const contactSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    message: Yup.string()
        .required('Message is required')
        .min(20, 'Message must be at least 20 characters')
});

export default function ContactForm() {
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send message');
            }

            setSubmitStatus('success');
            resetForm();
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
        } finally {
            setSubmitting(false);
            // Auto-hide status messages after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-container">
                <div className="contact-header">
                    <h2 className="contact-title">Contact Us</h2>
                </div>

                <div className="contact-form-container">
                    {submitStatus === 'success' && (
                        <div className="alert alert-success">
                            Message sent successfully! We'll get back to you soon.
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div className="alert alert-error">
                            Failed to send message. Please try again later.
                        </div>
                    )}

                    <Formik
                        initialValues={{ name: '', email: '', message: '' }}
                        validationSchema={contactSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">
                                        Name
                                    </label>
                                    <Field
                                        name="name"
                                        type="text"
                                        className="form-input"
                                        placeholder="John Doe"
                                    />
                                    <ErrorMessage name="name" component="div" className="error-message" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">
                                        Email Address
                                    </label>
                                    <Field
                                        name="email"
                                        type="email"
                                        className="form-input"
                                        placeholder="john@example.com"
                                    />
                                    <ErrorMessage name="email" component="div" className="error-message" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">
                                        Your Message
                                    </label>
                                    <Field
                                        name="message"
                                        as="textarea"
                                        rows="5"
                                        className="form-input form-textarea"
                                        placeholder="How can we help you?"
                                    />
                                    <ErrorMessage name="message" component="div" className="error-message" />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="submit-button"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
}