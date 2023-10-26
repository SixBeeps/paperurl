// Helper function that determines if a URL is valid
export default function isUrlValid(url) {
	return url.startsWith("http://") || url.startsWith("https://")
}