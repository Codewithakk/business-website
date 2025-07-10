import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const slideSchema = Yup.object().shape({
    imageUrl: Yup.string()
        .url('Invalid URL format')
        .required('Image URL is required')
        .matches(
            /\.(jpeg|jpg|gif|png|webp)$/,
            'URL must point to a valid image (JPEG, JPG, GIF, PNG, WEBP)'
        ),
    title: Yup.string()
        .required('Title is required')
        .max(50, 'Title must be 50 characters or less'),
    subtitle: Yup.string().max(100, 'Subtitle must be 100 characters or less'),
    altText: Yup.string()
        .required('Alt text is required')
        .max(100, 'Alt text must be 100 characters or less'),
    order: Yup.number()
        .required('Order is required')
        .min(0, 'Order must be 0 or greater')
        .integer('Order must be a whole number'),
    isActive: Yup.boolean(),
})

const styles = {
    container: {
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'sans-serif',
    },
    header: {
        padding: '1.5rem',
        borderBottom: '1px solid #E5E7EB',
    },
    title: {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: '#111827',
        marginBottom: '0.25rem',
    },
    subtitle: {
        fontSize: '0.875rem',
        color: '#6B7280',
    },
    formSection: {
        padding: '1.5rem',
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
        boxSizing: 'border-box',
        fontSize: '1rem',
        marginBottom: '0.5rem',
    },
    textarea: {
        width: '100%',
        padding: '0.5rem 0.75rem',
        border: '1px solid #D1D5DB',
        borderRadius: '6px',
        boxSizing: 'border-box',
        fontSize: '1rem',
        resize: 'vertical',
        marginBottom: '0.5rem',
    },
    error: {
        fontSize: '0.875rem',
        color: '#DC2626',
        marginBottom: '0.75rem',
    },
    checkboxContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '0.75rem',
    },
    checkbox: {
        marginRight: '0.5rem',
    },
    preview: {
        background: '#F9FAFB',
        borderTop: '1px solid #E5E7EB',
        padding: '1.5rem',
    },
    previewBox: {
        background: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: '6px',
        padding: '1rem',
        textAlign: 'center',
    },
    actions: {
        background: '#F9FAFB',
        padding: '1.5rem',
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

export default function SlideForm({ initialValues, onSubmit, onCancel }) {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>
                    {initialValues._id ? 'Edit Slide' : 'Create New Slide'}
                </h3>
                <p style={styles.subtitle}>
                    {initialValues._id
                        ? 'Update the slide details'
                        : 'Add a new slide to the slider'}
                </p>
            </div>

            <Formik
                initialValues={{
                    imageUrl: '',
                    title: '',
                    subtitle: '',
                    altText: '',
                    order: 0,
                    isActive: true,
                    ...initialValues,
                }}
                validationSchema={slideSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div style={styles.formSection}>
                            {/* Image URL */}
                            <label htmlFor="imageUrl" style={styles.label}>
                                Image URL *
                            </label>
                            <Field name="imageUrl">
                                {({ field }) => (
                                    <input
                                        {...field}
                                        type="url"
                                        placeholder="https://example.com/image.jpg"
                                        style={styles.input}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="imageUrl" component="div" style={styles.error} />

                            {/* Title */}
                            <label htmlFor="title" style={styles.label}>
                                Title *
                            </label>
                            <Field name="title">
                                {({ field }) => (
                                    <input {...field} type="text" style={styles.input} />
                                )}
                            </Field>
                            <ErrorMessage name="title" component="div" style={styles.error} />

                            {/* Subtitle */}
                            <label htmlFor="subtitle" style={styles.label}>
                                Subtitle
                            </label>
                            <Field name="subtitle">
                                {({ field }) => (
                                    <textarea {...field} rows="2" style={styles.textarea} />
                                )}
                            </Field>
                            <ErrorMessage name="subtitle" component="div" style={styles.error} />

                            {/* Alt Text */}
                            <label htmlFor="altText" style={styles.label}>
                                Alt Text *
                            </label>
                            <Field name="altText">
                                {({ field }) => (
                                    <input {...field} type="text" style={styles.input} />
                                )}
                            </Field>
                            <ErrorMessage name="altText" component="div" style={styles.error} />

                            {/* Order */}
                            <label htmlFor="order" style={styles.label}>
                                Display Order *
                            </label>
                            <Field name="order">
                                {({ field }) => (
                                    <input {...field} type="number" min="0" style={styles.input} />
                                )}
                            </Field>
                            <ErrorMessage name="order" component="div" style={styles.error} />

                            {/* Active */}
                            <div style={styles.checkboxContainer}>
                                <Field name="isActive">
                                    {({ field }) => (
                                        <input {...field} type="checkbox" style={styles.checkbox} />
                                    )}
                                </Field>
                                <label htmlFor="isActive">Active Slide</label>
                            </div>
                        </div>

                        {/* Actions */}
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
                                {isSubmitting
                                    ? initialValues._id
                                        ? 'Updating...'
                                        : 'Creating...'
                                    : initialValues._id
                                        ? 'Update Slide'
                                        : 'Create Slide'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
