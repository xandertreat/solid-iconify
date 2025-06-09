import { expect, test } from "vitest";
import type { IconifyFlip, IconifyRotate } from "../../src/types";
import { iconifySpecifierPattern } from "../guards";

// Pattern Tests
test("iconifySpecifierPattern validates correct icon names", () => {
	const validIcons = [
		"mdi:account",
		"fa:user",
		"simple-icons:javascript",
		"carbon:accessibility",
		"ri:24-hours-fill",
		"octicon:alert-16",
		"custom:my-icon-123",
	];

	for (const icon of validIcons) {
		expect(iconifySpecifierPattern.test(icon)).toBe(true);
	}
});

test("iconifySpecifierPattern rejects invalid icon names", () => {
	const invalidIcons = [
		"", // empty string
		"mdi", // mission separator + icon
		":account", // missing collection
		"mdi:", // missing icon
		"mdi::account", // double separator
		"MDI:account", // uppercase collection not allowed
		"mdi:Account", // uppercase icon not allowed
		"mdi:account!", // invalid character
		"mdi:account.svg", // file extension not allowed
		"mdi/account", // wrong separator
		"-mdi:account", // collection cannot start with hyphen
		"mdi:-account", // icon cannot start with hyphen
		"mdi:account-", // cannot end with hyphen
		"@mdi:account", // special characters not allowed
		"mdi:account@2x", // special characters not allowed
		"mdi:account space", // spaces not allowed
	];

	for (const icon of invalidIcons) {
		expect(iconifySpecifierPattern.test(icon)).toBe(false);
	}
});

// Derived Types Tests
test("IconifyFlip type validation", () => {
	const validFlips = ["horizontal", "vertical", "horizontal,vertical"] as const;
	const invalidFlips = ["diagonal", "both", "h,v", ""];

	for (const flip of validFlips) {
		// TypeScript compilation validates this
		const _testFlip: IconifyFlip = flip;
		expect(_testFlip).toBe(flip);
	}

	for (const flip of invalidFlips) {
		expect(validFlips).not.toContain(flip);
	}
});

test("IconifyRotate type validation", () => {
	const validRotates = ["90deg", "180deg", "270deg"] as const;
	const invalidRotates = ["45deg", "360deg", "0", "-90deg"];

	for (const rotate of validRotates) {
		// TypeScript compilation validates this
		const _testRotate: IconifyRotate = rotate;
		expect(_testRotate).toBe(rotate);
	}

	for (const rotate of invalidRotates) {
		expect(validRotates).not.toContain(rotate);
	}
});
