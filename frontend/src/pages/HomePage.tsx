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

            {/* HERO SECTION */}

            <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">

                <div className="max-w-6xl mx-auto px-6 py-28 text-center">

                    <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-gray-300 mb-6">
                        Scientific Research Platform
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                        Publish and Explore
                        <br />
                        Scientific Research
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Modern platform for publishing, reviewing and discovering academic articles.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">

                        <button
                            onClick={() => {
                                window.location.href = "/login";
                            }}
                            className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition"
                        >
                            Login
                        </button>

                        <button
                            onClick={() => {
                                window.location.href = "/register";
                            }}
                            className="bg-blue-500 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-600 transition"
                        >
                            Register
                        </button>

                    </div>

                </div>

            </div>


            {/* ARTICLES SECTION */}

            <div className="bg-white rounded-t-[3rem] -mt-12 relative z-10 shadow-2xl">

                <div className="p-10 max-w-7xl mx-auto">

                    <div className="text-center mb-14">

                        <p className="text-blue-500 font-semibold mb-3">
                            PUBLICATIONS
                        </p>

                        <h2 className="text-5xl font-bold mb-4">
                            Recent Articles
                        </h2>

                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Explore recently published scientific papers from researchers and reviewers.
                        </p>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {articles.map((article) => (

                            <div
                                key={article.id}
                                onClick={() => {
                                    window.location.href =
                                        `/public/articles/${article.id}`;
                                }}
                                className="bg-gray-50 border border-gray-200 rounded-3xl p-7 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition duration-300"
                            >

                                <div className="flex items-center justify-between mb-5">

                                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                                        PUBLISHED
                                    </span>

                                </div>


                                <h3 className="text-2xl font-bold mb-4 line-clamp-2">
                                    {article.title}
                                </h3>

                                <p className="text-gray-500 mb-5">
                                    By {article.author.first_name}{" "}
                                    {article.author.last_name}
                                </p>

                                <p className="text-gray-600 line-clamp-4 mb-8">
                                    {article.abstract}
                                </p>


                                <div className="flex items-center justify-between">

                                    <span className="text-sm text-gray-400">
                                        Read full article
                                    </span>

                                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                                        →
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}