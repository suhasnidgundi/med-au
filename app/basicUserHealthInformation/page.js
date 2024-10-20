"use client"

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { basicUserHealthInformationSchema } from '@/libs/zod';

const UserEnrollmentForm = ({ user }) => {
    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            const response = await fetch('/api/complete-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            setStatus({ success: true });
        } catch (error) {
            setStatus({ success: false, message: error.message });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container ">
            <h2 className="text-center mb-4">Complete Your Health Profile</h2>
            <Formik
                initialValues={{
                    phoneNumber: '',
                    dob: '',
                    gender: 'MALE',
                    bloodGroup: '',
                    height: '',
                    weight: '',
                    location: '',
                    language: '',
                    emergencyContact: '',
                    preferredCommunicationMode: 'APP',
                }}
                validationSchema={toFormikValidationSchema(basicUserHealthInformationSchema)}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting, status }) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <Field
                                type="tel"
                                className={`form-control ${errors.phoneNumber && touched.phoneNumber ? 'is-invalid' : ''}`}
                                id="phoneNumber"
                                name="phoneNumber"
                            />
                            <ErrorMessage name="phoneNumber" component="div" className="invalid-feedback" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                            <Field
                                type="date"
                                className={`form-control ${errors.dob && touched.dob ? 'is-invalid' : ''}`}
                                id="dob"
                                name="dob"
                            />
                            <ErrorMessage name="dob" component="div" className="invalid-feedback" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <Field
                                as="select"
                                className={`form-select ${errors.gender && touched.gender ? 'is-invalid' : ''}`}
                                id="gender"
                                name="gender"
                            >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </Field>
                            <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="bloodGroup" className="form-label">Blood Group</label>
                            <Field
                                type="text"
                                className={`form-control ${errors.bloodGroup && touched.bloodGroup ? 'is-invalid' : ''}`}
                                id="bloodGroup"
                                name="bloodGroup"
                            />
                            <ErrorMessage name="bloodGroup" component="div" className="invalid-feedback" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="height" className="form-label">Height (cm)</label>
                            <Field
                                type="number"
                                className={`form-control ${errors.height && touched.height ? 'is-invalid' : ''}`}
                                id="height"
                                name="height"
                            />
                            <ErrorMessage name="height" component="div" className="invalid-feedback" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="weight" className="form-label">Weight (kg)</label>
                            <Field
                                type="number"
                                className={`form-control ${errors.weight && touched.weight ? 'is-invalid' : ''}`}
                                id="weight"
                                name="weight"
                            />
                            <ErrorMessage name="weight" component="div" className="invalid-feedback" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Location</label>
                            <Field
                                type="text"
                                className={`form-control ${errors.location && touched.location ? 'is-invalid' : ''}`}
                                id="location"
                                name="location"
                            />
                            <ErrorMessage name="location" component="div" className="invalid-feedback" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="language" className="form-label">Preferred Language</label>
                            <Field
                                type="text"
                                className={`form-control ${errors.language && touched.language ? 'is-invalid' : ''}`}
                                id="language"
                                name="language"
                            />
                            <ErrorMessage name="language" component="div" className="invalid-feedback" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="emergencyContact" className="form-label">Emergency Contact (optional)</label>
                            <Field
                                type="text"
                                className={`form-control ${errors.emergencyContact && touched.emergencyContact ? 'is-invalid' : ''}`}
                                id="emergencyContact"
                                name="emergencyContact"
                            />
                            <ErrorMessage name="emergencyContact" component="div" className="invalid-feedback" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="preferredCommunicationMode" className="form-label">Preferred Communication Mode</label>
                            <Field
                                as="select"
                                className={`form-select ${errors.preferredCommunicationMode && touched.preferredCommunicationMode ? 'is-invalid' : ''}`}
                                id="preferredCommunicationMode"
                                name="preferredCommunicationMode"
                            >
                                <option value="APP">App</option>
                                <option value="SMS">SMS</option>
                                <option value="VOICE">Voice</option>
                                <option value="EMAIL">Email</option>
                                <option value="WHATSAPP">WhatsApp</option>
                            </Field>
                            <ErrorMessage name="preferredCommunicationMode" component="div" className="invalid-feedback" />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Complete Profile'}
                            </button>
                        </div>

                        {status && status.success && (
                            <div className="alert alert-success mt-3">Profile updated successfully!</div>
                        )}
                        {status && !status.success && (
                            <div className="alert alert-danger mt-3">{status.message}</div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UserEnrollmentForm;