import type { JSX } from "solid-js";
import type { IFilterXSSOptions } from "xss";

/* ───────── helpers ───────── */

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

type ValidSegment<S extends string> = S extends `${infer F}${infer R}`
	? F extends ValidCharacter
		? R extends ""
			? S
			: ValidSegment<R>
		: never
	: never;

type NonEmptyArray<T> = readonly [T, ...T[]];

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

	interface IconData {
		attributes: Partial<JSX.SvgSVGAttributes<SVGSVGElement>>;
		vector: string;
	}

	/* ───────── configuration ───────── */

	type IconifyConfig = Readonly<{
		DEFAULT_SVG_ATTRIBUTES?: Partial<JSX.SvgSVGAttributes<SVGSVGElement>>;
		SVG_TITLE?: boolean;
		SHOW_LOADING_DEFAULT?: boolean;
		SHOW_ERROR_DEFAULT?: boolean;
		REQUEST_OPTIONS?: RequestInit;
		CACHE_SIZE?: number | "unlimited" | "no-cache";
		ICONIFY_API: string | NonEmptyArray<string>;
	}> &
		SanitizeToggle;

	type IconifyConfigDefaults = Required<IconifyConfig>;
}
