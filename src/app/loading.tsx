import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./css/mobile/mobile.module.css";

const Loading = () => {
  return (
    <div className={styles.loadMoreLoading}>
      <h2>
        <span></span>
        <span></span>
        <span></span>
      </h2>
    </div>
  );
};

export default Loading;
