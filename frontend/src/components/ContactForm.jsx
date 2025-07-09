import '../styles/ContactForm.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

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
    const [recaptchaToken, setRecaptchaToken] = useState(null);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Message sent successfully!');
            resetForm();
            setRecaptchaToken(null);
        } catch (error) {
            alert('Failed to send message');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-container">
                <div className="contact-header">
                    <h2 className="contact-title">Contact Us</h2>
                </div>

                <div className="contact-form-container">
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

                                <ReCAPTCHA
                                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test key
                                    onChange={(token) => setRecaptchaToken(token)}
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting || !recaptchaToken}
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