"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('Good Morning');
    } else if (hours < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  return (
    <div className="container">
      {/* Greeting and Intro */}
      <h1 className="display-4 mb-4 text-center">{greeting}, Suhas</h1>
      <p className="lead mb-4 text-center">Your AI-powered virtual doctor for accessible healthcare</p>

      {/* Low Health Metrics Section */}
      <h2 className="mb-4">Your Current Health Alerts</h2>
      <div className="row mb-4">
        {/* Card 1: Low BP */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm" style={{ borderRadius: '10px' }}>
            <div className="card-body">
              <h5 className="card-title" style={{ fontWeight: '600', fontSize: '20px' }}>Low Blood Pressure</h5>
              <p className="card-text" style={{ fontSize: '16px', color: '#6c757d' }}>
                Your blood pressure is lower than normal. Please take care and consider increasing salt intake or staying hydrated.
              </p>
              <Link href="/details/bp" className="btn btn-primary">View Details</Link>
            </div>
          </div>
        </div>

        {/* Card 2: Low Weight */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm" style={{ borderRadius: '10px' }}>
            <div className="card-body">
              <h5 className="card-title" style={{ fontWeight: '600', fontSize: '20px' }}>Low Weight</h5>
              <p className="card-text" style={{ fontSize: '16px', color: '#6c757d' }}>
                Your weight is lower than recommended. Consider a balanced diet with more calories to improve your overall health.
              </p>
              <Link href="/details/weight" className="btn btn-primary">View Details</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <h2 className="mb-4">Health Tips</h2>
      <div className="accordion" id="healthTipsAccordion">
        {/* Tip 1: Stay Hydrated */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Stay Hydrated
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#healthTipsAccordion">
            <div className="accordion-body">
              Drink plenty of water throughout the day to maintain good blood circulation and overall hydration.
            </div>
          </div>
        </div>

        {/* Tip 2: Balanced Diet */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Balanced Diet
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#healthTipsAccordion">
            <div className="accordion-body">
              Include fruits, vegetables, and proteins in your meals to ensure your body gets essential nutrients.
            </div>
          </div>
        </div>

        {/* Tip 3: Regular Exercise */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Regular Exercise
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#healthTipsAccordion">
            <div className="accordion-body">
              Engage in daily physical activities like walking, jogging, or yoga to improve your fitness levels.
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
