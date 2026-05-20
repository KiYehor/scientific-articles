import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import ReviewsList from "../components/ReviewsList";
import api from "../api/client";
import { getUserRole } from "../utils/auth";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast/headless";
export default function ArticlePage() {

    const { id } = useParams();
    const role = getUserRole();
    const token = localStorage.getItem("token");
    const takeToReview = async () => {
    try {

        await api.put(
            `/articles/${article.id}/review`
        );

        window.location.reload();

    } catch (err) {

        console.error(err);

        toast.error("Failed");
    }
};
const finalDecision = async (
    decision: string
) => {

    try {

        await api.put(
            `/articles/${article.id}/decision`,
            {},
            {
                params: {
                    decision
                }
            }
        );

        window.location.reload();

    } catch (err) {

        console.error(err);

        toast.error("Failed");
    }
};

const publishArticle = async () => {

    try {

        await api.put(
            `/articles/${article.id}/publish`
        );

        window.location.reload();

    } catch (err) {

        console.error(err);

        toast.error("Failed");
    }
};
    const [article, setArticle] = useState<any>(null);
    useEffect(() => {

        fetchArticle();
    }, []);

    const fetchArticle = async () => {

        try {

            const response = await api.get(`/articles/${id}`);

            setArticle(response.data);

        } catch (err) {

            console.error(err);
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

                <p className="text-gray-600 mb-8">
                    {article.abstract}
                </p>

                <div className="mb-6">
                    <span className="font-bold">
                        {role === "ADMIN" && (
                            <div className="flex gap-4 mt-6">
                                {article.status === "SUBMITTED" && (
                                    <button
                                        onClick={takeToReview}
                                        className="bg-yellow-500 text-white px-5 py-2 rounded-xl"
                                    >
                                        Take to Review
                                    </button>
                                )}
                                {article.status === "IN_REVIEW" && (
                                    <>
                                        <button
                                            onClick={() => {finalDecision("ACCEPTED");
                                            }}
                                            className="bg-green-600 text-white px-5 py-2 rounded-xl"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => {finalDecision("REJECTED");
                                            }}
                                            className="bg-red-600 text-white px-5 py-2 rounded-xl"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                                {article.status === "ACCEPTED" && (
                                    <button
                                        onClick={publishArticle}
                                        className="bg-blue-600 text-white px-5 py-2 rounded-xl"
                                    >
                                        Publish
                                    </button>
                                )} 
                            </div>
                        )}
                    </span>
                </div>

                <p className="mb-10">
                    Keywords: {article.keywords}
                </p>

                <a
                    href={`http://127.0.0.1:8000/${article.file_path}`}
                    target="_blank"
                    className="bg-black text-white px-6 py-3 rounded-xl"
                >
                    Download File
                </a>

            {token && (
                <>
                    <ReviewsList articleId={article.id} />
                    {(role === "REVIEWER" || role === "ADMIN") && (
                        <ReviewForm articleId={article.id} />
                    )}
                </>
            )}
            </div>

        </div>
    );
}