import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
    return name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export function getGroupColor(group?: string): string {
    const colors = {
        Friends: "bg-blue-500",
        Work: "bg-green-500",
        Family: "bg-purple-500",
        Other: "bg-gray-500",
    };
    return colors[group as keyof typeof colors] || colors.Other;
}

export function formatPhoneNumber(phone?: string): string {
    if (!phone) return "";

    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
            6
        )}`;
    } else if (cleaned.length === 11 && cleaned.startsWith("1")) {
        return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(
            4,
            7
        )}-${cleaned.slice(7)}`;
    }

    return phone;
}
