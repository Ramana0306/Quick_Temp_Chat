import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";

export default function Dashboard() {
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState("");
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    async function createRoom() {
        try {
            const res = await api.post("/rooms/create");
            navigate(`/room/${res.data.roomCode}`);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to create room");
        }
    }

    async function joinRoom(e) {
        e.preventDefault();
        try {
            await api.post("/rooms/join", { roomCode: roomCode.toUpperCase() });
            navigate(`/room/${roomCode.toUpperCase()}`);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to join room");
        }
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
                    <button onClick={logout} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">Logout</button>
                </div>
                {error && <p className="text-red-400 mb-4">{error}</p>}
                <div className="space-y-6">
                    <div className="p-6 bg-gray-800 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Create New Room</h2>
                        <button onClick={createRoom} className="w-full p-3 bg-blue-600 rounded hover:bg-blue-700">Create Room</button>
                    </div>
                    <div className="p-6 bg-gray-800 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Join Existing Room</h2>
                        <form onSubmit={joinRoom} className="flex gap-2">
                            <input type="text" placeholder="Enter 6-char room code" value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                                className="flex-1 p-3 rounded bg-gray-700 border border-gray-600" maxLength="6" required />
                            <button type="submit" className="px-6 py-3 bg-green-600 rounded hover:bg-green-700">Join</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}