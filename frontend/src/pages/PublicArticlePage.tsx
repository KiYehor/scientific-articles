import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/client";


export default function PublicArticlePage() {

    const { id } = useParams();

    const [article, setArticle] = useState<any>(null);


    useEffect(() => {

        fetchArticle();

    }, []);


    const fetchArticle = async () => {

        try {

            const response = await api.get(
                `/articles/public/${id}`
            );

            setArticle(response.data);
        } catch (err) {

            console.error(err);

            window.location.href = "/";
        }
    };


    if (!article) {

        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }


    return (

        <div className="min-h-screen bg-gray-100 p-10">
            <Navbar />
            <div className="bg-white rounded-2xl shadow-xl p-10 max-w-4xl mx-auto">

                <h1 className="text-4xl font-bold mb-6">
                    {article.title}
                </h1>
                <p className="text-gray-500 mb-6">

                    by {article.author?.first_name}{" "}
                    {article.author?.last_name}

                </p>
                <p className="text-gray-600 mb-8">
                    {article.abstract}
                </p>

                <div className="mb-6">

                    <span className="bg-green-500 text-white px-4 py-2 rounded-full">
                        ACCEPTED
                    </span>

                </div>

                <p className="mb-10">
                    Keywords: {article.keywords}
                </p>

                <a
                    href={`http://127.0.0.1:8000/${article.file}`}
                    target="_blank"
                    className="bg-black text-white px-6 py-3 rounded-xl"
                >
                    Download File
                </a>

            </div>

        </div>
    );
}