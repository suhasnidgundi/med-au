// app/api/process/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import prisma from '@/libs/PrismaClient';

// Initialize Google AI
const genAI = new GoogleGenerativeAI('AIzaSyAC18nACenonuUXFL8e7bvIAR994qL2hDY');

export async function POST(request) {
    try {
        const { user_query, data_query } = await request.json();

        // Execute the Prisma query
        const data = await prisma.$queryRawUnsafe(data_query);

        // Process data with Google AI
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const prompt = `User Query: ${user_query}\nData: ${JSON.stringify(data)}\nPlease analyze this data and provide insights.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ result: text });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(
            { error: error.message || 'An error occurred while processing the request' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect()
    }
}