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
	drop_console: !watching, // no console prints for prod.
});

export default defineConfig((config) => {
	const watching = Boolean(config.watch);
	const solidPresetOptions = generateSolidPresetOptions(watching);
	const parsedOptions = preset.parsePresetOptions(solidPresetOptions, watching);

	if (!watching) {
		const packageFields = preset.generatePackageExports(parsedOptions);
		preset.writePackageJson(packageFields);
	}

	const generated = preset
		.generateTsupOptions(parsedOptions)
		.map((buildCfg) => ({
			...buildCfg,
			name: pkg.name,
			bundle: true,
			minify: true,
			minifyIdentifiers: true,
			minifySyntax: true,
			minifyWhitespace: true,
			makeAbsoluteExternalsRelative: true,
			treeshake: true,
			shims: true,
			clean: true,
		}));

	return generated;
});
