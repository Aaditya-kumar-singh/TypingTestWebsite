import { Routes, Route, useNavigate } from "react-router-dom";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";

export default function Multiplayer() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Multiplayer Mode</h2>
      <button onClick={() => navigate("/multiplayer/create")}>Create Room</button>
      <button onClick={() => navigate("/multiplayer/join")}>Join Room</button>

      <Routes>
        <Route path="create" element={<CreateRoom />} />
        <Route path="join" element={<JoinRoom />} />
      </Routes>
    </div>
  );
}
