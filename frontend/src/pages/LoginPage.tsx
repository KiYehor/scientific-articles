import { useState } from "react";
import api from "../api/client";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast/headless";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            window.location.href = "/articles";

        } catch (err) {

            console.error(err);

            toast.error("Login failed");
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <Navbar />
            <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">

                <h1 className="text-3xl font-bold mb-8">
                    Scientific Articles
                </h1>

                <input
                    className="w-full border p-3 rounded-xl mb-4"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full border p-3 rounded-xl mb-6"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-black text-white p-3 rounded-xl hover:opacity-80"
                >
                    Login
                </button>

                <p
                    className="mt-4 text-center text-blue-500 cursor-pointer"
                    onClick={() => {
                        window.location.href = "/register";
                    }}
                >
                    No account? Register
                </p>

            </div>

        </div>
    );
}