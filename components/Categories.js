import Image from "next/image.js";
import { categories } from "../utils/data.js";

const Categories = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {categories.map((item) => (
        <a
          href={`/product/${item.cat}`}
          key={item.id}
          className="relative h-40 w-full md:h-96 lg:h-[500px] m-1"
        >
          <Image
            src={item.img}
            alt={item.title}
            layout="fill"
            objectFit="cover"
            priority
            placeholder="blur"
            blurDataURL={item.img}
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
            <div className="text-white p-5 mb-6 text-3xl">{item.title}</div>
            <button className="border-none items-center justify-center bg-white hover:bg-white/50 text-gray-500 cursor-pointer font-semibold p-4">
              SHOP NOW
            </button>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Categories;
