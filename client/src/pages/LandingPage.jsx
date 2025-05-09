import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 text-blacknavbar flex flex-col justify-center items-center px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Poll & Voting Management System
        </h1>
        <p className="text-lg md:text-xl mb-8">
          A streamlined, secure, and versatile solution to create, manage, and
          analyze polls effortlessly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <FeatureCard
            title="User Management"
            description="Manage roles for administrators, panelists, and voters with custom access levels."
          />
          <FeatureCard
            title="Custom Polls"
            description="Create polls with multiple question types like MCQs, ranking, and open-ended formats."
          />
          <FeatureCard
            title="Lifecycle Coverage"
            description="Covers the entire poll lifecycle from setup to result analysis."
          />
        </div>

        <button className="mt-10 px-6 py-3 bg-white text-indigo-700 font-semibold rounded-full hover:bg-gray-100 transition">
          <Link to="/login">Get Started</Link>
        </button>
      </div>

      <section className="bg-white text-gray-800 py-16 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg mb-10">
            Designed for flexibility and security, our system supports diverse
            polling needs with ease. Whether you're conducting academic
            research, organizational voting, or public opinion surveys, our
            platform adapts to your workflow.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <BulletPoint title="Secure Authentication" />
            <BulletPoint title="Real-Time Result Visualization" />
            <BulletPoint title="Mobile-Friendly Interface" />
            <BulletPoint title="Customizable Branding" />
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-8 px-6 md:px-20 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            &copy; 2025 Poll & Voting System. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description }) => (
  <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-md hover:bg-opacity-20 transition">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm">{description}</p>
  </div>
);

const BulletPoint = ({ title }) => (
  <div className="flex items-start">
    <span className="text-indigo-600 font-bold mr-2">✔</span>
    <p>{title}</p>
  </div>
);

export default LandingPage;
