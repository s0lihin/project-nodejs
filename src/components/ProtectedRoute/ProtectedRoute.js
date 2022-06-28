import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../../services/SecurityService";


export const ProtectedRoute = () => {
    return isLoggedIn() ? <Outlet /> : <Navigate to="/" />
}