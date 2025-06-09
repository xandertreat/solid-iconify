import LRUCache, { type LRUOptions } from "~/lib/lru.js";
import type {
	IconifyCollectionCache,
	IconifyData,
	IconifyIconCache,
} from "~/types";
import { ICONIFY_CONFIGURATION } from "./config";

let iconifyCache: IconifyCollectionCache | undefined;

function createCollectionCache(prev?: IconifyIconCache): IconifyIconCache {
	const cfg = ICONIFY_CONFIGURATION.CACHE;
	let lruOptions: LRUOptions;

	if (typeof cfg === "number") lruOptions = { strategy: "grow", initial: cfg };
	else if (cfg.strategy === "no-cache")
		throw new Error(
			"[solid-iconify] ERROR - Attempting to cache with 'no-cache' strategy",
		);
	else lruOptions = cfg;

	return new LRUCache(lruOptions, prev);
}

export function configureCache() {
	const cfg = ICONIFY_CONFIGURATION.CACHE;
	if (typeof cfg === "object" && cfg.strategy === "no-cache") return;

	if (iconifyCache)
		iconifyCache = new Map(
			[...iconifyCache].map(([collection, iconCache]) => [
				collection,
				createCollectionCache(iconCache),
			]),
		);
	else iconifyCache = new Map();
}

export const getCacheIcon = (collection: string, icon: string) =>
	iconifyCache?.get(collection)?.get(icon);

export function setCacheIcon(
	collection: string,
	icon: string,
	data: Promise<IconifyData>,
) {
	if (!iconifyCache?.get(collection))
		iconifyCache?.set(collection, createCollectionCache());
	return iconifyCache?.get(collection)?.set(icon, data);
}

export const delCacheIcon = (collection: string, icon: string) =>
	iconifyCache?.get(collection)?.delete(icon);
