import React, { useState } from "react";
import { makePostRequest } from "../../../apis/makePostRequest";
import { backendUrl } from "../../../utils/constants";

const AddImage = ({ folderId, setContent }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({ name: "", path: "" });

  async function createImage(id, name, path) {
    const newImage = await makePostRequest(`${backendUrl}/image/add`, {
      parent_folder: id,
      name,
      path,
    });
    console.log(newImage);
    if (newImage.success === true) {
      setContent((prev) => {
        return { ...prev, images: [...prev.images, newImage.data] };
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!image) {
      alert("Please select a file first");
      return;
    }

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
    <div>
      <input
        type="text"
        onChange={(e) => {
          setData((prev) => {
            return { ...prev, name: e.target.value };
          });
        }}
      />
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(event) => {
            setImage(event.target.files[0]);
          }}
          accept="image/*"
        />
        <button type="submit">upload</button>
      </form>
      <button
        onClick={() => {
          if (data.name && data.path) {
            createImage(folderId, data.name, data.path);
          } else {
            console.log("not proper data")
          }
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddImage;
