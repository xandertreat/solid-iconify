import { expect, test } from "vitest";
import { render } from "@solidjs/testing-library";

import { Uncompiled } from "./before";
import { Compiled } from "./bundled";

// TODO: implement and create tests
test("renders svg", async () => {
	const { getByTitle } = render(<Uncompiled />);
	const svg = getByTitle("Icon");
	expect(svg).toBeInstanceOf(SVGSVGElement);
});

test("renders svg (bundled)", async () => {
	const { getByTitle } = render(<Compiled />);
	const svg = getByTitle("Icon");
	expect(svg).toBeInstanceOf(SVGSVGElement);
});
