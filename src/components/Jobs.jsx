import React from 'react';
import './Jobs.css'; // Import CSS for styling

const Jobs = () => {
    // Expanded job data
    const jobs = [
        {
            id: 1,
            title: 'Software Engineer',
            company: 'Tech Corp',
            location: 'San Francisco, CA',
        },
        {
            id: 2,
            title: 'Data Scientist',
            company: 'Data Insights',
            location: 'New York, NY',
        },
        {
            id: 3,
            title: 'Product Manager',
            company: 'Innovate Inc',
            location: 'Seattle, WA',
        },
        {
            id: 4,
            title: 'Frontend Developer',
            company: 'Web Solutions',
            location: 'Austin, TX',
        },
        {
            id: 5,
            title: 'Backend Developer',
            company: 'Code Masters',
            location: 'Chicago, IL',
        },
        {
            id: 6,
            title: 'UI/UX Designer',
            company: 'Design Studio',
            location: 'Los Angeles, CA',
        },
        {
            id: 7,
            title: 'Machine Learning Engineer',
            company: 'AI Labs',
            location: 'San Diego, CA',
        },
        {
            id: 8,
            title: 'Full Stack Developer',
            company: 'Tech Solutions',
            location: 'Denver, CO',
        },
        {
            id: 9,
            title: 'Cybersecurity Analyst',
            company: 'Secure Systems',
            location: 'Washington, DC',
        },
    ];

    const handleApply = (jobId) => {
        alert(`Applying for job ID: ${jobId}`);
    };

    const handleBookmark = (jobId) => {
        alert(`Bookmarking job ID: ${jobId}`);
    };

    return (
        <div className="jobs-container">
            <h1>Job Listings</h1>
            <div className="jobs-grid">
                {jobs.map((job) => (
                    <div key={job.id} className="job-card">
                        <h2 className="job-title">{job.title}</h2>
                        <p className="job-company">{job.company}</p>
                        <p className="job-location">{job.location}</p>
                        <div className="job-actions">
                            <button className="apply-button" onClick={() => handleApply(job.id)}>
                                Apply
                            </button>
                            <button className="bookmark-button" onClick={() => handleBookmark(job.id)}>
                                Bookmark
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Jobs;