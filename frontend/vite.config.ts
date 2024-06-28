import react from "@vitejs/plugin-react";
import { copyFile } from "fs/promises";
import { defineConfig } from "vite";

const OUT_DIR = "build";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		/*
		{
			name: "output-404-html",
			apply: "build",
			async buildEnd(err) {
				if (err != null) return;

				await copyFile(`${OUT_DIR}/index.html`, `${OUT_DIR}/404.html`);
			},
		},
		*/
	],
	base: process.env.PUBLIC_URL,
	build: {
		outDir: OUT_DIR,
	},
});
