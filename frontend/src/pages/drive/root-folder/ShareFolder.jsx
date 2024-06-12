import React, { useState } from "react";
import toast from "react-hot-toast";
import { makePostRequest } from "../../../apis/makePostRequest";
import { backendUrl } from "../../../utils/constants";

const ShareFolder = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  async function shareFolder() {
    const isShare = await makePostRequest(`${backendUrl}/folder/share`, {
      username,
      folder: id,
    });
    setLoading(false);
    if (isShare.success === true) {
      toast.success(`folder shared to ${username}`, {
        duration: 4000,
        position: "bottom-right",
      });
    }
  }

  return (
    <div className="bg-[#ffffff1a] mx-3 px-4 py-3 flex gap-2 rounded-md w-max mb-3">
      <input
        type="text"
        placeholder="username"
        className="bg-[#0000003a] py-2 px-3 rounded-md"
        onChange={(e) => {
          setUsername(e.target.value);
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
            if (username) {
              setLoading(true);
              shareFolder();
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
          share
        </button>
      )}
    </div>
  );
};

export default ShareFolder;
