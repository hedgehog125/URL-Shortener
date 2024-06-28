import { PgDBClient } from "./src/db.js";
import { loadEnvironmentVariables } from "./src/subfns/env.js";
import {
	configureExpress,
	registerEndpoints,
	startServer,
} from "./src/subfns/server.js";

function main() {
	const env = loadEnvironmentVariables();

	const db = new PgDBClient(env);
	const app = configureExpress();
	registerEndpoints(app, db, env);
	startServer(app, env);
}
main();
