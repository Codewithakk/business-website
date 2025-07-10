import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const testimonialSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces'),
    email: Yup.string().required('Email is required').email('Must be a valid email'),
    position: Yup.string().max(100, 'Position must be under 100 characters'),
    rating: Yup.number().min(1, 'Minimum rating is 1').max(5, 'Maximum rating is 5'),
    message: Yup.string()
        .required('Message is required')
        .min(20, 'Message must be at least 20 characters')
        .max(500, 'Message is too long'),
    isActive: Yup.boolean().required('Required'),
})

const styles = {
    container: {
        background: '#fff',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontFamily: 'sans-serif',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 600,
        color: '#111827',
        marginBottom: '1.5rem',
    },
    label: {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: '#374151',
        marginBottom: '0.25rem',
    },
    input: {
        width: '100%',
        padding: '0.5rem 0.75rem',
        border: '1px solid #D1D5DB',
        borderRadius: '6px',
        fontSize: '1rem',
        marginBottom: '0.75rem',
    },
    textarea: {
        width: '100%',
        padding: '0.5rem 0.75rem',
        border: '1px solid #D1D5DB',
        borderRadius: '6px',
        fontSize: '1rem',
        resize: 'vertical',
        marginBottom: '0.75rem',
    },
    error: {
        fontSize: '0.875rem',
        color: '#DC2626',
        marginBottom: '1rem',
    },
    checkboxContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.5rem',
    },
    checkbox: {
        marginRight: '0.5rem',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '0.5rem',
    },
    button: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
    },
    saveButton: {
        background: '#3B82F6',
        color: '#fff',
    },
    cancelButton: {
        background: '#fff',
        color: '#374151',
        border: '1px solid #D1D5DB',
    },
}

export default function TestimonialForm({ initialValues, onSubmit, onCancel }) {
    return (
        <div style={styles.container}>
            <h3 style={styles.title}>
                {initialValues._id ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h3>

            <Formik
                initialValues={initialValues}
                validationSchema={testimonialSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <label htmlFor="name" style={styles.label}>
                            Name
                        </label>
                        <Field name="name">
                            {({ field }) => <input {...field} type="text" style={styles.input} />}
                        </Field>
                        <ErrorMessage name="name" component="div" style={styles.error} />

                        <label htmlFor="email" style={styles.label}>
                            Email
                        </label>
                        <Field name="email">
                            {({ field }) => <input {...field} type="email" style={styles.input} />}
                        </Field>
                        <ErrorMessage name="email" component="div" style={styles.error} />

                        <label htmlFor="position" style={styles.label}>
                            Position (optional)
                        </label>
                        <Field name="position">
                            {({ field }) => <input {...field} type="text" style={styles.input} />}
                        </Field>
                        <ErrorMessage name="position" component="div" style={styles.error} />

                        <label htmlFor="rating" style={styles.label}>
                            Rating (1–5)
                        </label>
                        <Field name="rating">
                            {({ field }) => <input {...field} type="number" min="1" max="5" style={styles.input} />}
                        </Field>
                        <ErrorMessage name="rating" component="div" style={styles.error} />

                        <label htmlFor="message" style={styles.label}>
                            Message
                        </label>
                        <Field name="message">
                            {({ field }) => <textarea {...field} rows="4" style={styles.textarea} />}
                        </Field>
                        <ErrorMessage name="message" component="div" style={styles.error} />

                        <div style={styles.checkboxContainer}>
                            <Field name="isActive">
                                {({ field }) => (
                                    <input {...field} type="checkbox" style={styles.checkbox} />
                                )}
                            </Field>
                            <label htmlFor="isActive">Active</label>
                        </div>

                        <div style={styles.actions}>
                            <button
                                type="button"
                                onClick={onCancel}
                                style={{ ...styles.button, ...styles.cancelButton }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                style={{ ...styles.button, ...styles.saveButton }}
                            >
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
