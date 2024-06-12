import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { makeGetRequest } from "../../apis/makeGetRequest";
import { backendUrl } from "../../utils/constants";
import FolderCard from "../../components/FolderCard";
import ImageCard from "../../components/ImageCard";

const Images = () => {
  const [Images, setImages] = useState(null);
  const params = useParams();

  async function getImages() {
    const res = await makeGetRequest(`${backendUrl}/folder/${params.id}`);
    console.log(res);
    if (res.success === true) {
      setImages(res.data.images);
    }
  }

  useEffect(() => {
    getImages();
  }, []);

  if (Images === null) {
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
        {Images.map((m) => {
          return <ImageCard data={m} />;
        })}
      </div>
    </div>
  );
};

export default Images;
