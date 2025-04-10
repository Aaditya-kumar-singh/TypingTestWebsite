import { useState } from "react";

export default function JoinRoom() {
  const [inputRoomId, setInputRoomId] = useState("");
  const [isValid, setIsValid] = useState(null);
  const validRoomId = "ABC123"; // Replace with actual stored Room ID (or fetch from backend)

  const handleJoin = () => {
    if (inputRoomId.toUpperCase() === validRoomId) {
      setIsValid(true);
      alert("Room joined successfully!");
    } else {
      setIsValid(false);
      alert("Invalid Room ID. Try again!");
    }
  };
 

  return (
    <div className="join-room">
      <h3>Join a Room</h3>
      <input 
        type="text" 
        placeholder="Enter Room ID" 
        value={inputRoomId} 
        onChange={(e) => setInputRoomId(e.target.value)} 
      />
      <button onClick={handleJoin}>Join</button>
      {isValid === false && <p style={{ color: "red",}}>Invalid Room ID!</p>}
    </div>
  );
}
