import { Router } from "express";

export function miscEndpoints(): Router {
	const router = Router();
	health(router);

	return router;
}
function health(router: Router): void {
	router.get("/health", (req, res) => {
		res.send("");
	});
}
