import React from "react";
import { FaFolder } from "react-icons/fa";

const FolderCard = ({ data }) => {
  return (
    <div className="px-4 pb-2 hover:ring-2">
      <FaFolder size={"80"} />
      <p className="text-center">{data.name}</p>
    </div>
  );
};

export default FolderCard;
