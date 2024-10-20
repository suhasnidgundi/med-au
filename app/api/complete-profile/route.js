import prisma from '@/libs/PrismaClient';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

// Handle POST requests for profile completion
export async function POST(req) {
    const session = await getServerSession({ req });

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const {
        phoneNumber,
        dob,
        gender,
        bloodGroup,
        height,
        weight,
        location,
        language,
        emergencyContact,
        preferredCommunicationMode,
    } = await req.json();

    try {
        const updatedProfile = await prisma.userProfile.upsert({
            where: { userId },
            update: {
                phone_number: phoneNumber,
                dob: new Date(dob),
                gender,
                blood_group: bloodGroup,
                height: parseFloat(height),
                weight: parseFloat(weight),
                location,
                language,
                emergency_contact: emergencyContact,
                preferred_communication_mode: preferredCommunicationMode,
            },
            create: {
                userId,
                phone_number: phoneNumber,
                dob: new Date(dob),
                gender,
                blood_group: bloodGroup,
                height: parseFloat(height),
                weight: parseFloat(weight),
                location,
                language,
                emergency_contact: emergencyContact,
                preferred_communication_mode: preferredCommunicationMode,
            },
        });

        return NextResponse.json({ message: 'Profile updated successfully', profile: updatedProfile });
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ message: 'Error updating profile', error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
