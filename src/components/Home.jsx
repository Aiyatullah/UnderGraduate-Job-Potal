import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import a CSS file for styling

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                {/* Animated Text */}
                <div className="animated-text">
                    <h1>Welcome to the Graduate Job Portal</h1>
                </div>
                <p>Your gateway to a successful career!</p>
            </header>
            <main className="home-content">
                <section className="home-description">
                    <h2>About Us</h2>
                    <p>
                        Our platform is dedicated to helping graduates bridge the gap between their education and the job market. 
                        We provide personalized career guidance, skill assessments, and job matching services to ensure you find the right opportunities.
                    </p>
                    <p>
                        Whether you're looking for internships, entry-level positions, or career advice, we are here to support you every step of the way.
                    </p>
                </section>
                <section className="home-actions">
                    <h2>Get Started</h2>
                    <p>Join our community and take the first step towards your dream job!</p>
                    <div className="button-container">
                        <Link to="/register" className="button">Register</Link>
                        <Link to="/login" className="button">Login</Link>
                    </div>
                </section>
            </main>
            <footer className="home-footer">
                <p>&copy; {new Date().getFullYear()} Graduate Job Portal. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;