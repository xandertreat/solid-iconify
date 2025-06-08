import type {
	IconifySpecifier,
	NonEmptyString,
	PositiveInteger,
} from "./global";

export function isNonEmptyString(value: unknown): value is NonEmptyString {
	return typeof value === "string" && value !== "" && value.length > 0;
}

/**
 * Type guard that checks if a value is a positive integer.
 * @param value The value to check.
 * @returns `true` if the value is a number that is an integer and is > 0.
 */
export function isPositiveInteger(value: unknown): value is PositiveInteger {
	return typeof value === "number" && Number.isInteger(value) && value > 0;
}

export const iconifySpecifierPattern =
	/^[a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const toSpecifier = (s: string) =>
	s.normalize().trim().toLowerCase() as IconifySpecifier;

export function isIconifySpecifier(spec: unknown): spec is IconifySpecifier {
	return isNonEmptyString(spec) && iconifySpecifierPattern.test(spec);
}
