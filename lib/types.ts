import { z } from "zod";

export const ContactGroups = ["Friends", "Work", "Family", "Other"] as const;
export type ContactGroup = (typeof ContactGroups)[number];

export const ContactSchema = z.object({
    _id: z.string().optional(),
    name: z
        .string()
        .min(1, "Name is required")
        .max(100, "Name must be less than 100 characters"),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z
        .string()
        .optional()
        .refine((val) => {
            if (!val) return true;
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            return phoneRegex.test(val.replace(/[\s\-\(\)]/g, ""));
        }, "Please enter a valid phone number"),
    group: z.enum(ContactGroups).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type Contact = z.infer<typeof ContactSchema>;
export const ContactFormSchema = ContactSchema.omit({
    _id: true,
    createdAt: true,
    updatedAt: true,
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface ContactsResponse extends ApiResponse {
    data: Contact[];
}

export interface ContactResponse extends ApiResponse {
    data: Contact;
}
