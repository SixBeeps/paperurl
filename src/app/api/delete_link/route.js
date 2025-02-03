// Relinquish ownership of a link

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { success, failure } from "@/util/simple_responses";

export async function GET(req) {
	const prisma = new PrismaClient();
	const params = req.nextUrl.searchParams;
	
	// Get query parameters
	const from = params.get("from");
	const providedKey = params.get("key");

	// If no URL is provided, return an error
	if (!from) {
		prisma.$disconnect();
		return failure("No source URL provided");
	}

	// If the URL is not in the database, return an error
	const existing = await prisma.link.findUnique({
		where: {
			shortUrl: from,
		},
	});

	if (!existing) {
		prisma.$disconnect();
		return failure("Link not found");
	}

	// If the key is invalid, return an error
	if (existing.key !== providedKey) {
		prisma.$disconnect();
		return failure("Invalid key");
	}

	// Update the link
	await prisma.link.delete({
		where: {
			shortUrl: from,
		},
	});

	// Remove link from cookie
	const cookieStore = cookies()
	const cookieArray = cookieStore.get("links")?.value || '[]'
	let cookieLinks;

	try {
		cookieLinks = JSON.parse(cookieArray)
	} catch (e) {
		cookieLinks = []
	}

	// Add the new link to the cookie array
	cookieLinks.splice(cookieLinks.findIndex((link) => link.from === from), 1)
	cookieStore.set("links", JSON.stringify(cookieLinks), {
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 400), // Chrome has a 400 day limit on cookies
	})

	prisma.$disconnect();
	return success("Link deleted");
}