import React from "react";
import styles from "./FeedPhotos.module.css";

import FeedPhotosItems from "./FeedPhotosItems";
import Error from "../Helper/Error";

import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../api";
import Loading from "../Helper/Loading";

const FeedPhotos = ({setModalPhoto}) => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });
      await request(url, options);
    }

    fetchPhotos();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map(photo => <FeedPhotosItems key={photo.id} photo={photo} setModalPhoto={setModalPhoto} />)}
      </ul>
    );
  else return null;
};

export default FeedPhotos;
