declare global {
	namespace Express {
		interface Request {
			random: number;
		}
	}
}

export {};
