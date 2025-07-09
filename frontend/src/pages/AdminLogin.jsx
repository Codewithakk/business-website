import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/admin/AdminLogin.css';

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min(8, 'Too short'),
});

export default function AdminLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            await dispatch(login(values)).unwrap();
                            toast.success('Login successful');
                            navigate('/admin/dashboard');
                        } catch (error) {
                            toast.error(error.message || 'Login failed');
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="form">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="form-input"
                                />
                                <ErrorMessage name="email" component="div" className="error-message" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="form-input"
                                />
                                <ErrorMessage name="password" component="div" className="error-message" />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="submit-button"
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}