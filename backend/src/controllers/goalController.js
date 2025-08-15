
import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

export const getAllGoals = async (req, res) => {
    try {
        const goals = await prisma.goal.findMany();
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createGoal = async (req, res) => {
    const { title, description, userId } = req.body;
    try {
        const newGoal = await prisma.goal.create({
            data: { title, description, userId }
        });
        res.status(201).json(newGoal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Getting a single goal by it's ID
export const getGoalById = async (req, res) => {
    const { id } = req.params;
    try {
        const goal = await prisma.goal.findUnique({
            where: { id: id },
        });

        if (goal) {
            res.status(200).json(goal);
        } else {
            res.status(404).json({ error: "Goal not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateGoal = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const updatedGoal = await prisma.goal.update({
            where: { id: id },
            data: { title, description }
        });
        res.status(200).json(updatedGoal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteGoal = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.goal.delete({
            where: { id: id }
        });
        res.status(204).send(); // 204 No Content for successful deletion
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


