import { useEffect, useState } from "react";

import api from "../api/client";

type Props = {
    articleId: number;
};

export default function ReviewsList({
    articleId
}: Props) {

    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {

        fetchReviews();

    }, []);

    const fetchReviews = async () => {

        try {

            const response = await api.get(
                `/reviews/${articleId}`
            );

            setReviews(response.data);

        } catch (err) {

            console.error(err);
        }
    };

return (

    <div className="space-y-6 mt-10">

        <h2 className="text-3xl font-bold">
            Reviews
        </h2>

        {reviews.map((review: any) => (

            <div
                key={review.id}
                className="bg-gray-50 rounded-2xl p-6 shadow"
            >

                <div className="flex justify-between items-start mb-4">

                    <div>

                        <h3 className="text-xl font-bold">
                            {review.reviewer?.first_name}{" "}
                            {review.reviewer?.last_name}
                        </h3>

                        <p className="text-gray-500 text-sm">
                            REVIEWER
                        </p>

                    </div>


                    <div className="text-right">

                        <div className="bg-black text-white px-4 py-2 rounded-full text-lg">
                            {review.score}/10
                        </div>

                        <p className="text-sm text-gray-500 mt-2">

                            {review.created_at
                                ? new Date(
                                      review.created_at
                                  ).toLocaleDateString()
                                : ""}

                        </p>

                    </div>

                </div>


                <div className="mb-4">

                    <span
                        className={`
                            px-4 py-2 rounded-full text-white text-sm

                            ${
                                review.decision === "accept"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                            }
                        `}
                    >
                        {review.decision}
                    </span>

                </div>


                <p className="text-gray-700 text-lg">
                    {review.comment}
                </p>

            </div>

        ))}

    </div>
);
}