import React from 'react';
import { useNavigate } from 'react-router-dom';
//import './SelectTopic.css'; // Import a CSS file for styling

const SelectTopic = () => {
    const navigate = useNavigate();

    const handleTopicSelect = (topic) => {
        // Redirect to the quiz page with the selected topic
        navigate(`/quiz/${topic}`);
    };

    return (
        <div className="select-topic-container">
            <h2>Select a Quiz Topic</h2>
            <div className="topic-buttons">
                <button onClick={() => handleTopicSelect('math')} className="topic-button">Math</button>
                <button onClick={() => handleTopicSelect('science')} className="topic-button">Science</button>
                {/* Add more topics as needed */}
            </div>
        </div>
    );
};

export default SelectTopic;