import { defineConfig } from "tsdown";

export default defineConfig([
	{
		entry: ["./src/index.ts"],
		tsconfig: "./tsconfig.json",
		platform: "neutral",
		treeshake: true,
		unused: true,
		dts: true,
		minify: true,
		shims: true,
	},
]);
