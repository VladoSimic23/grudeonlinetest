"use server";
import React from "react";
import styles from "../../css/mainCss/mainStyle.module.css";
import Link from "next/link";
import { formatDateToCroatian } from "@/app/lib/utils";
import Image from "next/image";
import { FaComments } from "react-icons/fa";
import defaultImage from "../../../../public/noImage.jpg";

const NaslovneVijestiDetails = async ({ data }: any) => {
  return (
    <Link href={`/${data?.slug}`} className={styles.naslovnaLink}>
      <div className={styles.naslovnicaOverly}></div>
      <div className={styles.naslovnica}>
        <Image
          src={
            data?.featuredImage?.node?.sourceUrl
              ? data?.featuredImage?.node?.sourceUrl
              : defaultImage
          }
          width={250}
          height={150}
          priority={true}
          alt={data?.title}
        />
        <div className={styles.datumKoment}>
          <h3>{data?.title}</h3>
          <div>
            <span>{formatDateToCroatian(data?.date)}</span> |{" "}
            <span>
              {data?.comments?.nodes?.length} <FaComments />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NaslovneVijestiDetails;
