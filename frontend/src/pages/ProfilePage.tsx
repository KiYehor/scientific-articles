import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/client";


export default function ProfilePage() {

    const [user, setUser] = useState<any>(null);

    const [articles, setArticles] = useState<any[]>([]);


    useEffect(() => {

        fetchProfile();

        fetchMyArticles();

    }, []);


    const fetchProfile = async () => {

        try {

            const response = await api.get(
                "/auth/me"
            );

            setUser(response.data);

        } catch (err) {

            console.error(err);

            window.location.href = "/login";
        }
    };


    const fetchMyArticles = async () => {

        try {

            const response = await api.get(
                "/articles/my"
            );

            setArticles(response.data);

        } catch (err) {

            console.error(err);
        }
    };


    if (!user) {

        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }


    return (

        <div className="min-h-screen bg-gray-100 p-10">
            <Navbar />
            <div className="max-w-5xl mx-auto">

                <div className="bg-white rounded-2xl shadow-xl p-10 mb-10">

                    <h1 className="text-4xl font-bold mb-8">
                        Profile
                    </h1>

                    <div className="space-y-4 text-xl">

                        <p>
                            <span className="font-bold">
                                Name:
                            </span>{" "}
                            {user.first_name} {user.last_name}
                        </p>

                        <p>
                            <span className="font-bold">
                                Email:
                            </span>{" "}
                            {user.email}
                        </p>

                        <p>
                            <span className="font-bold">
                                Role:
                            </span>{" "}
                            {user.role}
                        </p>

                    </div>

                </div>


                <div>

                    <h2 className="text-3xl font-bold mb-6">
                        My Articles
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {articles.map((article) => (

                            <div
                                key={article.id}
                                onClick={() => {
                                    window.location.href =
                                        `/articles/${article.id}`;
                                }}
                                className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:scale-[1.02] transition"
                            >

                                <h3 className="text-2xl font-bold mb-3">
                                    {article.title}
                                </h3>

                                <p className="text-gray-600 mb-4">
                                    {article.abstract}
                                </p>

                                <span className="bg-gray-200 px-4 py-2 rounded-full text-sm">
                                    {article.status}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}