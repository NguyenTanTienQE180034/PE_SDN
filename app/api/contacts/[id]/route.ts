import { NextRequest, NextResponse } from "next/server";
import { getContactById, updateContact, deleteContact } from "@/lib/contacts";
import { ContactFormSchema } from "@/lib/types";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const contact = await getContactById(id);

        if (!contact) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Contact not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: contact,
        });
    } catch (error) {
        console.error("GET /api/contacts/[id] error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch contact",
            },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
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

        const contact = await updateContact(id, validationResult.data);

        return NextResponse.json({
            success: true,
            data: contact,
        });
    } catch (error) {
        console.error("PUT /api/contacts/[id] error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to update contact",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const success = await deleteContact(id);

        if (!success) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Contact not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: { message: "Contact deleted successfully" },
        });
    } catch (error) {
        console.error("DELETE /api/contacts/[id] error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to delete contact",
            },
            { status: 500 }
        );
    }
}
