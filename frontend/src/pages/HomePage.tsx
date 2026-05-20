import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/client";


export default function HomePage() {

    const [articles, setArticles] = useState<any[]>([]);


    useEffect(() => {

        fetchArticles();

    }, []);


    const fetchArticles = async () => {

        try {

            const response = await api.get(
                "/articles/public",
            );

            setArticles(response.data);

        } catch (err) {

            console.error(err);
        }
    };


    return (

        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="bg-black text-white py-24 px-10 text-center">

                <h1 className="text-6xl font-bold mb-6">
                    Scientific Articles Platform
                </h1>

                <p className="text-2xl text-gray-300 mb-10">
                    Publish, review and explore scientific research
                </p>

                <div className="flex justify-center gap-6">

                    <button
                        onClick={() => {
                            window.location.href = "/login";
                        }}
                        className="bg-white text-black px-8 py-4 rounded-2xl font-bold"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => {
                            window.location.href = "/register";
                        }}
                        className="bg-blue-500 px-8 py-4 rounded-2xl font-bold"
                    >
                        Register
                    </button>

                </div>

            </div>


            <div className="p-10 max-w-7xl mx-auto">

                <h2 className="text-4xl font-bold mb-10">
                    Accepted Articles
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {articles.map((article) => (

                        <div
                            key={article.id}
                            onClick={() => {
                                window.location.href =
                                    `/public/articles/${article.id}`;
                            }}
                            className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:scale-[1.02] transition"
                        >

                            <h3 className="text-2xl font-bold mb-4">
                                {article.title}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                By {article.author.first_name}{" "}
                                {article.author.last_name}
                            </p>
                            <p className="text-gray-600 mb-6">
                                {article.abstract}
                            </p>

                            <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">
                                ACCEPTED
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}