/* eslint-disable @next/next/no-img-element */

const CategoryList = ({ item }) => {
  return (
    <div className="relative flex flex-row md:flex-col flex-1 m-1 justify-center">
      <a href={`/product/${item.cat}`}>
        <img
          src={item.img}
          alt={item.title}
          className="relative object-cover h-48 w-96 md:w-[300px] md:h-[400px] lg:w-[500px] lg:h-[600px]"
        />

        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
          <div className="text-white p-5 mb-6 text-3xl">{item.title}</div>
          <button className="border-none items-center justify-center bg-white hover:bg-white/50 text-gray-500 cursor-pointer font-semibold p-4">
            SHOP NOW
          </button>
        </div>
      </a>
    </div>
  );
};

export default CategoryList;
