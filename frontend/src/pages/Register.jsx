import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await api.post("/auth/register", { name, email, password });
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed");
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">QuickRoom Register</h1>
                {error && <p className="text-red-400 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Name" value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 rounded bg-gray-700 border border-gray-600" required />
                    <input type="email" placeholder="Email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded bg-gray-700 border border-gray-600" required />
                    <input type="password" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded bg-gray-700 border border-gray-600" required />
                    <button type="submit" className="w-full p-3 bg-green-600 rounded hover:bg-green-700">Register</button>
                </form>
                <p className="mt-4 text-center">Have an account? <Link to="/login" className="text-blue-400">Login</Link></p>
            </div>
        </div>
    );
}