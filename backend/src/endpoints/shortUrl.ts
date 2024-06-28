import { Router } from "express";
import { z } from "zod";

import type { DBClient } from "../db.js";
import { send500 } from "../util/util.js";

export function shortUrlEndpoints(db: DBClient): Router {
	const router = Router();
	registerPost(router, db);
	registerGet(router, db);

	return router;
}
function registerPost(router: Router, db: DBClient): void {
	const schema = z.object({
		url: z.string(),
	});

	router.post("/", async (req, res) => {
		const validated = schema.safeParse(req.body);
		if (!validated.success) {
			res.status(400).send();
			return;
		}

		let id: string;
		try {
			id = await db.storeURL(validated.data.url);
		} catch (err: any) {
			return send500(err, res);
		}
		const shortUrl = `/v1/short-url/${id}`;
		res.json({ id, shortUrl });
	});
}
function registerGet(router: Router, db: DBClient): void {
	router.get("/:id", async (req, res) => {
		let fullUrl: string | null;
		try {
			fullUrl = await db.getStoredURL(req.params.id);
		} catch (err: any) {
			return send500(err, res);
		}

		if (fullUrl == null) {
			res.status(404).send();
			return;
		}

		res.json({ fullUrl });
	});
}
