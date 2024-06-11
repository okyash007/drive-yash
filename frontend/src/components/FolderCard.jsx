import React, { useState } from "react";
import { FaFolder } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { makePostRequest } from "../apis/makePostRequest";
import { backendUrl } from "../utils/constants";
import { useDispatch } from "react-redux";
import { deleteFolder } from "../store/folderSlice";
import "ldrs/ring";

const FolderCard = ({ data }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function deleteFolderFn() {
    const deleteStatus = await makePostRequest(
      `${backendUrl}/folder/delete/${data._id}`,
      {
        parent_folder: data.parent_folder,
      }
    );
    console.log(deleteStatus);
    setLoading(false);
    if (deleteStatus.success === true) {
      dispatch(deleteFolder({ id: data._id }));
    }
  }

  return (
    <div className="px-4 pb-2 hover:ring-2 relative">
      <FaFolder size={"80"} />
      <p className="text-center">{data.name}</p>

      {loading ? (
        <div className="absolute top-0 right-0 p-1">
          <l-ring
            size="10"
            stroke="2"
            bg-opacity="0"
            speed="2"
            color="white"
          ></l-ring>
        </div>
      ) : (
        <div className="absolute top-0 right-0 p-1 bg-[#ffffff2a] rounded-full hover:bg-[#ffffff3a]">
          <MdDelete
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLoading(true);
              deleteFolderFn();
            }}
          />
        </div>
      )}
    </div>
  );
};
export default FolderCard;
