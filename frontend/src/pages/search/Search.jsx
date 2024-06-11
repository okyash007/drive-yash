import React, { useCallback, useState } from "react";
import { makeGetRequest } from "../../apis/makeGetRequest";
import { backendUrl } from "../../utils/constants";
import ImageCard from "../../components/ImageCard";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [images, setImages] = useState([]);

  console.log(searchText);

  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  async function fetchImages(query) {
    try {
      const searchImages = await makeGetRequest(
        `${backendUrl}/image/search/${query}`
      );
      console.log(searchImages);
      if (searchImages.success === false) {
        setImages([]);
      } else {
        setImages(searchImages.data);
      }
    } catch (error) {
      setImages([]);
    }
  }

  const debouncedFetchImages = useCallback(debounce(fetchImages, 300), []);

  return (
    <div className="p-3">
      <div className="flex gap-2 mb-3">
        <Link className="bg-[#0000003a] p-4 rounded-md hover:bg-[#0000001a] " to={"/drive"}>
          Drive
        </Link>
        <input
          className="bg-[#0000003a] py-2 px-3 rounded-md text-3xl"
          placeholder="search"
          type="text"
          value={searchText}
          onChange={(e) => {
            const query = e.target.value;
            setSearchText(query);
            debouncedFetchImages(query);
          }}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {images.map((m) => {
          return <ImageCard data={m} />;
        })}
      </div>
    </div>
  );
};

export default Search;
