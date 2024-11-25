import axios from "axios";

const API = axios.create({ baseURL: "https://trivia-trail.vercel.app/api" });

// Add Authorization header
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

// Auth APIs
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

// Category APIs
export const fetchCategories = () => API.get("/categories");
export const fetchQuestionsByCategory = (category) =>
    API.get(`/questions/${category}`);
export const addQuestion = (questionData) =>
    API.post("/questions/add", questionData);

// Result APIs
export const saveResult = (resultData) => API.post("/results/add", resultData);
export const fetchResults = (userName) => API.get("/results");
export const fetchLeaderboard = () => API.get("/results/leaderboard");


