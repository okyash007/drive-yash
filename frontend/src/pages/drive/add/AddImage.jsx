import React, { useState } from "react";
import { makePostRequest } from "../../../apis/makePostRequest";
import { backendUrl } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { addImage } from "../../../store/folderSlice";
import "ldrs/ring";
import toast from "react-hot-toast";

const AddImage = ({ folderId }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [data, setData] = useState({ name: "", path: "" });
  const [uploadLoading, setUploadLoading] = useState(false);

  async function createImage(id, name, path) {
    const newImage = await makePostRequest(`${backendUrl}/image/add`, {
      parent_folder: id,
      name,
      path,
    });
    console.log(newImage);
    if (newImage.success === true) {
      dispatch(addImage(newImage.data));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!image) {
      alert("Please select a file first");
      return;
    }
    setUploadLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch(`${backendUrl}/upload`, {
      method: "POST",
      body: formData,
      // headers: {
      // Note: We do not set the content type header manually for FormData.
      // "Content-Type": "multipart/form-data",
      // },
    });

    const result = await response.json();
    setUploadLoading(false);
    if (result.url) {
      setData((prev) => {
        return { ...prev, path: result.url };
      });
    }

    if (response.ok) {
      console.log("Upload successful", result);
    } else {
      console.error("Upload failed", result);
    }
  }

  return (
    <div className="flex flex-col w-max gap-2 mt-2">
      <input
        className="bg-[#0000003a] py-2 px-3 rounded-md"
        placeholder="image name"
        type="text"
        value={data.name}
        onChange={(e) => {
          setData((prev) => {
            return { ...prev, name: e.target.value };
          });
        }}
      />
      <input
        className="bg-[#0000003a] py-2 px-3 rounded-md"
        placeholder="image url"
        type="text"
        value={data.path}
        onChange={(e) => {
          setData((prev) => {
            return { ...prev, path: e.target.value };
          });
        }}
      />

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="bg-[#0000003a] p-3 rounded-md"
          type="file"
          onChange={(event) => {
            setImage(event.target.files[0]);
          }}
          accept="image/*"
        />
        {uploadLoading ? (
          <div className="flex justify-center items-center bg-[#0000003a] px-4 rounded-md">
            <l-ring
              size="30"
              stroke="5"
              bg-opacity="0"
              speed="2"
              color="white"
            ></l-ring>
          </div>
        ) : (
          <button
            type="submit"
            className="bg-[#0000003a] px-4 rounded-md hover:bg-[#0000005a]"
          >
            upload
          </button>
        )}
      </form>
      <button
        className="bg-[#0000003a] px-4 py-2 rounded-md hover:bg-[#0000005a]"
        onClick={() => {
          if (data.name && data.path) {
            createImage(folderId, data.name, data.path);
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
    </div>
  );
};

export default AddImage;
