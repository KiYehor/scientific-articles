import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/client";

import Navbar from "../components/Navbar";


export default function AdminPage() {

    const [users, setUsers] = useState<any[]>([]);


    useEffect(() => {

        fetchUsers();

    }, []);


    const fetchUsers = async () => {

        try {

            const response = await api.get(
                "/admin/users"
            );

            setUsers(response.data);

        } catch (err) {

            console.error(err);

            window.location.href = "/";
        }
    };


    const changeRole = async (
        userId: number,
        role: string
    ) => {

        try {

            await api.put(
                `/admin/users/${userId}/role`,
                {},
                {
                    params: {
                        role
                    }
                }
            );

            fetchUsers();

        } catch (err) {

            console.error(err);

            toast.error("Failed");
        }
    };


    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="p-10 max-w-6xl mx-auto">

                <h1 className="text-5xl font-bold mb-10">
                    Admin Panel
                </h1>


                <div className="grid gap-6">

                    {users.map((user) => (

                        <div
                            key={user.id}
                            className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center"
                        >

                            <div>

                                <h2 className="text-2xl font-bold">
                                    {user.first_name} {user.last_name}
                                </h2>

                                <p className="text-gray-600">
                                    {user.email}
                                </p>

                                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                                    {user.role}
                                </span>

                            </div>


                            <div className="flex gap-4">

                                {user.role === "AUTHOR" && (

                                    <button
                                        onClick={() => {
                                            changeRole(
                                                user.id,
                                                "REVIEWER"
                                            );
                                        }}
                                        className="bg-blue-500 text-white px-5 py-2 rounded-xl"
                                    >
                                        Make Reviewer
                                    </button>

                                )}


                                {user.role === "REVIEWER" && (

                                    <button
                                        onClick={() => {
                                            changeRole(
                                                user.id,
                                                "AUTHOR"
                                            );
                                        }}
                                        className="bg-yellow-500 text-white px-5 py-2 rounded-xl"
                                    >
                                        Remove Reviewer
                                    </button>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}