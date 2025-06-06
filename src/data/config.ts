import { createStore } from "solid-js/store";
import type { IFilterXSSOptions } from "xss";
import defaults from "../json/defaults.json" with { type: "json" };
import { createEffect } from "solid-js";

const DEFAULT_ICONIFY_CONFIGURATION = defaults as IconifyConfigDefaults;

const [ICONIFY_CONFIGURATION, setConfig] = createStore(
	JSON.parse(JSON.stringify(DEFAULT_ICONIFY_CONFIGURATION)),
);

createEffect(() => {});

const configureIconify = (patch: Partial<IconifyConfig>): void =>
	setConfig({ ...ICONIFY_CONFIGURATION, ...patch });

export default configureIconify;
export { DEFAULT_ICONIFY_CONFIGURATION, ICONIFY_CONFIGURATION };
