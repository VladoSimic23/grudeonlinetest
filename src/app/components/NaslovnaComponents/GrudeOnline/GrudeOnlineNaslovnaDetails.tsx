"use server";
import nasStyles from "../../../css/naslovnicaCss/naslovnica.module.css";
import Link from "next/link";
import Image from "next/image";
import { formatDateToCroatian } from "@/app/lib/utils";

const GrudeOnlineNaslovnaDetails = async ({ data }: any) => {
  const {
    title,
    slug,
    date,
    featuredImage: {
      node: { sourceUrl },
    },
  } = data;

  return (
    <div className={nasStyles.flexGrOnline}>
      <div className={nasStyles.naslovnaOverlay}>
        <Link href={`/${slug}`}>
          <div className={nasStyles.imageOverlay}></div>
          <Image
            src={sourceUrl}
            width={100}
            height={50}
            alt={title}
            priority={true}
            className={nasStyles.grOnlineChildImg}
          />
        </Link>
      </div>
      <div className={nasStyles.grudeOnlineContent}>
        <h3>
          <Link href={`/${slug}`}>{title}</Link>
        </h3>
        <span>{formatDateToCroatian(date)}</span>
      </div>
    </div>
  );
};

export default GrudeOnlineNaslovnaDetails;
