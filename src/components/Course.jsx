
import React from 'react';
import './Course.css'; // Import CSS for styling

const Course = () => {
    // Sample course data
    const courses = [
        {
            id: 1,
            title: 'Frontend Development',
            description: 'Learn HTML, CSS, JavaScript, and React to build modern web applications.',
            duration: '3 months',
            level: 'Beginner',
        },
        {
            id: 2,
            title: 'Backend Development',
            description: 'Master Node.js, Express, and MongoDB to build scalable backend systems.',
            duration: '4 months',
            level: 'Intermediate',
        },
        {
            id: 3,
            title: 'Data Structures & Algorithms',
            description: 'Understand core DSA concepts and solve problems efficiently.',
            duration: '2 months',
            level: 'Advanced',
        },
        {
            id: 4,
            title: 'Full Stack Development',
            description: 'Become a full-stack developer by learning both frontend and backend technologies.',
            duration: '6 months',
            level: 'Intermediate',
        },
        {
            id: 5,
            title: 'Machine Learning',
            description: 'Learn the fundamentals of machine learning and build AI models.',
            duration: '5 months',
            level: 'Advanced',
        },
        {
            id: 6,
            title: 'DevOps',
            description: 'Master CI/CD, Docker, Kubernetes, and cloud platforms for DevOps practices.',
            duration: '3 months',
            level: 'Intermediate',
        },
    ];

    const handleEnroll = (courseId) => {
        alert(`Enrolling in course ID: ${courseId}`);
    };

    return (
        <div className="course-container">
            <h1>Study Courses</h1>
            <div className="course-grid">
                {courses.map((course) => (
                    <div key={course.id} className="course-card">
                        <h2 className="course-title">{course.title}</h2>
                        <p className="course-description">{course.description}</p>
                        <div className="course-details">
                            <p><strong>Duration:</strong> {course.duration}</p>
                            <p><strong>Level:</strong> {course.level}</p>
                        </div>
                        <button className="enroll-button" onClick={() => handleEnroll(course.id)}>
                            Enroll Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Course;