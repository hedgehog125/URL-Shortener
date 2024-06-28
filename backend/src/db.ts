import type { Env } from "./types.js";

import knex from "knex";
import type { Knex } from "knex";

import { generateUrlId } from "./util/util.js";

const MAX_ID_RETRIES = 10;

export interface DBClient {
	storeURL(originalURL: string): Promise<string>;
	getStoredURL(id: string): Promise<string>;
}

export class PgDBClient implements DBClient {
	_db: Knex;

	constructor(env: Env) {
		this._db = knex({
			client: "pg",
			connection: env.DATABASE_URL,
		});
		this._db.migrate.latest(); // Async!
	}

	async storeURL(originalURL: string): Promise<string> {
		let urlId: string | null = null;
		for (let i = 0; i < MAX_ID_RETRIES; i++) {
			urlId = generateUrlId();

			try {
				await this._db("urls").insert({
					id: urlId,
					url: originalURL,
				});
			} catch (err: any) {
				if (err.constraint !== "urls_pkey") {
					throw new Error(
						`DB error occurred when storing URL:\n${err.message}`,
					);
				}
				urlId = null;
			}

			if (urlId != null) break;
		}

		if (urlId == null) {
			throw new Error("Couldn't find unique ID for URL.");
		}

		return urlId;
	}
	async getStoredURL(id: string): Promise<string> {
		return "";
	}
}
