import type { Env } from "./types.js";

import knex from "knex";
import type { Knex } from "knex";

import { generateUrlId } from "./util/util.js";

const MAX_ID_RETRIES = 10;

export interface DBClient {
	storeURL(originalURL: string): Promise<string>;
	getStoredURL(id: string): Promise<string | null>;
}

export class PgDBClient implements DBClient {
	_db: Knex;

	constructor(env: Env) {
		this._db = knex({
			client: "pg",
			pool: {
				min: 0,
				idleTimeoutMillis: 30_000,
			},
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
	async getStoredURL(id: string): Promise<string | null> {
		let url: string | null;
		try {
			const row = await this._db("urls")
				.where({ id })
				.select("url")
				.first();
			// Knex returns undefined instead of null
			if (row == null) return null;

			url = row.url;
		} catch (err: any) {
			throw new Error(
				`DB error occurred when getting URL:\n${err.message}`,
			);
		}

		return url;
	}
}
