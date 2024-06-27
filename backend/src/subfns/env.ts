import type { Env } from "../types";

import { configDotenv } from "dotenv";

export function loadEnvironmentVariables(): Env {
	configDotenv({
		path: [".env.local", ".env"],
	});

	return {
		PORT: requireNumEnv("PORT"),
	};
}

function requireEnv(name: string): string {
	const value = process.env[name];
	if (value == null) {
		throw new Error(
			`Required environment variable "${name}" hasn't been specified.`,
		);
	}

	return value;
}
function requireStrArrEnv(name: string): string[] {
	return requireEnv(name).split(",");
}
function requireNumEnv(name: string): number {
	const parsed = Number(requireEnv(name));

	if (isNaN(parsed)) {
		throw new Error(
			`Couldn't parse environment variable ${name} into a number.`,
		);
	}
	return parsed;
}
