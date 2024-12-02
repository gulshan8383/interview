import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons
import img1 from "../../../Assest/chat1.png";
import img2 from "../../../Assest/chat2.png";
import img3 from "../../../Assest/chat3.png";

const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full h-[33rem] relative bg-gray-100 overflow-hidden">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        transitionTime={1000}
        showStatus={false}
        showIndicators={true}
        onChange={handleSlideChange}
        swipeable
        dynamicHeight={false} // Disable dynamic height adjustment, to prevent size changes on slide switch
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
            >
              <FaChevronLeft size={20} />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
            >
              <FaChevronRight size={20} />
            </button>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index) => (
          <button
            key={index}
            onClick={onClickHandler}
            className={`w-3 h-3 rounded-full mx-1 ${
              isSelected ? "bg-blue-600" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        )}
      >
        {/* Slide 1 */}
        <div
          className={`transition-opacity duration-1000 ${
            currentSlide === 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img1}
            alt="Slide 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Slide 2 */}
        <div
          className={`transition-opacity duration-1000 ${
            currentSlide === 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img2}
            alt="Slide 2"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Slide 3 */}
        <div
          className={`transition-opacity duration-1000 ${
            currentSlide === 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img3}
            alt="Slide 3"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
