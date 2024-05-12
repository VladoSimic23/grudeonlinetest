"use server";
import Link from "next/link";
import nasStyles from "../../../css/naslovnicaCss/naslovnica.module.css";
import Image from "next/image";
import { formatDateToCroatian } from "@/app/lib/utils";
import defaultImage from "../../../../../public/noImage.jpg";

const LifestyleNaslovnaDetails = async ({ data }: any) => {
  const {
    title,
    slug,
    date,
    featuredImage: {
      node: { sourceUrl },
    },
  } = data;
  return (
    <div className={nasStyles.ostaleVijesti}>
      <div className={`${nasStyles.naslovnaOverlay}`}>
        <Link href={`/${slug}`}>
          <div className={nasStyles.imageOverlay}></div>
          <Image
            src={sourceUrl ? sourceUrl : defaultImage}
            width={220}
            height={120}
            alt={title}
          />
        </Link>
      </div>
      <div className={`${nasStyles.grudeOnlineContent} ${nasStyles.ostalo}`}>
        <h3>
          <Link href={`/${slug}`}>{title}</Link>
        </h3>
        <span>{formatDateToCroatian(date)}</span>
      </div>
    </div>
  );
};

export default LifestyleNaslovnaDetails;
