const express = require('express');
const {connectDB} = require('./db/connect');
const app = express();
const backendRoutes = require('./routes/backendRoutes');
var cors = require("cors");
require('dotenv').config()

// middleware
app.use(express.json());
app.use(cors());
// routes
app.use('/api/v1', backendRoutes)

const PORT = process.env.PORT || 4000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => console.log('server is running...'))
    } catch (error) {
        console.log(error);
    }
}
start();