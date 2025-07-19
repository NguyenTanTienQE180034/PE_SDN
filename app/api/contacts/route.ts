import { NextRequest, NextResponse } from "next/server";
import { getContacts, createContact } from "@/lib/contacts";
import { ContactFormSchema } from "@/lib/types";

export async function GET() {
    try {
        const contacts = await getContacts();
        return NextResponse.json({
            success: true,
            data: contacts,
        });
    } catch (error) {
        console.error("GET /api/contacts error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch contacts",
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate the request body
        const validationResult = ContactFormSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid contact data",
                    details: validationResult.error.issues,
                },
                { status: 400 }
            );
        }

        const contact = await createContact(validationResult.data);

        return NextResponse.json(
            {
                success: true,
                data: contact,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("POST /api/contacts error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to create contact",
            },
            { status: 500 }
        );
    }
}
