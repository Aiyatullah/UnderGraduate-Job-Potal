import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Quiz.css'; // Import the CSS file for styling

const Quiz = () => {
    const { topic } = useParams(); // Get topic from URL parameters
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch(`http://localhost:5000/api/questions/${topic}`);
            if (!response.ok) {
                const errorText = await response.text(); // Get the error response as text
                console.error('Error fetching questions:', errorText);
                throw new Error('Failed to fetch questions');
            }
            const data = await response.json();
            setQuestions(data);
        };

        fetchQuestions();
    }, [topic]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption === questions[currentQuestionIndex]?.correctAnswer) {
            setScore(score + 1);
        }
        setSelectedOption(null);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleSubmitQuiz = async () => {
        await fetch('http://localhost:5000/api/submit-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: 'YOUR_USER_ID', score, topic }), // Replace 'YOUR_USER_ID' with actual user ID
        });
        setQuizCompleted(true);
        navigate(`/profile/YOUR_USER_ID`); // Replace 'YOUR_USER_ID' with actual user ID
    };

    // Check if there are questions to display
    if (quizCompleted) {
        return <h2 className="quiz-score">Your score: {score}</h2>;
    }

    if (currentQuestionIndex >= questions.length) {
        return (
            <div className="quiz-completed">
                <h2>Quiz Completed!</h2>
                <button onClick={handleSubmitQuiz} className="submit-button">Submit Score</button>
            </div>
        );
    }

    // Defensive check to ensure questions are available
    if (questions.length === 0) {
        return <h2>Loading questions...</h2>; // Or a loading spinner
    }

    return (
        <div className="quiz-container">
            <h2 className="quiz-question">{questions[currentQuestionIndex]?.question}</h2>
            <div className="options-container">
                {questions[currentQuestionIndex]?.options.map((option, index) => (
                    <div key={index} className={`option ${selectedOption === option ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="option"
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => handleOptionSelect(option)}
                        />
                        <label>{option}</label>
                    </div>
                ))}
            </div>
            <button onClick={handleNextQuestion} disabled={!selectedOption} className="next-button">
                Next
            </button>
        </div>
    );
};

export default Quiz;