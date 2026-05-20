import { useState } from "react";

import api from "../api/client";
import { toast } from "react-hot-toast/headless";

type Props = {
    articleId: number;
};

export default function ReviewForm({
    articleId
}: Props) {

    const [score, setScore] = useState(5);

    const [comment, setComment] = useState("");

    const [decision, setDecision] = useState("accept");

    const submitReview = async () => {

        try {

            await api.post("/reviews/", {
                article_id: articleId,
                score,
                comment,
                decision
            });

            toast.success("Review submitted");

            window.location.reload();

        } catch (err) {

            console.error(err);

            toast.error("Review failed");
        }
    };

    return (

        <div className="bg-gray-100 p-6 rounded-2xl mt-10">

            <h2 className="text-2xl font-bold mb-6">
                Add Review
            </h2>

            <input
                type="number"
                min={1}
                max={10}
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="border p-3 rounded-xl w-full mb-4"
            />

            <textarea
                placeholder="Comment"
                onChange={(e) => setComment(e.target.value)}
                className="border p-3 rounded-xl w-full h-[150px] mb-4"
            />

            <select
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                className="border p-3 rounded-xl w-full mb-6"
            >
                <option value="accept">
                    Accept
                </option>

                <option value="reject">
                    Reject
                </option>
            </select>

            <button
                onClick={submitReview}
                className="bg-black text-white px-6 py-3 rounded-xl"
            >
                Submit Review
            </button>

        </div>
    );
}