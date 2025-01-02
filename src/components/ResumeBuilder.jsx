import React, { useState, useEffect } from 'react';
import './ResumeBuilder.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResumeBuilder = () => {
    const { user_id } = useParams();
    const [name, setName] = useState('');
    const [skills, setSkills] = useState('');
    const [location, setLocation] = useState('');
    const [degree, setDegree] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(''); // Role state
    const [experience, setExperience] = useState(''); // Experience state
    const [description, setDescription] = useState('');
    const [certifications, setCertifications] = useState('');
    const [languages, setLanguages] = useState('');
    const [education, setEducation] = useState('');
    const [message, setMessage] = useState('');
    const [fieldsVisible, setFieldsVisible] = useState(Array(11).fill(false)); // Increase array size to 11
    const navigate = useNavigate();

    // Predefined list of roles
    const roles = [
        'Software Engineer',
        'Data Scientist',
        'Product Manager',
        'Frontend Developer',
        'Backend Developer',
        'DevOps Engineer',
        'UI/UX Designer',
        'Machine Learning Engineer',
        'Full Stack Developer',
        'Cybersecurity Analyst',
    ];

    // Predefined list of experience levels
    const experienceLevels = [
        '0 years',
        '1-2 years',
        '3-5 years',
        '5+ years',
    ];

    useEffect(() => {
        // Animate fields one by one
        const timer = setTimeout(() => {
            setFieldsVisible((prev) => {
                const newVisible = [...prev];
                const nextIndex = newVisible.indexOf(false);
                if (nextIndex !== -1) {
                    newVisible[nextIndex] = true;
                }
                return newVisible;
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [fieldsVisible]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/upload-resume', {
                user_id: user_id,
                name: name,
                skills: skills,
                location: location,
                degree: degree,
                contact: contact,
                email: email,
                role: role,
                experience: experience, // Add experience field
                description: description,
                certifications: certifications,
                languages: languages,
                education: education,
            });

            if (response.status === 201) {
                setMessage('Resume uploaded successfully!');
            }
        } catch (error) {
            console.error('Error uploading resume:', error);
            setMessage('Error uploading resume. Please try again.');
        }
    };

    const handleDownload = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/download-resume', {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'resume.doc');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading resume:', error);
            alert('Failed to download resume.');
        }
    };

    return (
        <div className="resume-builder-container">
            <h1 className="resume-title">Resume Builder</h1>
            <form onSubmit={handleSubmit} className="resume-form">
                {fieldsVisible[0] && (
                    <input type="text" className={fieldsVisible[0] ? 'visible' : ''} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                )}
                {fieldsVisible[1] && (
                    <input type="text" className={fieldsVisible[1] ? 'visible' : ''} placeholder="Skills (comma-separated)" value={skills} onChange={(e) => setSkills(e.target.value)} required />
                )}
                {fieldsVisible[2] && (
                    <input type="text" className={fieldsVisible[2] ? 'visible' : ''} placeholder="Location" value={location} onChange ={(e) => setLocation(e.target.value)} required />
                )}
                {fieldsVisible[3] && (
                    <input type="text" className={fieldsVisible[3] ? 'visible' : ''} placeholder="Degree" value={degree} onChange={(e) => setDegree(e.target.value)} required />
                )}
                {fieldsVisible[4] && (
                    <input type="text" className={fieldsVisible[4] ? 'visible' : ''} placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} required />
                )}
                {fieldsVisible[5] && (
                    <input type="email" className={fieldsVisible[5] ? 'visible' : ''} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                )}
                {fieldsVisible[6] && (
                    <div>
                        <label>Job Role:</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="">Select a role</option>
                            {roles.map((roleOption) => (
                                <option key={roleOption} value={roleOption}>{roleOption}</option>
                            ))}
                        </select>
                    </div>
                )}
                {fieldsVisible[7] && (
                    <div>
                        <label>Experience Level:</label>
                        <select value={experience} onChange={(e) => setExperience(e.target.value)} required>
                            <option value="">Select experience level</option>
                            {experienceLevels.map((expOption) => (
                                <option key={expOption} value={expOption}>{expOption}</option>
                            ))}
                        </select>
                    </div>
                )}
                {fieldsVisible[8] && (
                    <textarea className={fieldsVisible[8] ? 'visible' : ''} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                )}
                {fieldsVisible[9] && (
                    <input type="text" className={fieldsVisible[9] ? 'visible' : ''} placeholder="Certifications (comma-separated)" value={certifications} onChange={(e) => setCertifications(e.target.value)} />
                )}
                {fieldsVisible[10] && (
                    <input type="text" className={fieldsVisible[10] ? 'visible' : ''} placeholder="Languages (comma-separated)" value={languages} onChange={(e) => setLanguages(e.target.value)} />
                )}
                <button className="generate-button"type="submit">Save Resume</button>
                <button className="download-button"type="button" onClick={handleDownload}>Download Resume</button>
                <button 
    className="logout-button" 
    onClick={() => navigate(`/profile/${user_id}`)}
>Go back
</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ResumeBuilder;