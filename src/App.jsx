import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Quiz from './components/Quiz';
import SelectTopic from './components/SelectTopic';
import ResumeBuilder from './components/ResumeBuilder';
import Jobs from './components/Jobs'; // Import the Jobs component
import Course from './components/Course';

function App() {
    const [user_id, setUser_id] = useState(null); // State to store user_id

    // Example: Set user_id after login
    const handleLogin = (id) => {
        setUser_id(id);
    };

    return (
        <>
            <Navbar user_id={user_id} /> {/* Pass user_id to Navbar */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/profile/:user_id" element={<Profile />} />
                <Route path="/select-topic" element={<SelectTopic />} />
                <Route path="/quiz/:topic" element={<Quiz />} />
                <Route path="/resume-builder/:user_id" element={<ResumeBuilder />} />
                <Route path="/jobs" element={<Jobs />} /> {/* Add Jobs route */}
                <Route path="/course" element={<Course/>} />
                <Route path="/analysis" element={<div>Analysis Page</div>} />
            </Routes>
        </>
    );
}

export default App;