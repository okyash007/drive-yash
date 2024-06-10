import React, { useEffect, useState } from "react";
import { makeGetRequest } from "../../apis/makeGetRequest";
import { backendUrl } from "../../utils/constants";
import { useSelector } from "react-redux";
import FolderCard from "../../components/FolderCard";
import { Link } from "react-router-dom";
import ImageCard from "../../components/ImageCard";
import { FaFolderPlus } from "react-icons/fa";
import { BiSolidImageAdd } from "react-icons/bi";
import AddFolder from "./add/AddFolder";
import AddImage from "./add/AddImage";

const Drive = () => {
  const user = useSelector((store) => store.user.data);
  const [content, setContent] = useState(null);
  const [add, setAdd] = useState(null);

  async function getFolder(id) {
    const data = await makeGetRequest(`${backendUrl}/folder/${id}`);
    if (data.success === true) {
      setContent({ images: data.data.images, folders: data.data.sub_folder });
    }
  }

  useEffect(() => {
    getFolder(user.root_folder._id);
  }, []);

  console.log(content);

  if (content === null) {
    return <>loading</>;
  }
  console.log(add);

  return (
    <>
      <div className="bg-[#ffffff1a]">
        <div className="flex gap-2">
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
            <AddFolder
              folderId={user.root_folder._id}
              setContent={setContent}
            />
          ) : add === "image" ? (
            <AddImage folderId={user.root_folder._id} setContent={setContent} />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {content.folders.map((m) => (
          <Link key={m._id} to={`/drive/${m._id}`}>
            <FolderCard data={m} />
          </Link>
        ))}
        {content.images.map((m) => (
          <ImageCard key={m._id} data={m} />
        ))}
      </div>
    </>
  );
};

export default Drive;
