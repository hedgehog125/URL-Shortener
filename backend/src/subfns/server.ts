import type { Env } from "../types.js";

import type { Express } from "express";
import express from "express";

import { miscEndpoints } from "../endpoints/endpoints.js";

export function configureExpress(): Express {
	const app = express();

	return app;
}
export function registerEndpoints(app: Express, env: Env): void {
	app.use("/v1", miscEndpoints());
}
export function startServer(app: Express, env: Env): void {
	app.listen(env.PORT, () => {
		console.log(`Listening on port ${env.PORT}`);
	});
}
