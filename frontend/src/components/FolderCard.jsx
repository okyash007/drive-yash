import React from "react";
import { FaFolder } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const FolderCard = ({ data }) => {
  return (
    <div className="px-4 pb-2 hover:ring-2 relative">
      <FaFolder size={"80"} />
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
export default FolderCard;
