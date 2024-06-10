import React from "react";

const ImageCard = ({ data }) => {
  return (
    <div className="px-4 pb-2 hover:ring-2">
      <img className="w-20 aspect-square object-contain" src={data.path} alt="" />
      <p className="text-center">{data.name}</p>
    </div>
  );
};

export default ImageCard;
