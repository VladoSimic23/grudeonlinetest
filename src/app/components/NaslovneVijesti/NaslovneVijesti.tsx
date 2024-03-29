"use server";
import styles from "../../css/mainCss/mainStyle.module.css";
import NaslovneVijestiDetails from "./NaslovneVijestiDetails";
import Link from "next/link";
import { formatDateToCroatian } from "@/app/lib/utils";
import { getPopularPosts } from "@/app/lib/service";
import { preload } from "react-dom";
import Image from "next/image";

const NaslovneVijesti = async () => {
  const data = await getPopularPosts(5);

  return (
    <>
      <div className={styles.naslovnicaWrap}>
        <div className={styles.naslovnicaContainer}>
          <div className={styles.grid2Vijesti}>
            <Link href={`/${data[0]?.slug}`} className={styles.naslovnaLink}>
              <div className={styles.naslovnicaOverly}></div>
              <div
                className={`${styles.naslovnica1}`}
                // style={{
                //   backgroundImage: `url(${data[0]?.featuredImage?.node?.sourceUrl})`,
                //   height: "421px",
                //   width: "auto",
                // }}
              >
                <Image
                  src={data[0]?.featuredImage?.node?.sourceUrl}
                  fill
                  sizes="auto"
                  priority={true}
                  // width={421}
                  // height={400}
                  alt={data[0]?.title}
                />
                <div className={styles.datumKoment}>
                  <h3>{data[0]?.title}</h3>
                  <div>
                    <span>{formatDateToCroatian(data[0]?.date)}</span> |{" "}
                    <span>{data[0]?.comments?.nodes?.length} komentara</span>
                  </div>
                </div>
              </div>
            </Link>

            <div className={styles.grid2Vijesti}>
              {data.map((item: any, index: number) => {
                if (index !== 0) {
                  return <NaslovneVijestiDetails key={index} data={item} />;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NaslovneVijesti;
