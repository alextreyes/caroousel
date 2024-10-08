import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";

/** Carousel: displays images and arrows to navigate through them
 * 
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * App --> Carousel --> Card
 */
function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);

  const currCard = photos[currCardIdx];
  const total = photos.length;

  // Increment currCardIdx state by 1
  function goForward() {
    if (currCardIdx < total - 1) {
      setCurrCardIdx(currCardIdx + 1);
    }
  }

  // Decrement currCardIdx state by 1
  function goBackward() {
    if (currCardIdx > 0) {
      setCurrCardIdx(currCardIdx - 1);
    }
  }

  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        {/* Hide left arrow if on the first image */}
        <i
          className="bi bi-arrow-left-circle"
          onClick={goBackward}
          style={{ visibility: currCardIdx === 0 ? 'hidden' : 'visible' }} // Hide left arrow
        />
        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        {/* Hide right arrow if on the last image */}
        <i
          className="bi bi-arrow-right-circle"
          onClick={goForward}
          style={{ visibility: currCardIdx === total - 1 ? 'hidden' : 'visible' }} // Hide right arrow
        />
      </div>
    </div>
  );
}

export default Carousel;
