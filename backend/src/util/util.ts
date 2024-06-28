import { randomInt } from "crypto";
import type { Response } from "express";

export function generateUrlId(): string {
	const characters =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";

	return Array.from(
		{ length: 12 },
		() => characters[randomInt(characters.length)],
	).join("");
}
export function send500(err: Error, res: Response): void {
	console.log(`Internal error:\n${err.message}\n\nStack:\n${err.stack}`);
	res.status(500).json({ errors: [{ code: 500 }] });
}
