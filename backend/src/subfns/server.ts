import type { Env } from "../types.js";

import cors from "cors";
import type { ErrorRequestHandler, Express, NextFunction } from "express";
import express from "express";

import type { DBClient } from "../db.js";
import { miscEndpoints } from "../endpoints/endpoints.js";
import { shortUrlEndpoints } from "../endpoints/shortUrl.js";

export function configureExpress(env: Env): Express {
	const app = express();
	app.use(
		cors({
			origin: env.CORS_ALLOWED_ORIGINS,
		}),
	);
	app.use(express.json());

	return app;
}
export function registerEndpoints(app: Express, db: DBClient, env: Env): void {
	app.use("/v1", miscEndpoints());
	app.use("/v1/short-url", shortUrlEndpoints(db));
}
export function startServer(app: Express, env: Env): void {
	app.listen(env.PORT, () => {
		console.log(`Listening on port ${env.PORT}`);
	});
}
