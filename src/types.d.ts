import type { JSX } from "solid-js";
import type { IFilterXSSOptions } from "xss";
import type LRUCache from "./lib/lru";

/* ───────── helpers ───────── */
type NonEmptyArray<T> = readonly [T, ...T[]];

export type SanitizeToggle =
	| {
			readonly SANITIZE: true;
			readonly SANITIZE_OPTIONS?: Partial<IFilterXSSOptions>;
	  }
	| {
			readonly SANITIZE?: false;
			readonly SANITIZE_OPTIONS?: never;
	  };

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

export interface IconifyIconProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
	icon: IconifySpecifier;
}

/* ───────── data structures ───────── */
export interface IconifyData {
	vBox: number[];
	body: string;
}
export type IconifyCollectionCache = Map<string, IconifyIconCache>;
export type IconifyIconCache = LRUCache<string, Promise<IconifyData>>;

export type IconifyCacheConfiguration =
	| { strategy: "no-cache" }
	| { strategy: "unlimited" }
	| { strategy: "grow"; initial: number }
	| { strategy: "static"; limit: number }
	| number; // infer to be static

/* ───────── configuration ───────── */
export type IconifyConfig = Readonly<{
	ICONIFY_API: string | URL | NonEmptyArray<string | URL>;
	REQUEST_OPTIONS: RequestInit;
	CACHE: IconifyCacheConfiguration;
}> &
	SanitizeToggle;
