import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#009999] via-[#40E0D0] to-[#48D1CC] py-12 px-4">
      <div className="max-w-3xl w-full bg-white/90 rounded-2xl shadow-2xl p-8 md:p-12 border border-[#40E0D0]">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gradient mb-6" style={{background: 'linear-gradient(135deg, #009999, #40E0D0, #48D1CC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          Terms and Conditions
        </h1>
        <div className="space-y-6 text-navy-700 text-base md:text-lg">
          <div className="bg-gradient-to-r from-[#009999]/10 via-[#40E0D0]/10 to-[#48D1CC]/10 rounded-lg p-4 border border-[#40E0D0]/30">
            <p className="mb-2 font-semibold">Welcome to Health Seva At Your Home. By using our website or services, you agree to abide by the following terms and conditions. Please review them carefully. If you do not accept these terms, please refrain from using our website and services.</p>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <span className="font-semibold">Acceptance of Terms</span>
                <ul className="list-disc pl-6 mt-1">
                  <li>You are at least 18 years old or have the consent of a legal guardian.</li>
                  <li>You agree to comply with all applicable laws and regulations in connection with the use of our services.</li>
                </ul>
                <span className="block mt-1">These terms form a binding agreement between you and Health Seva.</span>
              </li>
              <li>
                <span className="font-semibold">Services Provided</span>
                <ul className="list-disc pl-6 mt-1">
                  <li>Doctor consultations</li>
                  <li>Nursing care</li>
                  <li>Physiotherapy</li>
                  <li>Medicine delivery</li>
                  <li>Other health-related services as described on our website</li>
                </ul>
                <span className="block mt-1 text-xs text-gray-500">Note: Service availability may vary based on your location and the availability of healthcare professionals.</span>
              </li>
              <li>
                <span className="font-semibold">User Responsibilities</span>
                <ul className="list-disc pl-6 mt-1">
                  <li>Provide accurate and up-to-date information during registration and service requests.</li>
                  <li>Ensure the safety and respect of healthcare professionals during home visits.</li>
                  <li>Use the services solely for lawful purposes.</li>
                  <li>Follow all instructions and advice provided by healthcare professionals for optimal outcomes.</li>
                  <li>Maintain a clean and suitable home environment for healthcare services.</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Booking and Payments</span>
                <ul className="list-disc pl-6 mt-1">
                  <li>Services can be booked via our website, mobile application, or by calling us.</li>
                  <li>Payments must be completed before or during service delivery using approved methods such as online transfers, UPI, or cash unless specified otherwise.</li>
                  <li>Failure to make timely payments may result in the cancellation of booked services.</li>
                  <li>Cancellations or rescheduling requests must be communicated promptly to Health Seva through available contact methods. Refunds or rescheduling will be handled on a case-by-case basis.</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Privacy Policy</span>
                <span className="block mt-1">Your privacy is important to us. Please review our Privacy Policy to understand how we collect, store, and use your personal information.</span>
              </li>
              <li>
                <span className="font-semibold">Service Limitations</span>
                <ul className="list-disc pl-6 mt-1">
                  <li>Health Seva does not replace hospital services such as surgeries, critical care, or ICU treatments.</li>
                  <li>We provide only those services that can be delivered at home.</li>
                  <li>Services requiring heavy equipment like USG or CT scans are not offered.</li>
                  <li>Service availability depends on the healthcare professionals available in your area.</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Disclaimer of Liability</span>
                <ul className="list-disc pl-6 mt-1">
                  <li>Healthcare professionals engaged by Health Seva are responsible for providing care in accordance with standard medical practices and professional guidelines. However, Health Seva does not guarantee specific treatment outcomes, as these depend on individual patient conditions and circumstances.</li>
                  <li>Health Seva and its healthcare professionals are not liable for any mishaps, emergencies, or natural outcomes that may occur during or after services are provided, including but not limited to the unfortunate passing of a dependent.</li>
                  <li>Health Seva is not responsible for delays or interruptions in service caused by factors beyond our control, such as natural disasters, strikes, or technical issues.</li>
                  <li>By availing of our services, you acknowledge and accept these limitations and understand that outcomes may vary based on patient conditions, adherence to medical advice, and other factors.</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Emergency Services</span>
                <span className="block mt-1">Health Seva is not an emergency healthcare provider. In case of medical emergencies, users are advised to contact emergency services immediately (e.g., 112).</span>
              </li>
              <li>
                <span className="font-semibold">Termination of Services</span>
                <span className="block mt-1">Health Seva reserves the right to suspend or terminate services under the following conditions:</span>
                <ul className="list-disc pl-6 mt-1">
                  <li>Violation of these terms and conditions.</li>
                  <li>Detection of fraudulent or inappropriate activities.</li>
                  <li>Concerns over safety or legal issues.</li>
                </ul>
                <span className="block mt-1">Users will be notified of service termination via their registered contact details.</span>
              </li>
              <li>
                <span className="font-semibold">Changes to Terms</span>
                <span className="block mt-1">We may update these terms from time to time. Updated terms will be posted on our website. Continued use of our services after updates indicates acceptance of the revised terms. Users are encouraged to review these terms periodically to stay informed about changes.</span>
              </li>
              <li>
                <span className="font-semibold">Governing Law</span>
                <span className="block mt-1">These terms are governed by the laws of Bihar, India. Any disputes arising out of these terms will be settled in the courts of Patna.</span>
              </li>
              <li>
                <span className="font-semibold">Feedback and Complaints</span>
                <span className="block mt-1">We value your feedback. If you have any complaints or suggestions, please contact us through the details provided below.</span>
              </li>
              <li>
                <span className="font-semibold">Contact Us</span>
                <ul className="list-disc pl-6 mt-1">
                  <li>Email: info@healthseva.com</li>
                  <li>Phone: +91 85218 35910</li>
                </ul>
                <span className="block mt-1">Thank you for choosing Health Seva. We are committed to providing quality care at your home.</span>
              </li>
            </ol>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-gray-500">Last updated: July 2025</div>
      </div>
    </div>
  );
}
