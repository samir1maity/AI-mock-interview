import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default prisma;

//npx prisma migrate dev --name Initialize the schema