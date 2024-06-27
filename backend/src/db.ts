import type { Env } from "./types.js";

import knex from "knex";
import type { Knex } from "knex";

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
		return "";
	}
	async getStoredURL(id: string): Promise<string> {
		return "";
	}
}
