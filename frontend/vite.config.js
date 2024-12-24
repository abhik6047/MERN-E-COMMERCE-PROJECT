import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	compilerOptions: {
		module: "commonjs",
		target: "es2016",
		jsx: "preserve",
		baseUrl: "./src",
		checkJs: true,
	},
	exclude: ["node_modules", "**/node_modules/*"],
	server: {
		port: 5173,
	},
});
