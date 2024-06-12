import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeGetRequest } from "../../../apis/makeGetRequest";
import { backendUrl } from "../../../utils/constants";
import { FaFolderPlus } from "react-icons/fa";
import { BiSolidImageAdd } from "react-icons/bi";
import AddFolder from "../add/AddFolder";
import AddImage from "../add/AddImage";
import { Link, useParams } from "react-router-dom";
import FolderCard from "../../../components/FolderCard";
import ImageCard from "../../../components/ImageCard";
import "ldrs/ring";
import ShareFolder from "./ShareFolder";

// Default values shown

const RootFolder = () => {
  const user = useSelector((store) => store.user.data);
  const folder = useSelector((store) => store.folder.presentFolder);
  const [add, setAdd] = useState(null);
  const params = useParams();

  if (folder === null) {
    return (
      <div className="flex justify-center mt-[20%]">
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

  console.log(folder);

  return (
    <>
      <div className="bg-[#ffffff1a] mx-3 px-4 py-3 rounded-md w-max mb-3">
        <div className="flex gap-4">
          <FaFolderPlus
            onClick={() => {
              setAdd((prev) => {
                if (prev === "folder") {
                  return null;
                } else {
                  return "folder";
                }
              });
            }}
            size={"30"}
          />
          <BiSolidImageAdd
            onClick={() => {
              setAdd((prev) => {
                if (prev === "image") {
                  return null;
                } else {
                  return "image";
                }
              });
            }}
            size={"35"}
          />
        </div>

        <div>
          {add === "folder" ? (
            <AddFolder folderId={folder._id} />
          ) : add === "image" ? (
            <AddImage folderId={folder._id} />
          ) : (
            <></>
          )}
        </div>
      </div>
      {params.id && <ShareFolder id={params.id} />}
      <div className="flex flex-wrap gap-4">
        {folder.folders.map((m) => (
          <Link key={m._id} to={`/drive/${m._id}`}>
            <FolderCard isDelete={true} data={m} />
          </Link>
        ))}
        {folder.images.map((m) => (
          <ImageCard isDelete={true} key={m._id} data={m} />
        ))}
      </div>
    </>
  );
};

export default RootFolder;
