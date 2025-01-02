import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const { user_id } = useParams(); // Get user_id from the URL
    const [user, setUser ] = useState(null);
    const [resume, setResume] = useState(null);
    const [fieldsVisible, setFieldsVisible] = useState(Array(5).fill(false)); // Increase array size to 5
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const response = await fetch(`http://localhost:5000/profile/${user_id}`);
            const data = await response.json();
            if (response.ok) {
                setUser (data); // Ensure the role is included in the data
            } else {
                navigate('/login');
            }
        };
    

        const fetchResume = async () => {
            const response = await fetch(`http://localhost:5000/api/get-resume/${user_id}`);
            if (response.ok) {
                const data = await response.json();
                setResume(data);
            } else {
                setResume(null); // No resume found
            }
        };

        fetchUserProfile();
        fetchResume();
    }, [user_id, navigate]);

    useEffect(() => {
        // Animate sections one by one
        const timer = setTimeout(() => {
            setFieldsVisible((prev) => {
                const newVisible = [...prev];
                const nextIndex = newVisible.indexOf(false);
                if (nextIndex !== -1) {
                    newVisible[nextIndex] = true; // Show the next section
                }
                return newVisible;
            });
        }, 500); // Adjust timing as needed

        return () => clearTimeout(timer);
    }, [fieldsVisible]);

    // Render Job Seeker Dashboard
    const renderJobSeekerDashboard = () => (
        <div className="profile-content">
            <h1 className="profile-title">{user.name}'s Dashboard</h1>
            <p><strong>Email:</strong> {user.email}</p>

            {fieldsVisible[0] && (
                <div className="dashboard-section">
                    <h2>Skills</h2>
                    <ul className="skills-list">
                        {resume?.skills ? (
                            resume.skills.split(',').map((skill, index) => (
                                <li key={index} className="skill-item">{skill.trim()}</li>
                            ))
                        ) : (
                            <li>No data found</li>
                        )}
                    </ul>
                </div>
            )}

            {fieldsVisible[1] && (
                <div className="dashboard-section">
                    <h2>Experience</h2>
                    <div className="experience-list">
                        {resume?.experience ? (
                            resume.experience.split(',').map((exp, index) => (
                                <div key={index} className="experience-item">
                                    <strong>{exp.trim()}</strong>
                                </div>
                            ))
                        ) : (
                            <div>No data found</div>
                        )}
                    </div>
                </div>
            )}

            {fieldsVisible[2] && (
                <div className="dashboard-section">
                    <h2>Degree</h2>
                    <div className="degree-list">
                        {resume?.degree ? (
                            <div className="degree-item">
                                <strong>{resume.degree}</strong>
                            </div>
                        ) : (
                            <div>No data found</div>
                        )}
                    </div>
                </div>
            )}

            {fieldsVisible[3] && (
                <div className="dashboard-section">
                    <h2>Certifications</h2>
                    <div className="certifications-list">
                        {resume?.certifications ? (
                            resume.certifications.split(',').map((cert, index) => (
                                <div key={index} className="certification-item">
                                    <strong>{cert.trim()}</strong>
                                </div>
                            ))
                        ) : (
                            <div>No data found</div>
                        )}
                    </div>
                </div>
            )}

            {fieldsVisible[4] && (
                <div className="dashboard-section">
                    <h2>Languages</h2>
                    <div className="languages-list">
                        {resume?.languages ? (
                            resume.languages.split(',').map((lang, index) => (
                                <div key={index} className="language-item">
                                    <strong>{lang.trim()}</strong>
                                </div>
                            ))
                        ) : (
                            <div>No data found</div>
                        )}
                    </div>
                </div>
            )}

            <button 
    className="resume-button" 
    onClick={() => navigate(`/resume-builder/${user_id}`)}
>
    Build Resume
</button>
<button 
    className="logout-button" 
    onClick={() => navigate('/')}
>
    Logout
</button>
        </div>
    );

    // Render Recruiter Dashboard
    const renderRecruiterDashboard = () => (
        <div className="profile-content">
            <h1 className="profile-title">{user.name}'s Recruiter Dashboard</h1>
            <p><strong>Email:</strong> {user.email}</p>

            {fieldsVisible[0] && (
                <div className="dashboard-section">
                    <h2>Job Postings</h2>
                    <div className="job-postings-list">
                        {user.jobPostings ? (
                            user.jobPostings.map((job, index) => (
                                <div key={index} className="job-item">
                                    <strong>{job.title}</strong> - {job.description}
                                </div>
                            ))
                        ) : (
                            <div>No job postings found</div>
                        )}
                    </div>
                </div>
            )}

            {fieldsVisible[1] && (
                <div className="dashboard-section">
                    <h2>Applications</h2>
                    <div className="applications-list">
                        {user.applications ? (
                            user.applications.map((app, index) => (
                                <div key={index} className="application-item">
                                    <strong>{app.candidateName}</strong> - {app.status}
                                </div>
                            ))
                        ) : (
                            <div>No applications found</div>
                        )}
                    </div>
                </div>
            )}

            <button className="edit-button" onClick={() => navigate(`/edit-recruiter/${user_id}`)}>Edit Recruiter Profile</button>
            <button 
    className="logout-button" 
    onClick={() => navigate('/')}
>
    Logout
</button>
        </div>
    );

    // Main render logic
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            {user.role === 'job_seeker' ? renderJobSeekerDashboard() : renderRecruiterDashboard()}
        </div>
    );
};

export default Profile;