import { expect, test } from "vitest";
import { render } from "@solidjs/testing-library";

import { Demo } from "./demo";

// TODO: implement and create tests
test("renders svg", async () => {
	const { getByTitle } = render(<Demo />);
	const svg = getByTitle("Icon");
	expect(svg).toBeInstanceOf(SVGSVGElement);
});
