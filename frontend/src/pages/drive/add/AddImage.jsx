import React from "react";
import { makePostRequest } from "../../../apis/makePostRequest";
import { backendUrl } from "../../../utils/constants";

const AddImage = ({ folderId, setContent }) => {
  async function createImage(id) {
    const newImage = await makePostRequest(`${backendUrl}/image/add`, {
      parent_folder: id,
      name: "yash-image",
      path: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg",
    });
    console.log(newImage);
    if (newImage.success === true) {
      setContent((prev) => {
        return { ...prev, images: [...prev.images, newImage.data] };
      });
    }
  }

  return (
    <div>
      <input type="text" name="" id="" />
      <input type="text" name="" id="" />
      <button
        onClick={() => {
          createImage(folderId);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddImage;
