import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import api from "../api";

export default function ChatRoom() {
    const { roomCode } = useParams();
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [connected, setConnected] = useState(false);
    const stompRef = useRef(null);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            connectHeaders: { Authorization: `Bearer ${token}` },
            onConnect: () => {
                setConnected(true);
                client.subscribe(`/topic/room/${roomCode}`, (msg) => {
                    const data = JSON.parse(msg.body);
                    setMessages((prev) => [...prev, data]);
                });
                client.publish({
                    destination: `/app/chat/${roomCode}`,
                    body: JSON.stringify({ sender: user.name, content: `${user.name} joined`, roomCode, type: "JOIN" })
                });
            },
            onDisconnect: () => setConnected(false)
        });

        client.activate();
        stompRef.current = client;

        return () => {
            if (client.connected) {
                client.publish({
                    destination: `/app/chat/${roomCode}`,
                    body: JSON.stringify({ sender: user.name, content: `${user.name} left`, roomCode, type: "LEAVE" })
                });
            }
            client.deactivate();
        };
    }, [roomCode, token, user]);

    function sendMessage(e) {
        e.preventDefault();
        if (!input.trim() || !stompRef.current?.connected) return;
        stompRef.current.publish({
            destination: `/app/chat/${roomCode}`,
            body: JSON.stringify({ sender: user.name, content: input, roomCode, type: "CHAT" })
        });
        setInput("");
    }

    async function leaveRoom() {
        try {
            await api.post(`/rooms/leave?roomCode=${roomCode}`);
            stompRef.current?.deactivate();
            navigate("/dashboard");
        } catch (err) {
            console.error("Leave failed", err);
        }
    }

    return (
        <div className="h-screen flex flex-col">
            <div className="p-4 bg-gray-800 flex justify-between items-center">
                <div>
                    <h1 className="font-bold">Room: {roomCode}</h1>
                    <p className="text-sm text-gray-400">{connected ? "Connected" : "Disconnected"}</p>
                </div>
                <button onClick={leaveRoom} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">Leave</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg, i) => (
                    <div key={i} className={`p-2 rounded ${
                        msg.type === "CHAT"
                            ? msg.sender === user.name ? "bg-blue-700 ml-auto max-w-xs" : "bg-gray-700 max-w-xs"
                            : "bg-gray-600 text-center text-sm text-gray-300"
                    }`}>
                        {msg.type === "CHAT" && <p className="text-xs text-gray-300 mb-1">{msg.sender}</p>}
                        <p>{msg.content}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="p-4 bg-gray-800 flex gap-2">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..." className="flex-1 p-3 rounded bg-gray-700 border border-gray-600" />
                <button type="submit" className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700">Send</button>
            </form>
        </div>
    );
}