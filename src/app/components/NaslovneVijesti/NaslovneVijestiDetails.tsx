import React from "react";
import styles from "../../css/mainCss/mainStyle.module.css";
import Link from "next/link";

const NaslovneVijestiDetails = ({ data }: any) => {
  return (
    <Link href={`/${data.slug}`}>
      <div className={styles.naslovnicaOverly}></div>
      <div
        className={styles.naslovnica}
        style={{ backgroundImage: `url(${data.featuredImage.node.sourceUrl})` }}
      >
        <div className={styles.datumKoment}>
          <h3>{data.title}</h3>
          <div>
            <span>{data.date}</span> |{" "}
            <span>{data.comments.nodes.length} komentara</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NaslovneVijestiDetails;
