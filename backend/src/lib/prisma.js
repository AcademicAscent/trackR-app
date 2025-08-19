// This singleton pattern ensures only one Prisma Client instance exists, which should resolve your "prepared statement already exists" error.
//This should resolve both the import path issue and the UUID/Int type mismatch.

import { PrismaClient } from '../generated/prisma/index.js'; // path to generated dir in src
// import { PrismaClient } from '../../generated/prisma/index.js';//if we move generated to outside src
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient({
    log: ['query'],
});

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

// Add cleanup on process termination
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});