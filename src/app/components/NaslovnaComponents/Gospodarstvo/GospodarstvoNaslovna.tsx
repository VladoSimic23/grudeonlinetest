"use server";
import Link from "next/link";
import nasStyles from "../../../css/naslovnicaCss/naslovnica.module.css";
import styles from "../../../css/mainCss/mainStyle.module.css";
import Image from "next/image";
import GospodarstvoNaslovnaDetails from "./GospodarstvoNaslovnaDetails";
import { formatDateToCroatian } from "@/app/lib/utils";
import { getPostsByCategory } from "@/app/lib/service";

const GospodarstvoNaslovna = async () => {
  const data = await getPostsByCategory("gospodarstvo", 6);

  return (
    <>
      {data.length > 0 && (
        <div className={nasStyles.gospSportMargin}>
          <h3 className={nasStyles.naslovnicaHeading}>
            <Link href={`/category/gospodarstvo`}>GOSPODARSTVO</Link>
          </h3>
          <div>
            <div className={nasStyles.sportBorder}>
              <div className={nasStyles.naslovnaOverlay}>
                <Link href={`/${data[0].slug}`}>
                  <div className={nasStyles.imageOverlay}></div>
                  <Image
                    src={data[0].featuredImage.node.sourceUrl}
                    width={260}
                    height={120}
                    alt={data[0].title}
                    className={nasStyles.grudeOnlineMainImg}
                  />
                </Link>
              </div>
              <h3>
                <Link href={`/${data[0].slug}`} className={nasStyles.linkFont}>
                  {data[0].title}
                </Link>
              </h3>
              <div className={nasStyles.grudeOnlineDate}>
                <span>{formatDateToCroatian(data[0]?.date)}</span>
              </div>
              <div
                className={styles.dangerHtml}
                dangerouslySetInnerHTML={{
                  __html: data[0]?.content.slice(0, 190) + " ...",
                }}
              ></div>
            </div>
            <div>
              {data.map((item: any, index: number) => {
                if (index !== 0) {
                  return (
                    <GospodarstvoNaslovnaDetails key={index} data={item} />
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GospodarstvoNaslovna;
