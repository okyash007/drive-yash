import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { makeGetRequest } from "../../apis/makeGetRequest";
import { backendUrl } from "../../utils/constants";
import FolderCard from "../../components/FolderCard";
import ImageCard from "../../components/ImageCard";
import { FaFolderPlus } from "react-icons/fa";
import { BiSolidImageAdd } from "react-icons/bi";
import AddFolder from "../drive/add/AddFolder";
import AddImage from "../drive/add/AddImage";

const Folder = () => {
  const [content, setContent] = useState(null);
  const [add, setAdd] = useState(null);
  const params = useParams();
  const folderId = params["*"].split("/")[params["*"].split("/").length - 1];

  async function getFolder(id) {
    const data = await makeGetRequest(`${backendUrl}/folder/${id}`);
    if (data.success === true) {
      setContent({ images: data.data.images, folders: data.data.sub_folder });
    }
  }

  useEffect(() => {
    getFolder(folderId);
  }, [params]);

  console.log(content);

  if (content === null) {
    return <>loading</>;
  }

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
            <AddFolder folderId={folderId} setContent={setContent} />
          ) : add === "image" ? (
            <AddImage folderId={folderId} setContent={setContent} />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {content.folders.map((m) => (
          <Link key={m._id} to={`/drive/${params["*"]}/${m._id}`}>
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

export default Folder;
