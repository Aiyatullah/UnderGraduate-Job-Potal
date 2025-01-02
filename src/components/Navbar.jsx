import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user_id }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Graduate Job Portal
                </Link>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link to={`/profile/${user_id}`} className="navbar-link">
                            Home
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/jobs" className="navbar-link">
                            Jobs
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/course" className="navbar-link">
                            Course
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/analysis" className="navbar-link">
                            Analysis
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;