// Simple JSON-based responses for Next.js
import { NextResponse } from "next/server";

export function success(data) {
	return NextResponse.json({
		status: "success",
		data,
	});
}

export function failure(data) {
	return NextResponse.json({
		status: "failure",
		data,
	});
}