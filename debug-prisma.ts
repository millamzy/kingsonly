
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

console.log('Script started');

async function main() {
    try {
        console.log('Instantiating PrismaClient...');
        const prisma = new PrismaClient()
        console.log('Connecting...');
        await prisma.$connect();
        console.log('Connected!');
    } catch (e: any) {
        console.log('CAUGHT ERROR:');
        console.log(e.message);
    } finally {
        // await prisma.$disconnect(); 
    }
}

main();
