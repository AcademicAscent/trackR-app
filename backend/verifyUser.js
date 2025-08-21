// backend/verifyUser.js
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Supabase client with the service role key
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

const userToVerify = 'ff78f95e-78b1-46ae-a83b-db0d7527cdee'; // Replace with your user's UID

async function verifyUser() {
    console.log(`Attempting to verify user with UID: ${userToVerify}`);

    const { data, error } = await supabase.auth.admin.updateUserById(userToVerify, {
        email_confirmed_at: new Date().toISOString(),
    });

    if (error) {
        console.error('Error verifying user:', error);
    } else {
        console.log('User successfully verified:', data.user);
    }
}

verifyUser();