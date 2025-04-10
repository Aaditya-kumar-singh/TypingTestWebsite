import React, { useState } from 'react';
import '../styles/TeamRoom.css';

const TeamRoom = () => {
    const [text, setText] = useState('');
    const [userTyping, setUserTyping] = useState([]);

    const handleTextChange = (e) => {
        const newText = e.target.value;
        setText(newText);

        // Simulate user typing (replace with actual user data in a real app)
        setUserTyping([{ user: 'User1', typing: newText }]);
    };

    return (
        <div className="team-room-container">
            <h1>Team Room</h1>
            <textarea
                className="text-area"
                value={text}
                onChange={handleTextChange}
                placeholder="Start typing here..."
            ></textarea>
            <div className="user-typing-display">
                {userTyping.map((entry, index) => (
                    <div key={index} className="user-typing-entry">
                        <strong>{entry.user}:</strong> {entry.typing}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamRoom;
