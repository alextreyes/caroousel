import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// Smoke Test: checks if the Carousel component renders without crashing.
it("renders without crashing", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  expect(container).toBeInTheDocument();
});

// Test for clicking the right arrow
it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // Expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // Move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

// Snapshot Test: takes a snapshot of the Carousel component and compares it to previous snapshots.
it("matches snapshot", () => {
  const { asFragment } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
it("moves to the previous image when the left arrow is clicked", () => {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // Move to the second image using the right arrow
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Now expect the second image to show
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  // Click the left arrow to go back to the first image
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // Expect the first image to show again
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();});

// Test: checks if the left arrow is hidden on the first image
it("hides the left arrow when on the first image", () => {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // Expect the left arrow to be hidden
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).not.toBeVisible(); // Assert that the left arrow is not visible
});

// Test: checks if the right arrow is hidden on the last image
it("hides the right arrow when on the last image", async () => {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // Move to the last image using the right arrow
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow); // Move to the second image
  fireEvent.click(rightArrow); // Move to the third image (last image)

  // Expect the right arrow to be hidden
  const lastRightArrow = container.querySelector(".bi-arrow-right-circle");
  expect(lastRightArrow).not.toBeVisible(); // Assert that the right arrow is not visible
});