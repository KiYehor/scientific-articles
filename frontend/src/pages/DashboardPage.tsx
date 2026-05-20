import { useEffect, useState } from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import api from "../api/client";
import Navbar from "../components/Navbar";

export default function DashboardPage() {

    const [stats, setStats] = useState<any>(null);

    useEffect(() => {

        fetchStats();

    }, []);

    const fetchStats = async () => {

        try {

            const response = await api.get(
                "/articles/stats/overview"
            );

            setStats(response.data);

        } catch (err) {

            console.error(err);
        }
    };

    if (!stats) {

        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    const data = [
        {
            name: "SUBMITTED",
            value: stats.SUBMITTED
        },
        {
            name: "ACCEPTED",
            value: stats.ACCEPTED
        },
        {
            name: "REJECTED",
            value: stats.REJECTED
        },
        {
            name: "PUBLISHED",
            value: stats.PUBLISHED
        },
        {
            name: "IN_REVIEW",
            value: stats.IN_REVIEW
        }
    ];

    return (

        <div className="min-h-screen bg-gray-100 p-10">
            <Navbar />
            <h1 className="text-4xl font-bold mb-10">
                Analytics Dashboard 
            </h1>
            <button
                onClick={() => {
                    window.open(
                        "http://127.0.0.1:8000/articles/export/csv",
                        "_blank"
                    );
                }}
                className="bg-black text-white px-5 py-2 rounded-xl"
            >
                Export CSV
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-gray-500 mb-2">
                        Total Articles
                    </h2>

                    <p className="text-4xl font-bold">
                        {stats.total_articles}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-gray-500 mb-2">
                        Submitted
                    </h2>

                    <p className="text-4xl font-bold">
                        {stats.SUBMITTED}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-gray-500 mb-2">
                        Accepted
                    </h2>

                    <p className="text-4xl font-bold">
                        {stats.ACCEPTED}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-gray-500 mb-2">
                        Rejected
                    </h2>

                    <p className="text-4xl font-bold">
                        {stats.REJECTED}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-gray-500 mb-2">
                        Published
                    </h2>

                    <p className="text-4xl font-bold">
                        {stats.PUBLISHED}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-gray-500 mb-2">
                        In Review
                    </h2>

                    <p className="text-4xl font-bold">
                        {stats.IN_REVIEW}
                    </p>
                </div>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-lg h-[500px]">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            outerRadius={180}
                            label
                        >

                            {data.map((_, index) => (

                                <Cell
                                    key={index}
                                />

                            ))}

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}