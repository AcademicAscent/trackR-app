import express from "express";
import cors from "cors";
import router from "./src/routes/goalRoutes.js";
// import goalRoutes from "./routes/goal";
// import todoRouter from "./routes/todo.js";
// import verifyToken from "./middleware/auth.js";


const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

//Niko note: uncomment line below to test routes without middleware
// app.use("/todos", todoRouter);
app.use('/api', router);
//Niko note: comment out to test routes without middleware
// app.use("/todos", verifyToken, todoRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});