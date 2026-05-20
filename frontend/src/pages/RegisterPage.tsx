import { useState } from "react";
import api from "../api/client";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast/headless";

export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const handleRegister = async () => {
        if (
            !email ||
            !firstName ||
            !lastName ||
            !firstName ||
            !password
        ) {
            toast.error("All fields are required");
            return;
        }
        try {
            
            await api.post("/auth/register", {
                email,
                password,
                first_name: firstName,
                last_name: lastName
            });

            toast.success("Registered");

            window.location.href = "/";

        } catch (err) {

            console.error(err);

            toast.error("Register failed");
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <Navbar />
            <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">

                <h1 className="text-3xl font-bold mb-8">
                    Register
                </h1>
                <input
                    className="w-full border p-3 rounded-xl mb-4"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    className="w-full border p-3 rounded-xl mb-4"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                />
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
                    onClick={handleRegister}
                    className="w-full bg-black text-white p-3 rounded-xl"
                >
                    Register
                </button>

            </div>

        </div>
    );
}