// Types //
export type LRUStrategy = "static" | "grow" | "unlimited";

export type LRUOptions =
	| { strategy: "static"; limit: number }
	| { strategy: "grow"; initial?: number }
	| { strategy: "unlimited" };

// Cache
class LRUCache<K, V> implements Iterable<[K, V]> {
	private cache: Map<K, V>;
	private readonly strategy: LRUStrategy;
	capacity: number;

	constructor(cap: number | LRUOptions, entries?: Iterable<[K, V]>) {
		if (typeof cap === "number") {
			this.strategy = "static";
			this.capacity = Math.abs(cap);
		} else {
			this.strategy = cap.strategy;
			switch (cap.strategy) {
				case "unlimited":
					this.capacity = Number.POSITIVE_INFINITY - 1;
					break;
				case "grow":
					this.capacity = Math.max(1, cap.initial ?? 1);
					break;
				case "static":
					this.capacity = Math.abs(cap.limit);
					break;
			}
		}

		if (
			(!Number.isInteger(this.capacity) &&
				this.capacity !== Number.POSITIVE_INFINITY) ||
			this.capacity <= 0
		) {
			throw new TypeError("invalid capacity");
		}

		this.cache = new Map(entries);
		if (this.strategy === "static")
			while (this.cache.size > this.capacity) {
				this.cache.delete(this.cache.keys().next().value as K);
			}
	}
	get size(): number {
		return this.cache.size;
	}
	get(key: K): V | undefined {
		const value = this.cache.get(key);
		if (value === undefined) return undefined;
		this.cache.delete(key);
		this.cache.set(key, value);
		return value;
	}
	set(key: K, value: V): this {
		if (this.cache.has(key)) {
			this.cache.delete(key);
		} else if (this.cache.size >= this.capacity) {
			if (this.strategy === "grow") {
				this.capacity *= 2;
			} else if (this.strategy !== "unlimited") {
				this.cache.delete(this.cache.keys().next().value as K);
			}
		}
		this.cache.set(key, value);
		return this;
	}
	delete(key: K): V | undefined {
		const value = this.cache.get(key);
		if (value !== undefined) this.cache.delete(key);
		return value;
	}
	entries(): IterableIterator<[K, V]> {
		return this.cache.entries();
	}
	[Symbol.iterator](): IterableIterator<[K, V]> {
		return this.entries();
	}
}

export default LRUCache;
