import express from "express";
import * as goalController from "../controllers/goalController.js";

const router = express.Router();

// const goalController = require('../controllers/goalController');

// no / root route is needed (the login and signup logic with supabase will be handles on the frontend by P
//check into open api (yaml)  winnona mentioned that specify all the restful api routes I can share teammates

//route to get all goals
router.get('/goals', goalController.getAllGoals);

//route to get a single goal by ID ex to test in postman http://localhost:8080/api/goals/a5a98882-5174-4fc9-a3f9-17d7874de23a
router.get('/goals/:id', goalController.getGoalById);

//route to add a goal
router.post('/goals', goalController.createGoal);

// route to edit a goal by ID to test this in postman http://localhost:8080/api/goals/1
router.put('/goals/:id', goalController.updateGoal);

//route to delete a goal by ID
router.delete('/goals/:id', goalController.deleteGoal);

// route to add a new Progress entry
router.post('/progress', goalController.logProgress);

// route to get specific user's achievements based on their user ID
router.get('/achievements/:userId', goalController.getAchievements);


export default router;
