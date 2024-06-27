import { loadEnvironmentVariables } from "./src/subfns/env.js";
import {
	configureExpress,
	registerEndpoints,
	startServer,
} from "./src/subfns/server.js";

function main() {
	const env = loadEnvironmentVariables();
	const app = configureExpress();
	registerEndpoints(app, env);
	startServer(app, env);
}
main();
