import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "../components/Image";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../components/Loading";

export default function Recent() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    axios
      .get("/getRecent")
      .then((response) => {
        let photos = response.data["photos"]["photo"];
        setImages([...images, ...photos]);
      })
      .catch(function (error) {
        console.log(error.response);
        return error.response;
      });
  };
  return (
    <div className="componentContainer">
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        loader={<Loading />}
        hasMore={true}
      >
        {images.map((image) => (
          <Image
            id={image.id}
            title={image.title}
            secret={image.secret}
            server={image.server}
            farm={image.farm}
            key={image.id}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
