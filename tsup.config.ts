import { defineConfig } from "tsup";
import * as preset from "tsup-preset-solid";
import pkg from "./package.json";

const generateSolidPresetOptions = (
	watching: boolean,
): preset.PresetOptions => ({
	entries: [
		{
			dev_entry: false,
			server_entry: false,
			entry: "src/index.tsx",
		},
	],
	cjs: false,
	drop_console: !watching, // no console prints for prod
});

export default defineConfig((config) => {
	const watch = !!config.watch;
	const solidPresetOptions = generateSolidPresetOptions(watch);
	const parsedOptions = preset.parsePresetOptions(solidPresetOptions, watch);

	if (!watch) {
		const packageFields = preset.generatePackageExports(parsedOptions);
		preset.writePackageJson(packageFields);
	}

	const generated = preset.generateTsupOptions(parsedOptions).map((cfg) => ({
		...cfg,
		tsconfig: "./tsconfig.json",
		external: Object.keys(pkg.peerDependencies),
		dts: !watch,
		clean: !watch,
		treeshake: true,
		splitting: true,
		cjsInterop: true,
		platform: "browser",

		skipNodeModulesBundle: true,
		shims: true,

		minify: !watch,
		minifyIdentifiers: !watch,
		minifySyntax: !watch,
		minifyWhitespace: !watch,
		bundle: true,
	}));

	return generated;
});
