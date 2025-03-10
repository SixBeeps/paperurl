// Create a new link

import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { success, failure } from '@/util/simple_responses'
import isUrlValid from '@/util/url_valid'

// Helper function to generate a random string of characters
function randomCharacters(length) {
	let result = ''
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length))
	}
	return result
}

export async function GET(req) {
	const prisma = new PrismaClient()
	const params = req.nextUrl.searchParams

	// Helper function to generate a random URL that doesn't already exist
	const generateUrl = async () => {
		let result;
		do {
			result = randomCharacters(6)
			console.log(result)
		} while (await prisma.link.findUnique({ where: { shortUrl: result } }) !== null)

		return result
	}

	// Get query parameters
	const from = params.get("from") || await generateUrl();
	const to = params.get("to")
	const key = randomCharacters(32)
	const friendly = params.get("friendly") || 'Untitled link'

	// If no URL is provided, return an error
	if (!to) {
		prisma.$disconnect()
		return failure("No destination URL provided")
	}

	// If URL is invalid, return an error
	if (!isUrlValid(to)) {
		prisma.$disconnect()
		return failure("Invalid destination URL provided, please include http:// or https://")
	}

	// If the URL is already in the database, return an error
	if (await prisma.link.findUnique({ where: { shortUrl: from } })) {
		prisma.$disconnect()
		return failure("Short URL already taken")
	}

	// Create the new link
	const link = await prisma.link.create({
		data: {
			originalUrl: to,
			shortUrl: from,
			friendlyName: friendly,
			key,
		},
	})

	// Initialize the cookie array if it doesn't exist or is invalid
	const cookieStore = cookies()
	const cookieArray = cookieStore.get("links")?.value || '[]'
	let cookieLinks;

	try {
		cookieLinks = JSON.parse(cookieArray)
	} catch (e) {
		cookieLinks = []
	}

	// Add the new link to the cookie array
	cookieLinks.push({
		from,
		to,
		friendly,
		key
	})
	cookieStore.set("links", JSON.stringify(cookieLinks), {
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 400), // Chrome has a 400 day limit on cookies
	})

	// Return the new link
	prisma.$disconnect()
	return success(link)
}