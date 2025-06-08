import { defineConfig } from "tsup";
import * as preset from "tsup-preset-solid";
import pkg from "./package.json";

const generateSolidPresetOptions = (
	watching: boolean,
): preset.PresetOptions => ({
	entries: [
		{
			// entries with '.tsx' extension will have `solid` export condition generated
			entry: "src/index.tsx",
		},
	],
	drop_console: !watching, // remove all `console.*` calls and `debugger` statements in prod builds
	cjs: false,
	out_dir: "dist/index",
});

export default defineConfig((config) => {
	const watching = !!config.watch;
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
			sourcemap: true,
		}));

	return generated;
});
