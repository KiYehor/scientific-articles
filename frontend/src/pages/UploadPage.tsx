import { useState } from "react";
import api from "../api/client";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast/headless";

export default function UploadPage() {

    const [title, setTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    const [keywords, setKeywords] = useState("");

    const [file, setFile] = useState<File | null>(null);

    const handleUpload = async () => {

        if (!file) {
            toast.error("Choose file");
            return;
        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("abstract", abstract);
        formData.append("keywords", keywords);

        formData.append("file", file);

        try {

            await api.post(
                "/articles/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            toast.success("Uploaded");

            window.location.href = "/articles";

        } catch (err) {

            console.error(err);

            toast.error("Upload failed");
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <Navbar />
            <div className="bg-white p-10 rounded-2xl shadow-xl w-[600px]">

                <h1 className="text-3xl font-bold mb-8">
                    Upload Article 
                </h1>

                <input
                    className="w-full border p-3 rounded-xl mb-4"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="w-full border p-3 rounded-xl mb-4 h-[150px]"
                    placeholder="Abstract"
                    onChange={(e) => setAbstract(e.target.value)}
                />

                <input
                    className="w-full border p-3 rounded-xl mb-4"
                    placeholder="Keywords"
                    onChange={(e) => setKeywords(e.target.value)}
                />

                <input
                    type="file"
                    className="mb-6"
                    onChange={(e) => {

                        if (e.target.files) {
                            setFile(e.target.files[0]);
                        }
                    }}
                />

                <button
                    onClick={handleUpload}
                    className="w-full bg-black text-white p-3 rounded-xl"
                >
                    Upload
                </button>

            </div>

        </div>
    );
}