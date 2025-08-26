import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

// Route to get all users
router.get('/users', userController.getAllUsers);

// Route to create a new user
router.post('/users', userController.createUser);

// Route to get a single user by ID
router.get('/users/:id', userController.getUserById);

// Route to update a user
router.put('/users/:id', userController.updateUser);

// Route to delete a user
router.delete('/users/:id', userController.deleteUser);

export default router;