import React from "react";
import { MdDelete } from "react-icons/md";
import { makePostRequest } from "../apis/makePostRequest";
import { backendUrl } from "../utils/constants";
import { deleteImage } from "../store/folderSlice";
import { useDispatch } from "react-redux";

const ImageCard = ({ data }) => {
  const dispatch = useDispatch();

  async function deleteImageFn() {
    const deleteStatus = await makePostRequest(
      `${backendUrl}/image/delete/${data._id}`,
      { folder: data.parent_folder }
    );

    console.log(deleteStatus);
    if (deleteStatus.success === true) {
      dispatch(deleteImage({ id: data._id }));
    }
  }

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
            deleteImageFn();
          }}
        />
      </div>
    </div>
  );
};

export default ImageCard;
