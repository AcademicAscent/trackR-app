// backend/src/controllers/sessionController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all sessions
export const getAllSessions = async (req, res) => {
    try {
        const sessions = await prisma.studySession.findMany();
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new session
export const createSession = async (req, res) => {
    const { duration, goalId } = req.body;
    try {
        const newSession = await prisma.studySession.create({
            data: { duration, goalId }
        });
        res.status(201).json(newSession);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single session by ID
export const getSessionById = async (req, res) => {
    const { id } = req.params;
    try {
        const session = await prisma.studySession.findUnique({
            where: { id: id }
        });
        if (session) {
            res.status(200).json(session);
        } else {
            res.status(404).json({ error: "Session not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a session
export const updateSession = async (req, res) => {
    const { id } = req.params;
    const { duration } = req.body;
    try {
        const updatedSession = await prisma.studySession.update({
            where: { id: id },
            data: { duration }
        });
        res.status(200).json(updatedSession);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a session
export const deleteSession = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.studySession.delete({
            where: { id: id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};