"use server";
import React from "react";
import styles from "../../css/mainCss/mainStyle.module.css";
import Link from "next/link";
import { formatDateToCroatian } from "@/app/lib/utils";
import Image from "next/image";

const NaslovneVijestiDetails = async ({ data }: any) => {
  return (
    <Link href={`/${data?.slug}`} className={styles.naslovnaLink}>
      <div className={styles.naslovnicaOverly}></div>
      <div
        className={styles.naslovnica}
        // style={{
        //   backgroundImage: `url(${data?.featuredImage?.node?.sourceUrl})`,
        //}}
      >
        <Image
          src={data?.featuredImage?.node?.sourceUrl}
          fill
          sizes="auto"
          priority={true}
          // width={421}
          // height={400}
          alt={data?.title}
        />
        <div className={styles.datumKoment}>
          <h3>{data?.title}</h3>
          <div>
            <span>{formatDateToCroatian(data?.date)}</span> |{" "}
            <span>{data?.comments?.nodes?.length} komentara</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NaslovneVijestiDetails;
