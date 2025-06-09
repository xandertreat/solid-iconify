import type { IconifyConfig } from "~/types";
import defaults from "../json/defaults.json" with { type: "json" };
import { configureCache } from "./cache";

export let ICONIFY_CONFIGURATION: IconifyConfig = defaults as IconifyConfig;

export function configureIconify (patch: Partial<IconifyConfig>) {
	ICONIFY_CONFIGURATION = { ...ICONIFY_CONFIGURATION, ...patch } as IconifyConfig;
	configureCache();
}
