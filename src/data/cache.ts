import LRUCache from "~/lib/lru.js";
import { ICONIFY_CONFIGURATION } from "./config";
import { createEffect } from "solid-js";

let CACHE: IconifyCollectionCache;
createEffect(() => {CACHE = new LRUCache(ICONIFY_CONFIGURATION.COLLECTION_LIMIT, CACHE);})