import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Admin from "./_admin/index";
import Brand from "./_brand/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import { AuthProvider } from "./components/Auth";

ReactDOM.render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route
                    path="/_admin/*"
                    element={
                        <RequireAuth allowList={["admin"]}>
                            <Admin />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/_brand/*"
                    element={
                        <RequireAuth allowList={["brand"]}>
                            <Brand />
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<App />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>,
    document.getElementById("root")
);
