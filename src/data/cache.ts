import { createEffect } from "solid-js";
import LRUCache, { type LRUOptions } from "~/lib/lru.js";
import type {
	IconifyCollectionCache,
	IconifyData,
	IconifyIconCache,
} from "~/types";
import { ICONIFY_CONFIGURATION } from "./config";

let iconifyCache: IconifyCollectionCache | undefined;

function createCollectionCache(prev?: IconifyIconCache): IconifyIconCache {
	const cfg = ICONIFY_CONFIGURATION.COLLECTION_SIZE;
	let cacheCfg: LRUOptions;

	if (typeof cfg === "number") cacheCfg = { strategy: "grow", initial: cfg };
	else cacheCfg = cfg;

	return new LRUCache(cacheCfg, prev);
}

function handleCacheSync() {
	const cfg = ICONIFY_CONFIGURATION.CACHE_SIZE;
	let cacheCfg: LRUOptions;

	if (typeof cfg === "number") cacheCfg = { strategy: "grow", initial: cfg };
	else if (cfg.strategy === "no-cache") return;
	else cacheCfg = cfg;

	if (iconifyCache)
		iconifyCache = new LRUCache(
			cacheCfg,
			[...iconifyCache].map(([collection, iconCache]) => [
				collection,
				createCollectionCache(iconCache),
			]),
		);
	else iconifyCache = new LRUCache(cacheCfg);
}

// sync cache to configuration
createEffect(handleCacheSync);

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
