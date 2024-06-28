import { Router } from "express";

export function miscEndpoints(): Router {
	const router = Router();
	registerHealth(router);

	return router;
}
function registerHealth(router: Router): void {
	router.get("/health", (req, res) => {
		res.send("");
	});
}
