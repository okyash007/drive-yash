import React, { useState } from "react";
import { makePostRequest } from "../../../apis/makePostRequest";
import { backendUrl } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { addFolder } from "../../../store/folderSlice";
import toast, { useToaster } from "react-hot-toast";

const AddFolder = ({ folderId }) => {
  console.log(folderId);
  const dispatch = useDispatch();
  const [data, setData] = useState({ name: "" });
  const [loading, setLoading] = useState(false);

  async function createFolder(id, name) {
    const newFolder = await makePostRequest(`${backendUrl}/folder/create`, {
      parent_folder: id,
      name,
    });
    setLoading(false);
    if (newFolder.success === true) {
      dispatch(addFolder(newFolder.data));
    } else {
      toast.error(newFolder.message, {
        duration: 4000,
        position: "bottom-right",
      });
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
      {loading ? (
        <div className="flex justify-center items-center bg-[#0000003a] px-4 py-2 rounded-md">
          <l-ring
            size="20"
            stroke="3"
            bg-opacity="0"
            speed="2"
            color="white"
          ></l-ring>
        </div>
      ) : (
        <button
          className="bg-[#0000002a] py-2 px-3 rounded-md hover:bg-[#0000004a]"
          onClick={() => {
            if (data.name) {
              setLoading(true);
              createFolder(folderId, data.name);
            } else {
              toast.error("fill data correctly", {
                duration: 4000,
                position: "bottom-right",
                // Customizing the toast with Tailwind CSS classes
                className: "toast-error",
                // Or you can use a custom icon
              });
            }
          }}
        >
          Add
        </button>
      )}
    </div>
  );
};

export default AddFolder;
