"use server";
import Link from "next/link";
import nasStyles from "../../../css/naslovnicaCss/naslovnica.module.css";
import styles from "../../../css/mainCss/mainStyle.module.css";
import Image from "next/image";
import GrudeOnlineNaslovnaDetails from "./GrudeOnlineNaslovnaDetails";
import { formatDateToCroatian } from "@/app/lib/utils";
import { getPostsByCategory } from "@/app/lib/service";

const GrudeOnlineNaslovna = async () => {
  const data = await getPostsByCategory("grude-online", 5);

  return (
    <div>
      <h3 className={nasStyles.naslovnicaHeading}>
        <Link href={`/category/grude-online`}>GRUDE ONLINE</Link>
      </h3>
      <div className={nasStyles.grid2GrudeOnline}>
        <div>
          <div className={nasStyles.naslovnaOverlay}>
            <Link href={`/${data[0].slug}`}>
              <div className={nasStyles.imageOverlay}></div>
              <Image
                src={data[0].featuredImage.node.sourceUrl}
                width={300}
                height={200}
                alt={data[0].title}
                priority={true}
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
              __html: data[0]?.content?.slice(0, 190) + " ...",
            }}
          ></div>
        </div>
        <div>
          {data.map((item: any, index: number) => {
            if (index !== 0) {
              return <GrudeOnlineNaslovnaDetails key={index} data={item} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default GrudeOnlineNaslovna;
