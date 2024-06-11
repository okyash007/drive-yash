import React, { useCallback, useState } from "react";
import { makeGetRequest } from "../../apis/makeGetRequest";
import { backendUrl } from "../../utils/constants";
import ImageCard from "../../components/ImageCard";

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
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => {
          const query = e.target.value;
          setSearchText(query);
          debouncedFetchImages(query);
        }}
      />
      <div className="flex flex-wrap gap-2">
        {images.map((m) => {
          return <ImageCard data={m} />;
        })}
      </div>
    </div>
  );
};

export default Search;
