import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";
import Icon from "../../src/index";

// TODO: implement and create tests
test("renders svg", async () => {
	const { getByTitle } = render(() => <Icon icon="mdi:account" />);
	const svg = getByTitle("Icon");
	expect(svg).toBeInstanceOf(SVGSVGElement);
});
