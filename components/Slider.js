import Image from "next/image";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { sliderItems } from "../utils/data";

export default function Slider() {
  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={true}
      showStatus={false}
      className="hidden md:flex py-2"
      renderArrowPrev={(onClickHandler) => (
        <div
          onClick={onClickHandler}
          className="absolute h-8 w-8 rounded-full text-center justify-center hover:bg-black/50 bg-black/25 top-2/4 left-0 text-white p-2 z-[1]"
        >
          <HiOutlineArrowLeft />
        </div>
      )}
      renderArrowNext={(onClickHandler) => (
        <div
          onClick={onClickHandler}
          className="absolute h-8 w-8 rounded-full text-center justify-center hover:bg-black/50 bg-black/25 top-2/4 right-0 text-white p-2 z-[1]"
        >
          <HiOutlineArrowRight />
        </div>
      )}
    >
      {sliderItems.map((item) => (
        <div key={`carousel-image-${item.id}`}>
          <div className="relative w-full h-96 md:h-[450px] lg:h-[650px]">
            <Image
              src={item.img}
              alt={`carousel-${item.id}`}
              layout="fill"
              priority
              objectFit="cover"
              placeholder="blur"
              blurDataURL={item.img}
            />
          </div>
          <div className="absolute z-[10] p-5 rounded-sm align-left text-white top-[46%] left-0 right-1/2 mx-auto my-0 max-w-[240px] bg-[#000000]/25">
            <p className="text-sm md:text-xl text-indigo-400">{item.desc1}</p>
            <p className="text-md md:text-3xl">{item.title}</p>
            <p className="text-xs md:text-lg text-indigo-500">{item.desc2}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
