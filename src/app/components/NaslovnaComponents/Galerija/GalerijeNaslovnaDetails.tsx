import React from "react";
import Link from "next/link";
import nasStyles from "../../../css/naslovnicaCss/naslovnica.module.css";
import Image from "next/image";
import { formatDateToCroatian } from "@/app/lib/utils";

const GalerijeNaslovnaDetails = async ({ data }: any) => {
  const {
    title,
    slug,
    date,
    featuredImage: {
      node: { sourceUrl },
    },
  } = data;
  return (
    <div className={nasStyles.galerijeDetails}>
      {/* <div className={`${nasStyles.naslovnaOverlay}`}>
      </div> */}
      <div className={`${nasStyles.grudeOnlineContent} ${nasStyles.ostalo}`}>
        <Link href={`/${slug}`}>
          <div className={nasStyles.imageOverlay}></div>
          <Image src={sourceUrl} width={300} height={160} alt={title} />
        </Link>
        <div className={nasStyles.galerijeContentNaslovna}>
          <h3>
            <Link href={`/${slug}`}>{title}</Link>
          </h3>
          <span>{formatDateToCroatian(date)}</span>
        </div>
      </div>
    </div>
  );
};

export default GalerijeNaslovnaDetails;
