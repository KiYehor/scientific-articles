import { useEffect, useState } from "react";
import api from "../api/client";
import Navbar from "../components/Navbar";
export default function ArticlesPage() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [keywords, setKeywords] = useState("");
    const [articles, setArticles] = useState<any[]>([]);
    useEffect(() => {

        fetchArticles();

    }, []);

    const fetchArticles = async () => {

    try {

        const response = await api.get(
            "/articles/search",
            {
                params: {
                    title: search,
                    status,
                    keywords
                }
            }
        );

        setArticles(response.data);

    } catch (err) {

        console.error(err);
    }
    };
    useEffect(() => {

        fetchArticles();

    }, [search, status, keywords]);
    return (

        <div className="min-h-screen bg-gray-100 p-10">
            <Navbar />
            <div className="flex justify-between items-center mb-10">

                <h1 className="text-4xl font-bold">
                    Articles Dashboard 
                </h1>
                
                 <div className="flex gap-4 mb-10">
                    <input
                        placeholder="Search title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border p-3 rounded-xl w-full"
                    />
                    <input 
                        placeholder="Keywords..."
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        className="border p-3 rounded-xl w-full"
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)} 
                        className="border p-3 rounded-xl"
                    >
                        <option value="">All </option>
                        <option value="SUBMITTED">Submitted</option>
                        <option value="IN_REVIEW">In Review</option>
                        <option value="ACCEPTED">Accepted</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="PUBLISHED">Published</option>
                    </select>
                </div>    
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {articles.map((article) => (

                    <div
                        key={article.id}
                        onClick={() => {
                            window.location.href = `/articles/${article.id}`;
                        }}
                        className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:scale-[1.02] transition"
                    >

                        <h2 className="text-2xl font-bold mb-3">
                            {article.title}
                        </h2>

                        <p className="text-gray-600 mb-4">
                            {article.abstract}
                        </p>

                        <div className="flex justify-between items-center">

                            <span
                                className={`
                                    px-3 py-1 rounded-full text-sm text-white
                                    ${article.status === "SUBMITTED"
                                        ? "bg-gray-500"
                                        : ""}
                                    ${article.status === "IN_REVIEW"
                                        ? "bg-yellow-500"
                                        : ""}
                                    ${article.status === "ACCEPTED"
                                        ? "bg-green-500"
                                        : ""}
                                    ${article.status === "REJECTED"
                                        ? "bg-red-500"
                                        : ""}
                                `}
                            >
                                {article.status}
                            </span>

                            <span className="text-sm text-gray-500">
                                #{article.id}
                            </span>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}