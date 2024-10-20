// app/profile/page.js
'use client';
import { useState } from 'react';
import { User, Phone, Mail, Calendar, MapPin, Activity, AlertCircle, FileText } from 'lucide-react';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('personal');

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <div className="text-center mb-4">
                        <img src="/api/placeholder/150/150" alt="Profile" className="rounded-circle" width="150" height="150" />
                        <h2 className="mt-3">John Doe</h2>
                        <p className="text-muted">Patient ID: 12345</p>
                    </div>

                    <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>
                                Personal Info
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link ${activeTab === 'medical' ? 'active' : ''}`} onClick={() => setActiveTab('medical')}>
                                Medical History
                            </button>
                        </li>
                    </ul>

                    <div className="tab-content" id="pills-tabContent">
                        <div className={`tab-pane fade ${activeTab === 'personal' ? 'show active' : ''}`} id="pills-personal" role="tabpanel">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex align-items-center">
                                    <User className="me-3" />
                                    <div>
                                        <small className="text-muted d-block">Full Name</small>
                                        John Doe
                                    </div>
                                </li>
                                <li className="list-group-item d-flex align-items-center">
                                    <Phone className="me-3" />
                                    <div>
                                        <small className="text-muted d-block">Phone</small>
                                        +1 (555) 123-4567
                                    </div>
                                </li>
                                <li className="list-group-item d-flex align-items-center">
                                    <Mail className="me-3" />
                                    <div>
                                        <small className="text-muted d-block">Email</small>
                                        john.doe@example.com
                                    </div>
                                </li>
                                <li className="list-group-item d-flex align-items-center">
                                    <Calendar className="me-3" />
                                    <div>
                                        <small className="text-muted d-block">Date of Birth</small>
                                        January 15, 1985
                                    </div>
                                </li>
                                <li className="list-group-item d-flex align-items-center">
                                    <MapPin className="me-3" />
                                    <div>
                                        <small className="text-muted d-block">Address</small>
                                        123 Main St, Anytown, ST 12345
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={`tab-pane fade ${activeTab === 'medical' ? 'show active' : ''}`} id="pills-medical" role="tabpanel">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex align-items-center">
                                    <Activity className="me-3" />
                                    <div>
                                        <small className="text-muted d-block">Blood Type</small>
                                        A Positive
                                    </div>
                                </li>
                                <li className="list-group-item d-flex align-items-center">
                                    <AlertCircle className="me-3" />
                                    <div>
                                        <small className="text-muted d-block">Allergies</small>
                                        Penicillin, Peanuts
                                    </div>
                                </li>
                                <li className="list-group-item d-flex align-items-center">
                                    <FileText className="me-3" />
                                    <div>
                                        <small className="text-muted d-block">Chronic Conditions</small>
                                        Hypertension, Type 2 Diabetes
                                    </div>
                                </li>
                            </ul>
                            <div className="mt-3">
                                <h5>Recent Consultations</h5>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h6 className="mb-1">General Check-up</h6>
                                            <small>3 days ago</small>
                                        </div>
                                        <p className="mb-1">Routine health check - all vitals normal.</p>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h6 className="mb-1">Flu Symptoms</h6>
                                            <small>2 weeks ago</small>
                                        </div>
                                        <p className="mb-1">Prescribed rest and over-the-counter medication.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}