import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const serviceSchema = Yup.object().shape({
    title: Yup.string().required('Required').max(100, 'Too long'),
    imageUrl: Yup.string().url('Invalid URL').required('Required'),
    description: Yup.string().max(500, 'Too long'),
    isActive: Yup.boolean().required('Required'),
})

const styles = {
    container: {
        backgroundColor: '#ffffff',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
        boxSizing: 'border-box',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border 0.2s, box-shadow 0.2s',
    },
    inputFocus: {
        border: '1px solid #3B82F6',
        boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)',
    },
    textarea: {
        width: '100%',
        padding: '0.5rem 0.75rem',
        border: '1px solid #D1D5DB',
        borderRadius: '6px',
        boxSizing: 'border-box',
        fontSize: '1rem',
        resize: 'vertical',
        outline: 'none',
    },
    error: {
        marginTop: '0.25rem',
        fontSize: '0.875rem',
        color: '#DC2626',
    },
    checkboxContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.5rem',
    },
    checkbox: {
        width: '16px',
        height: '16px',
        marginRight: '0.5rem',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '0.5rem',
        marginTop: '1rem',
    },
    button: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background 0.2s',
    },
    saveButton: {
        backgroundColor: '#3B82F6',
        color: '#ffffff',
    },
    saveButtonHover: {
        backgroundColor: '#2563EB',
    },
    cancelButton: {
        backgroundColor: '#F9FAFB',
        color: '#374151',
        border: '1px solid #D1D5DB',
    },
}

export default function ServiceForm({ initialValues, onSubmit, onCancel }) {
    return (
        <div style={styles.container}>
            <h3 style={styles.title}>
                {initialValues._id ? 'Edit Service' : 'Add New Service'}
            </h3>

            <Formik
                initialValues={initialValues}
                validationSchema={serviceSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="title" style={styles.label}>
                                Title
                            </label>
                            <Field name="title">
                                {({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Service title"
                                        style={styles.input}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="title" component="div" style={styles.error} />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="imageUrl" style={styles.label}>
                                Image URL
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
                            <ErrorMessage
                                name="imageUrl"
                                component="div"
                                style={styles.error}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="description" style={styles.label}>
                                Description
                            </label>
                            <Field name="description">
                                {({ field }) => (
                                    <textarea
                                        {...field}
                                        rows="3"
                                        placeholder="Describe your service"
                                        style={styles.textarea}
                                    />
                                )}
                            </Field>
                            <ErrorMessage
                                name="description"
                                component="div"
                                style={styles.error}
                            />
                        </div>

                        <div style={styles.checkboxContainer}>
                            <Field name="isActive">
                                {({ field }) => (
                                    <input
                                        {...field}
                                        type="checkbox"
                                        checked={values.isActive}
                                        style={styles.checkbox}
                                        onChange={() => setFieldValue('isActive', !values.isActive)}
                                    />
                                )}
                            </Field>
                            <label htmlFor="isActive" style={{ fontSize: '0.9rem' }}>
                                Active
                            </label>
                        </div>

                        <div style={styles.actions}>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                style={{
                                    ...styles.button,
                                    ...styles.saveButton,
                                    ...(isSubmitting ? { opacity: 0.7, cursor: 'not-allowed' } : {}),
                                }}
                            >
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                style={{ ...styles.button, ...styles.cancelButton }}
                            >
                                Cancel
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
