import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

// Smoke Test: checks if the Card component renders without crashing.
test("renders without crashing", () => {
  render(<Card caption="Test Caption" src="test.jpg" currNum={1} totalNum={3} />);
});

// Snapshot Test: takes a snapshot of the component and compares it to previous snapshots.
test("matches snapshot", () => {
  const { asFragment } = render(<Card caption="Test Caption" src="test.jpg" currNum={1} totalNum={3} />);
  expect(asFragment()).toMatchSnapshot();
});
