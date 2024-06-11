import React, { useState } from "react";
import { makePostRequest } from "../../../apis/makePostRequest";
import { backendUrl } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { addFolder } from "../../../store/folderSlice";
import toast from "react-hot-toast";

const AddFolder = ({ folderId }) => {
  console.log(folderId);
  const dispatch = useDispatch();
  const [data, setData] = useState({ name: "" });

  async function createFolder(id, name) {
    const newFolder = await makePostRequest(`${backendUrl}/folder/create`, {
      parent_folder: id,
      name,
    });
    if (newFolder.success === true) {
      dispatch(addFolder(newFolder.data));
    }
  }

  return (
    <div className=" mt-2 w-max rounded-md flex gap-2">
      <input
        type="text"
        placeholder="folder name"
        className="bg-[#0000003a] py-2 px-3 rounded-md"
        onChange={(e) => {
          setData((prev) => {
            return { ...prev, name: e.target.value };
          });
        }}
      />
      <button
        className="bg-[#0000002a] py-2 px-3 rounded-md hover:bg-[#0000004a]"
        onClick={() => {
          if (data.name) {
            createFolder(folderId, data.name);
          } else {
            toast.error("fill data correctly", {
              duration: 4000,
              position: "bottom-right",
              // Customizing the toast with Tailwind CSS classes
              className: "bg-[#0000002a] text-white border-0 rounded-md",
              // Or you can use a custom icon
            });
          }
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddFolder;
