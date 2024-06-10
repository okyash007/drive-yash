import React from "react";
import { FaFolder } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { makePostRequest } from "../apis/makePostRequest";
import { backendUrl } from "../utils/constants";

const FolderCard = ({ data }) => {
  async function deleteFolder() {
    const deleteStatus = await makePostRequest(
      `${backendUrl}/folder/delete/${data._id}`,
      {
        parent_folder: data.parent_folder,
      }
    );
    console.log(deleteStatus);
  }

  return (
    <div className="px-4 pb-2 hover:ring-2 relative">
      <FaFolder size={"80"} />
      <p className="text-center">{data.name}</p>
      <div className="absolute top-0 right-0 p-1 bg-[#ffffff2a] rounded-full hover:bg-[#ffffff3a]">
        <MdDelete
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteFolder();
          }}
        />
      </div>
    </div>
  );
};
export default FolderCard;
