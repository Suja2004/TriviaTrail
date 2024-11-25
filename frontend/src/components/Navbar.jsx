import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("role");
    const role = user;
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <h2 className="logo">QuizApp</h2>
            <ul className="navLinks">
                {!isLoggedIn ? (
                    <>
                        <li className="navItem">
                            <Link to="/login" className="link">
                                Login
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        {role === "admin" && (
                            <li className="navItem">
                                <Link to="/admin" className="link">
                                    Admin Panel
                                </Link>
                            </li>
                        )}
                        {role === "user" && (
                            <>
                                <li className="navItem">
                                    <Link to="/user" className="link">
                                        Home
                                    </Link>
                                </li>
                                <li className="navItem">
                                    <Link to="/results" className="link">
                                        Results
                                    </Link>
                                </li>
                                <li className="navItem">
                                    <Link to="/leaderboard" className="link">
                                        Leaderboard
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className="navItem">
                            <button onClick={handleLogout} className="logoutButton">
                                Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
