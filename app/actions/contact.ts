'use server'


import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const contactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function submitContactForm(formData: FormData) {
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
    }

    const result = contactSchema.safeParse(data)

    if (!result.success) {
        return { error: result.error.flatten().fieldErrors }
    }

    try {
        await prisma.contactMessage.create({
            data: {
                name: result.data.name,
                email: result.data.email,
                subject: result.data.subject,
                message: result.data.message,
            },
        })
        return { success: true }
    } catch (error) {
        console.error('Contact form error:', error)
        return { error: 'Failed to send message. Please try again later.' }
    }
}
