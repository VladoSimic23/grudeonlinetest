"use server";
import nasStyles from "../../../css/naslovnicaCss/naslovnica.module.css";
import Link from "next/link";
import Image from "next/image";
import { formatDateToCroatian } from "@/app/lib/utils";

const SportNaslovnaDetails = async ({ data }: any) => {
  const {
    title,
    slug,
    date,
    featuredImage: {
      node: { sourceUrl },
    },
  } = data;

  return (
    <div className={nasStyles.grudeOnlineGrid13}>
      <div className={nasStyles.naslovnaOverlay}>
        <Link href={`/${slug}`}>
          <div className={nasStyles.imageOverlay}></div>
          <Image src={sourceUrl} width={120} height={80} alt={title} />
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

export default SportNaslovnaDetails;
