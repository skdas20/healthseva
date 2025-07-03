// This file was previously empty, causing the "not a module" error.
// Export a default functional component to fix the Next.js build error.

import React from 'react';

const AppointmentPage: React.FC = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gradient mb-4">Book an Appointment</h1>
        <p className="text-gray-600">The appointment booking experience has moved to a new full-page flow. Please use the navigation to access the booking form.</p>
      </div>
    </main>
  );
};

export default AppointmentPage;
