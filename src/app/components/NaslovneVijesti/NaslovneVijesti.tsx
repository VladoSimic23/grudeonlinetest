"use server";
import styles from "../../css/mainCss/mainStyle.module.css";
import NaslovneVijestiDetails from "./NaslovneVijestiDetails";
import Link from "next/link";
import { formatDateToCroatian } from "@/app/lib/utils";
import { getPopularPosts } from "@/app/lib/service";
import Image from "next/image";
import { FaComments } from "react-icons/fa";

const NaslovneVijesti = async () => {
  const data = await getPopularPosts(5);

  return (
    <>
      <div className={styles.naslovnicaWrap}>
        <div className={styles.naslovnicaContainer}>
          <div className={styles.grid2Vijesti}>
            <Link
              href={`/${data[0]?.slug}`}
              className={`${styles.naslovnaLink} ${styles.naslovnaLink1}`}
            >
              <div className={styles.naslovnicaOverly}></div>
              <div className={`${styles.naslovnica1}`}>
                <Image
                  src={data[0]?.featuredImage?.node?.sourceUrl}
                  fill
                  sizes="auto"
                  priority={true}
                  alt={data[0]?.title}
                />
                <div className={styles.datumKoment}>
                  <h3>{data[0]?.title}</h3>
                  <div>
                    <span>{formatDateToCroatian(data[0]?.date)}</span> |{" "}
                    <span>
                      {data[0]?.comments?.nodes?.length} <FaComments />
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            <div
              className={`${styles.grid2Vijesti} ${styles.grid2VijestiOstale}`}
            >
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
