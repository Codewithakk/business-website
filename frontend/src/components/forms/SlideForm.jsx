import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const slideSchema = Yup.object().shape({
    imageUrl: Yup.string().url('Invalid URL').required('Required'),
    altText: Yup.string().required('Required').max(100, 'Too long'),
    order: Yup.number().required('Required').min(0, 'Must be positive'),
    isActive: Yup.boolean().required('Required')
})

export default function SlideForm({ initialValues, onSubmit, onCancel }) {
    return (
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
                {initialValues._id ? 'Edit Slide' : 'Add New Slide'}
            </h3>

            <Formik
                initialValues={initialValues}
                validationSchema={slideSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                                Image URL
                            </label>
                            <Field
                                name="imageUrl"
                                type="url"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            <ErrorMessage name="imageUrl" component="div" className="mt-1 text-sm text-red-600" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="altText" className="block text-sm font-medium text-gray-700 mb-1">
                                Alt Text
                            </label>
                            <Field
                                name="altText"
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            <ErrorMessage name="altText" component="div" className="mt-1 text-sm text-red-600" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
                                Order
                            </label>
                            <Field
                                name="order"
                                type="number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            <ErrorMessage name="order" component="div" className="mt-1 text-sm text-red-600" />
                        </div>

                        <div className="mb-4 flex items-center">
                            <Field
                                name="isActive"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                                Active
                            </label>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-blue-400"
                            >
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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