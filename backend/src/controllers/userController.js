import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    const { email } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: { email }
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { email }
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};