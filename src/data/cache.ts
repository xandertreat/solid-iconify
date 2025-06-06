import LRUCache from "~/lib/lru.js";

const cache: LRUCache<string, Promise<IconData>> | undefined = new LRUCache<
	string,
	Promise<IconData>
>(DEFAULTS.CACHE_SIZE as number);
