import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeGetRequest } from "../../apis/makeGetRequest";
import { backendUrl } from "../../utils/constants";
import FolderCard from "../../components/FolderCard";

const Share = () => {
  const [folder, setFolders] = useState(null);

  async function getFolders() {
    const res = await makeGetRequest(`${backendUrl}/folder/test`);
    console.log(res);
    if (res.success === true) {
      setFolders(res.data);
    }
  }

  useEffect(() => {
    getFolders();
  }, []);

  if (folder === null) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <l-ring
          size="30"
          stroke="5"
          bg-opacity="0"
          speed="1.5"
          color="white"
        ></l-ring>
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="flex gap-2 mb-3">
        <Link
          className="bg-[#0000003a] p-4 rounded-md hover:bg-[#0000001a] "
          to={"/drive"}
        >
          Drive
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {folder.map((m) => {
          return (
            <Link to={`/share/${m._id}`}>
              <FolderCard data={m} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Share;
