/**
 * A Least Recently Used (LRU) Cache implementation
 * @template K The type of the keys stored in the cache
 * @template V The type of the values stored in the cache
 */
export default class LRUCache<K, V> implements Iterable<[K, V]> {
	readonly capacity: number;
	private readonly cache: Map<K, V>;

	/**
	 * Creates a new LRU Cache
	 * @param capacity Maximum number of entries to store in the cache
	 * @param entries Optional initial entries to populate the cache with
	 * @throws {TypeError} If capacity is not a positive integer
	 */
	constructor(capacity = 128, entries?: Iterable<[K, V]>) {
		if (!Number.isInteger(capacity) || capacity <= 0) {
			throw new TypeError("capacity must be a positive integer");
		}
		this.capacity = capacity;
		this.cache = new Map(entries);
	}

	/**
	 * Retrieves an item from the cache and marks it as most recently used
	 * @param key The key to look up
	 * @returns The value associated with the key, or undefined if not found
	 */
	get(key: K): V | undefined {
		const value = this.cache.get(key);
		if (value === undefined) return undefined;
		this.cache.delete(key);
		this.cache.set(key, value);
		return value;
	}

	/**
	 * Retrieves an item from the cache without updating its position
	 * @param key The key to look up
	 * @returns The value associated with the key, or undefined if not found
	 */
	peek(key: K): V | undefined {
		return this.cache.get(key);
	}

	/**
	 * Sets a value in the cache. If the cache is at capacity, removes the least recently used item
	 * @param key The key to set
	 * @param value The value to store
	 * @returns The cache instance for chaining
	 */
	set(key: K, value: V): this {
		if (this.cache.has(key)) {
			this.cache.delete(key);
		} else if (this.cache.size === this.capacity) {
			const lruKey = this.cache.keys().next().value as K;
			this.cache.delete(lruKey);
		}
		this.cache.set(key, value);
		return this;
	}

	/**
	 * Removes an item from the cache
	 * @param key The key to remove
	 * @returns The removed value, or undefined if the key was not found
	 */
	delete(key: K): V | undefined {
		const val = this.cache.get(key);
		if (val !== undefined) this.cache.delete(key);
		return val;
	}

	/**
	 * Checks if a key exists in the cache
	 * @param key The key to check
	 * @returns True if the key exists, false otherwise
	 */
	has(key: K): boolean {
		return this.cache.has(key);
	}

	/** Removes all items from the cache */
	clear(): void {
		this.cache.clear();
	}

	/** Gets the current number of items in the cache */
	get size(): number {
		return this.cache.size;
	}

	/** Returns an iterator over the cache's keys */
	keys(): IterableIterator<K> {
		return this.cache.keys();
	}

	/** Returns an iterator over the cache's values */
	values(): IterableIterator<V> {
		return this.cache.values();
	}

	/** Returns an iterator over the cache's entries */
	entries(): IterableIterator<[K, V]> {
		return this.cache.entries();
	}

	/**
	 * Implements the iterable protocol for the cache
	 * @returns An iterator over the cache's entries
	 */
	[Symbol.iterator](): IterableIterator<[K, V]> {
		return this.entries();
	}

	/**
	 * Converts the cache to a JSON-serializable array of entries
	 * @returns An array of key-value pairs
	 */
	toJSON(): [K, V][] {
		return [...this.cache.entries()];
	}
}
