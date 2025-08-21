// backend/src/routes/sessionRoutes.js
import express from "express";
import * as sessionController from "../controllers/sessionController.js";

const router = express.Router();

// Route to get all sessions
router.get('/sessions', sessionController.getAllSessions);

// Route to create a new session
router.post('/sessions', sessionController.createSession);

// Route to get a single session by ID
router.get('/sessions/:id', sessionController.getSessionById);

// Route to update a session
router.put('/sessions/:id', sessionController.updateSession);

// Route to delete a session
router.delete('/sessions/:id', sessionController.deleteSession);

export default router;