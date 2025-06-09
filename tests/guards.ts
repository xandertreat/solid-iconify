import type { IconifySpecifier } from "../src/types";

export const iconifySpecifierPattern =
	/^[a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isIconifySpecifier(spec: unknown): spec is IconifySpecifier {
	return typeof spec === "string" && iconifySpecifierPattern.test(spec);
}
