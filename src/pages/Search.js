import React, { useState } from "react";
import axios from "axios";
import Image from "../components/Image";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../components/Loading";

export default function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (search !== "") {
      getPhotos(search);
      setLoading(true);
    }
  };

  function searchResults() {
    return (
      <div style={{ marginTop: 30 }}>
        <InfiniteScroll
          dataLength={results.length}
          next={getPhotos}
          loader={<Loading />}
          hasMore={true}
        >
          {results.map((image, i) => (
            <Image
              id={image.id}
              title={image.title}
              secret={image.secret}
              server={image.server}
              farm={image.farm}
              key={i}
            />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
  function getPhotos(searchTags) {
    axios
      .get("/getSearch", {
        params: {
          searchTags: searchTags,
        },
      })
      .then((response) => {
        let photos = response.data["photos"]["photo"];
        setLoading(false);
        if (photos.length == 0) setErrorMessage("Nothing found...");
        else {
          setResults([...results, ...photos]);
          setErrorMessage("");
        }
      })
      .catch(function (error) {
        console.log(error.response);
        return error.response;
      });
  }
  function photosRenderCondition() {
    if (results.length !== 0) return searchResults();
  }
  function loadingRenderCondition() {
    if (loading) return <Loading />;
    else return;
  }
  return (
    <div className="componentContainer">
      <div>
        <form onSubmit={searchHandler}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search photos"
              aria-describedby="button-addon2"
              onChange={(event) => setSearch(event.target.value)}
              value={search}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={searchHandler}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div>
        {loadingRenderCondition()}
        {errorMessage}
      </div>
      {photosRenderCondition()}
    </div>
  );
}
