import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { email, password });
            login(res.data);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">QuickRoom Login</h1>
                {error && <p className="text-red-400 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" placeholder="Email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded bg-gray-700 border border-gray-600" required />
                    <input type="password" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded bg-gray-700 border border-gray-600" required />
                    <button type="submit" className="w-full p-3 bg-blue-600 rounded hover:bg-blue-700">Login</button>
                </form>
                <p className="mt-4 text-center">No account? <Link to="/register" className="text-blue-400">Register</Link></p>
            </div>
        </div>
    );
}