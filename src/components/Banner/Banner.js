import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute bottom-0 z-20 h-6 w-full bg-gradient-to-t from-gray-100 to-transparent sm:h-20 md:h-32 lg:h-40 xl:h-52" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
        showArrows={false}
      >
        <div>
          <img
            loading="lazy"
            src="https://i.ibb.co/nRJmFMg/Banner-1.jpg"
            alt="Banner 1 Thumbnail"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://i.ibb.co/TcYkBgb/Banner-2.jpg"
            alt="Banner 2 Thumbnail"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://i.ibb.co/Nxd1HVY/Banner-3.jpg"
            alt="Banner 3 Thumbnail"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
