import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ArticlesPage from "./pages/ArticlesPage";
import UploadPage from "./pages/UploadPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ArticlePage from "./pages/ArticlePage";
import DashboardPage from "./pages/DashboardPage";
import PublicArticlePage from "./pages/PublicArticlePage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
export default function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                <Route
                    path="/articles"
                    element={
                        <ProtectedRoute>
                            <ArticlesPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/upload"
                    element={
                        <ProtectedRoute>
                            <UploadPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/articles/:id"
                    element={
                        <ProtectedRoute>
                            <ArticlePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/public/articles/:id"
                    element={<PublicArticlePage />}
                />
                <Route
                    path="/profile"
                    element={<ProfilePage />}
                />
                <Route
                    path="/admin"
                    element={<AdminPage />}
                />
            </Routes>

        </BrowserRouter>
    );
}