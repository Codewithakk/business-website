import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/admin/AdminLogin.css';

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

const API_URL = 'http://localhost:3000/api/auth/login';

export default function AdminLogin() {
    const navigate = useNavigate();

    const handleLogin = async (values, { setSubmitting }) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                credentials: 'include', // Important for cookies
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store the access token in localStorage
            localStorage.setItem('accessToken', data.accessToken);

            toast.success('Login successful');
            navigate('/admin/dashboard');
        } catch (error) {
            toast.error(error.message || 'Login failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="login-header">
                    <h2>Admin Login</h2>
                    <p>Access the admin dashboard</p>
                </div>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={handleLogin}
                >
                    {({ isSubmitting }) => (
                        <Form className="form">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="form-input"
                                    placeholder="Enter your email"
                                />
                                <ErrorMessage name="email" component="div" className="error-message" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="form-input"
                                    placeholder="Enter your password"
                                />
                                <ErrorMessage name="password" component="div" className="error-message" />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        Logging in...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}