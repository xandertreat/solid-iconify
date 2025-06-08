import { createStore } from "solid-js/store";
import type { IconifyConfig } from "~/types/global";
import defaults from "../json/defaults.json" with { type: "json" };

const DEFAULT_ICONIFY_CONFIGURATION = defaults as IconifyConfig;

const [ICONIFY_CONFIGURATION, setConfig] = createStore<IconifyConfig>(
	JSON.parse(JSON.stringify(DEFAULT_ICONIFY_CONFIGURATION)),
);

const configureIconify = (patch: Partial<IconifyConfig>): void =>
	setConfig({ ...ICONIFY_CONFIGURATION, ...patch } as Partial<IconifyConfig>);

export {
	DEFAULT_ICONIFY_CONFIGURATION,
	ICONIFY_CONFIGURATION,
	configureIconify,
};
