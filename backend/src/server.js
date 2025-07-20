import express from 'express';
import dotenv from 'dotenv';    
import connectDB from './config/db.js';
import noterouters from './routes/noteroutes.js';
import rateLimit from './middleware/rateLimiter.js';
import cors from 'cors'

dotenv.config();

const app = express();
app.use(cors(
    {
        origin : 'http://localhost:5173',
    }
));
app.use(express.json());
app.use(rateLimit);


// Middleware to handle CORS
// app.use((req, res, next) => {   
    //     console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    //     next();
    // });
    
    app.use("/api/notes", noterouters );
    
    
    const PORT = process.env.PORT || 5000;
    
connectDB().then(() => {

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
});

export default app; // Export the app for testing purposes

