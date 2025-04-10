import { useState } from "react";

export default function CreateRoom() {
  const generateRoomId = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase(); // Generates a 6-letter room ID
  };

  const [roomId] = useState(generateRoomId());

  return (
    <div>
      <h3>Room Created!</h3>
      <p>Share this Room ID with your friend:</p>
      <h2>{roomId}</h2>
    </div>
  );
}
