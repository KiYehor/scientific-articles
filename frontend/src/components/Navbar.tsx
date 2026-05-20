import { getUserRole } from "../utils/auth";


export default function Navbar() {

    const token = localStorage.getItem("token");

    const role = getUserRole();


    return (

        <div className="bg-black text-white px-10 py-5 flex justify-between items-center">

            <div
                onClick={() => {
                    window.location.href = "/";
                }}
                className="text-2xl font-bold cursor-pointer"
            >
                Scientific Platform
            </div>


            <div className="flex gap-4 items-center">

                <button
                    onClick={() => {
                        window.location.href = "/";
                    }}
                    className="hover:text-gray-300"
                >
                    Home
                </button>
                <button
                    onClick={() => {
                        window.location.href = "/articles";
                    }}
                    className="hover:text-gray-300"
                >
                    Articles
                </button>

                {!token && (

                    <>

                        <button
                            onClick={() => {
                                window.location.href = "/login";
                            }}
                            className="hover:text-gray-300"
                        >
                            Login
                        </button>

                        <button
                            onClick={() => {
                                window.location.href = "/register";
                            }}
                            className="bg-blue-500 px-4 py-2 rounded-xl"
                        >
                            Register
                        </button>

                    </>

                )}


                {token && (

                    <>

                        <button
                            onClick={() => {
                                window.location.href = "/profile";
                            }}
                            className="hover:text-gray-300"
                        >
                            Profile
                        </button>


                        {role === "AUTHOR" && (

                            <button
                                onClick={() => {
                                    window.location.href = "/upload";
                                }}
                                className="hover:text-gray-300"
                            >
                                Upload
                            </button>

                        )}


                        {role === "ADMIN" && (

                            <button
                                onClick={() => {
                                    window.location.href = "/admin";
                                }}
                                className="hover:text-gray-300"
                            >
                                Admin
                            </button>

                        )}


                        <button
                            onClick={() => {

                                localStorage.removeItem("token");

                                window.location.href = "/";
                            }}
                            className="bg-red-500 px-4 py-2 rounded-xl"
                        >
                            Logout
                        </button>

                    </>

                )}

            </div>

        </div>
    );
}