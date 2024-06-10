import React from "react";
import { MdDelete } from "react-icons/md";

const ImageCard = ({ data }) => {
  return (
    <div className="px-4 pb-2 hover:ring-2 relative">
      <img
        className="w-20 aspect-square object-contain"
        src={data.path}
        alt=""
      />
      <p className="text-center">{data.name}</p>
      <div className="absolute top-0 right-0 p-1 bg-[#ffffff2a] rounded-full hover:bg-[#ffffff3a]">
        <MdDelete
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("hii");
          }}
        />
      </div>
    </div>
  );
};

export default ImageCard;
