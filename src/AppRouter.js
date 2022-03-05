import React, { Suspense } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import PrivateRoute from "./components/authGuard/PrivateRoute";
import AppSkeleton from "./components/skeletons/AppSkeleton";
import DefaultLayout from "./layout/DefaultLayout";

const Home = React.lazy(() => import("./pages/Home/Home"));
const Category = React.lazy(() => import("./pages/Category/Category"));
const Blog = React.lazy(() => import("./pages/Blog/Blog"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
const Dashboard = React.lazy(() => import("./Admin/layout/DefaultLayout"));
const Product = React.lazy(() => import("./pages/Product/Product"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const AdminLogin = React.lazy(() => import("./pages/AdminLogin/AdminLogin"));
const Registration = React.lazy(() => import("./pages/Registration/Registration"));
const Cart = React.lazy(() => import("./pages/Cart/Cart"));
const Checkout = React.lazy(() => import("./pages/Checkout/Checkout"));
const Search = React.lazy(() => import("./pages/Search/Search"));

const AppRouter = () => {
    return (
        <Router>
            <DefaultLayout>
                <Suspense fallback={AppSkeleton}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin-login" element={<AdminLogin />} />
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/dashboard/*" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/category/:categoryId" element={<Category />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                        <Route path="/search/:productName" element={<Search />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </DefaultLayout>
        </Router>
    );
};

export default AppRouter;