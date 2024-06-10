import React from "react";
import { makePostRequest } from "../../../apis/makePostRequest";
import { backendUrl } from "../../../utils/constants";

const AddFolder = ({ folderId, setContent }) => {
  async function createFolder(id) {
    const newFolder = await makePostRequest(`${backendUrl}/folder/create`, {
      parent_folder: id,
      name: "yash-new-new",
    });
    console.log(newFolder);
    if (newFolder.success === true) {
      setContent((prev) => {
        return { ...prev, folders: [...prev.folders, newFolder.data] };
      });
    }
  }

  return (
    <div>
      <input type="text" name="" id="" />
      <button
        onClick={() => {
          createFolder(folderId);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddFolder;
