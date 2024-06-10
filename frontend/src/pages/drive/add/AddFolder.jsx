import React, { useState } from "react";
import { makePostRequest } from "../../../apis/makePostRequest";
import { backendUrl } from "../../../utils/constants";

const AddFolder = ({ folderId, setContent }) => {
  const [data, setData] = useState({ name: "" });

  async function createFolder(id, name) {
    const newFolder = await makePostRequest(`${backendUrl}/folder/create`, {
      parent_folder: id,
      name,
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
      <input
        type="text"
        onChange={(e) => {
          setData((prev) => {
            return { ...prev, name: e.target.value };
          });
        }}
      />
      <button
        onClick={() => {
          createFolder(folderId, data.name);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddFolder;
