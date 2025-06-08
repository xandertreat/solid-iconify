import type { JSX } from "solid-js";
import type { IFilterXSSOptions } from "xss";
import type LRUCache from "../lib/lru";

/* ───────── helpers ───────── */
type Brand<T, B extends string> = T & { readonly __brand: B };

type NonEmptyArray<T> = readonly [T, ...T[]];
export type NonEmptyString = Brand<string, "isNonEmptyString">;
export type PositiveInteger = Brand<number, "isPositiveInteger">;

export type SanitizeToggle =
	| {
			readonly SANITIZE: true;
			readonly SANITIZE_OPTIONS?: Partial<IFilterXSSOptions>;
	  }
	| { readonly SANITIZE?: false; readonly SANITIZE_OPTIONS?: never };

/* ───────── types ───────── */
export type IconifySpecifier = string;
export type IconifyFlip = "horizontal" | "vertical" | "horizontal,vertical";
export type IconifyRotate = "90deg" | "180deg" | "270deg";

/* ───────── shapes ───────── */
export interface IconifyMockParams {
	flip?: IconifyFlip;
	rotate?: IconifyRotate;
	box?: boolean;
}

export interface IconifyVisibility {
	showLoading?: boolean;
	showError?: boolean;
}

export interface IconifyIconProps
	extends JSX.SvgSVGAttributes<SVGSVGElement>,
		IconifyVisibility,
		IconifyMockParams {
	icon: IconifySpecifier;
}

/* ───────── data structures ───────── */
export type IconifyData = Promise<string>;
export type IconifyCollectionCache = LRUCache<string, IconifyIconCache>;
export type IconifyIconCache = LRUCache<string, IconifyData>;

export type IconifyIconCacheSize =
	| { strategy: "unlimited" }
	| { strategy: "grow"; initial: PositiveInteger }
	| { strategy: "static"; limit: PositiveInteger }
	| PositiveInteger; // infer to be static
export type IconifyCollectionCacheSize =
	| IconifyIconCacheSize
	| { strategy: "no-cache" };

/* ───────── configuration ───────── */
export type IconifyConfig = Readonly<{
	ICONIFY_API: NonEmptyString | URL | NonEmptyArray<NonEmptyString | URL>;
	REQUEST_OPTIONS: RequestInit;
	CACHE_SIZE: IconifyCollectionCacheSize;
	COLLECTION_SIZE: IconifyIconCacheSize;
	DEFAULT_SVG_ATTRIBUTES: Partial<JSX.SvgSVGAttributes<SVGSVGElement>>;
	SVG_TITLE: NonEmptyString | boolean;
	SHOW_LOADING_DEFAULT: boolean;
	SHOW_ERROR_DEFAULT: boolean;
}> &
	SanitizeToggle;
