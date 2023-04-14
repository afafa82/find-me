import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";

export const RequireAuth = ({ allowList, children }) => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.getToken() === null || auth.getRole() === null) {
            return navigate("/login");
        }

        if (!allowList.includes(auth.getRole())) {
            if (auth.getRole() === "admin") {
                return navigate("/_admin");
            } else if (auth.getRole() === "brand") {
                return navigate("/_brand");
            }

            return navigate("/");
        }
    }, []);

    return children;
};
