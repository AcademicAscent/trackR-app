import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import goalRoutes from './routes/goalRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import userRoutes from "./routes/userRoutes.js";



const app = express();
const PORT = process.env.PORT || 5000;

// Supabase client setup
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

// Middleware
app.use(cors());
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
    res.send('Antventure Backend is running!');
});
// API Routes
app.use('/api', goalRoutes);
app.use('/api', sessionRoutes);
app.use('/api', userRoutes);



// Authentication routes
app.post('/auth/signup', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: 'User signed up successfully!', user: data.user });
});

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(401).json({ error: 'Invalid credentials' });
    res.status(200).json({ message: 'User logged in successfully!', user: data.user });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
