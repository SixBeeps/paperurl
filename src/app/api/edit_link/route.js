// Edit an existing link

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { success, failure } from "@/util/simple_responses";
import { isUrlValid } from "@/util/url_valid";

export async function GET(req) {
	const prisma = new PrismaClient();
	const params = req.nextUrl.searchParams;

	// Get query parameters
	const from = params.get("from");
	const to = params.get("to");
	const providedKey = params.get("key");

	// If no URL is provided, return an error
	if (!from) {
		prisma.$disconnect();
		return failure("No source URL provided");
	}

	// If destination URL is invalid, return an error
	if (!isUrlValid(to)) {
		prisma.$disconnect();
		return failure("Invalid destination URL provided, please include http:// or https://");
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
	const friendly = params.get("friendly") || existing.friendlyName;
	await prisma.link.update({
		where: {
			shortUrl: from,
		},
		data: {
			originalUrl: to,
			friendlyName: friendly,
		},
	});
}