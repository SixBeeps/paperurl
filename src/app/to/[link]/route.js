// Redirect to route

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { failure } from "@/util/simple_responses";

export async function GET(req, context) {
	const prisma = new PrismaClient();

	// Check if the link exists
	const link = await prisma.link.findUnique({
		where: {
			shortUrl: context.params.link,
		},
	});

	// If it doesn't, return a failure
	if (!link) {
		prisma.$disconnect();
		return failure("Link not found");
	}

	// If it does, update visit counter and redirect to the original URL
	await prisma.link.update({
		where: {
			shortUrl: context.params.link,
		},
		data: {
			visits: link.visits + 1,
		},
	});
	prisma.$disconnect();
	return NextResponse.redirect(link.originalUrl);
}