"use client"

import React, { useState } from 'react';

const NearByHospitals = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedHospital, setSelectedHospital] = useState(null);
    
    const hospitals = [
        { name: 'City Hospital', address: '123 Main St', distance: '2.5 km', doctorsAvailable: true, description: 'A leading hospital with top-notch medical facilities.' },
        { name: 'Green Valley Hospital', address: '456 Green St', distance: '3.2 km', doctorsAvailable: false, description: 'Known for its excellent orthopedic department.' },
        { name: 'Sunny Side Clinic', address: '789 Sunny Ave', distance: '1.8 km', doctorsAvailable: true, description: 'Specialized in pediatric care and family health.' },
        { name: 'Healthcare Center', address: '101 Health Rd', distance: '4.1 km', doctorsAvailable: true, description: 'Providing general health services with a highly qualified staff.' }
    ];

    const filteredHospitals = hospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleViewDetails = (hospital) => {
        setSelectedHospital(hospital);
    };

    const handleContactDoctor = () => {
        alert("Connecting to a doctor virtually...");
        // This is where you can handle the logic to connect with a doctor (e.g., through a video call API).
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '36px' }}>
                Nearby Hospitals & Virtual Consultations
            </h1>
            
            {/* Search Bar */}
            <div className="input-group mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <input
                    type="search"
                    className="form-control"
                    placeholder="Search hospitals..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ padding: '12px', fontSize: '18px', borderRadius: '8px' }}
                />
                <button className="btn btn-primary" type="button" style={{ padding: '12px 24px', fontSize: '18px' }}>
                    Search
                </button>
            </div>

            {/* Hospital List */}
            {!selectedHospital && (
                <div className="row">
                    {filteredHospitals.map((hospital, index) => (
                        <div className="col-lg-4 col-md-6 mb-4" key={index}>
                            <div className="card shadow-sm h-100" style={{ borderRadius: '10px' }}>
                                <div className="card-body">
                                    <h5 className="card-title" style={{ fontWeight: '600', fontSize: '22px' }}>
                                        {hospital.name}
                                    </h5>
                                    <p className="card-text" style={{ color: '#6c757d', fontSize: '16px' }}>
                                        {hospital.address}
                                    </p>
                                    <p className="card-text" style={{ color: '#007bff', fontSize: '16px' }}>
                                        Distance: {hospital.distance}
                                    </p>
                                    <button
                                        className="btn btn-outline-primary mt-3"
                                        onClick={() => handleViewDetails(hospital)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Hospital Detail View */}
            {selectedHospital && (
                <div className="card shadow-sm" style={{ borderRadius: '10px', padding: '20px' }}>
                    <div className="card-body">
                        <h2 style={{ fontWeight: 'bold', fontSize: '28px' }}>{selectedHospital.name}</h2>
                        <p style={{ color: '#6c757d', fontSize: '16px' }}>{selectedHospital.address}</p>
                        <p style={{ fontSize: '18px', marginTop: '10px' }}>{selectedHospital.description}</p>
                        <p style={{ color: '#007bff', fontSize: '16px' }}>Distance: {selectedHospital.distance}</p>
                        
                        {selectedHospital.doctorsAvailable ? (
                            <button className="btn btn-success" onClick={handleContactDoctor}>
                                Contact Available Doctor Virtually
                            </button>
                        ) : (
                            <p className="text-danger mt-3">No doctors available for virtual consultation at the moment.</p>
                        )}

                        <button className="btn btn-secondary mt-3" onClick={() => setSelectedHospital(null)}>
                            Back to List
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NearByHospitals;
