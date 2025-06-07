import type { JSX } from "solid-js";
import type { IFilterXSSOptions } from "xss";
import type LRUCache from "./lib/lru";

/* ───────── helpers ───────── */
type NonEmptyString = `${string}${string}`;

type Alphabetical =
	| "a"
	| "b"
	| "c"
	| "d"
	| "e"
	| "f"
	| "g"
	| "h"
	| "i"
	| "j"
	| "k"
	| "l"
	| "m"
	| "n"
	| "o"
	| "p"
	| "q"
	| "r"
	| "s"
	| "t"
	| "u"
	| "v"
	| "w"
	| "x"
	| "y"
	| "z";

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type ValidCharacter = Alphabetical | Digit | "-";

type ValidSegment<S extends NonEmptyString> = S extends `${infer F}${infer R}`
	? F extends ValidCharacter
		? R extends ""
			? S
			: ValidSegment<R>
		: never
	: never;

type NonEmptyArray<T> = readonly [T, ...T[]];

type NonNegativeInteger<T extends number> = number extends T
	? never
	: `${T}` extends `-${string}` | `${string}.${string}`
		? never
		: T;

type SanitizeToggle =
	| {
			readonly SANITIZE: true;
			readonly SANITIZE_OPTIONS?: Partial<IFilterXSSOptions>;
	  }
	| {
			readonly SANITIZE?: false | null | undefined;
			readonly SANITIZE_OPTIONS?: never;
	  };

declare global {
	/* ───────── types ───────── */

	type IconifySpecifier =
		`${ValidSegment<ValidCharacter>}:${ValidSegment<ValidCharacter>}`;
	type IconifySize = number | "auto" | "unset" | "none";
	type IconifyFlip = "horizontal" | "vertical" | "horizontal,vertical";
	type IconifyRotate = "90deg" | "180deg" | "270deg";

	/* ───────── shapes ───────── */

	interface IconifyApiParams {
		icon: IconifySpecifier | string;
		color?: string;
		flip?: IconifyFlip;
		size?: IconifySize;
		rotate?: IconifyRotate;
		download?: boolean;
		box?: boolean;
	}

	interface IconifyVisibility {
		showLoading?: boolean;
		showError?: boolean;
	}

	interface IconifyIconProps
		extends JSX.SvgSVGAttributes<SVGSVGElement>,
			IconifyApiParams,
			IconifyVisibility {}

	/* ───────── data structures ───────── */
	type IconifyCollectionCache = LRUCache<ValidSegment<ValidCharacter>, IconifyIconCache>
	type IconifyIconCache = LRUCache<ValidSegment<ValidCharacter>, Promise<NonEmptyString>>

	/* ───────── configuration ───────── */

	type IconifyConfig = Readonly<{
		ICONIFY_API?: string | URL | NonEmptyArray<string | URL>;
		REQUEST_OPTIONS?: RequestInit;
		COLLECTION_LIMIT?: NonNegativeInteger | "grow" | "unlimited" | "no-cache";
		ICON_LIMIT?: NonNegativeInteger | "grow" | "unlimited" | "no-cache";
		DEFAULT_SVG_ATTRIBUTES?: Partial<JSX.SvgSVGAttributes<SVGSVGElement>>;
		SVG_TITLE?: string | boolean | null | undefined;
		SHOW_LOADING_DEFAULT?: boolean;
		SHOW_ERROR_DEFAULT?: boolean;
	}> &
		SanitizeToggle;

	type IconifyConfigDefaults = Required<IconifyConfig>;
}
