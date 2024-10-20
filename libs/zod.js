import { object, string } from "zod"
import { z } from 'zod';

export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
})

export const basicUserHealthInformationSchema = z.object({
    phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
    dob: z.string().refine((date) => new Date(date) < new Date(), "Date of birth must be in the past"),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    bloodGroup: z.string().min(2, "Blood group is required"),
    height: z.number().positive("Height must be a positive number"),
    weight: z.number().positive("Weight must be a positive number"),
    location: z.string().min(2, "Location is required"),
    language: z.string().min(2, "Language is required"),
    emergencyContact: z.string().optional(),
    preferredCommunicationMode: z.enum(['APP', 'SMS', 'VOICE', 'EMAIL', 'WHATSAPP']),
});