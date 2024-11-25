require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const resultsRouter = require("./routes/results");


app.use(cors());
app.use(bodyParser.json());

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/results", resultsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
