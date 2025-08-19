import express from "express";
import cors from "cors";
import goalRoutes from './src/routes/goalRoutes.js';
import userRoutes from "./src/routes/userRoutes.js";
import sessionRoutes from "./src/routes/sessionRoutes.js";
// import goalRoutes from './routes/goalRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import verifyToken from "./middleware/auth.js";

const app = express();
app.use(express.json());
app.use(cors());
// const PORT = 8080;

const PORT = process.env.PORT || 8080;


//Niko note: uncomment line below to test routes without middleware
//routers
// app.use('/api', router);//giving the goal route the api prefix
app.use('/api', goalRoutes);
app.use('/api', userRoutes);//giving the user routes the api prefix
app.use('/api', sessionRoutes); // Use the new session routes with the /api prefix
//Niko note: comment out to test routes without middleware
// app.use("/todos", verifyToken, todoRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});