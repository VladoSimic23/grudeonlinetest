"use client";
import useWindowSize from "@/app/lib/useWindowSize";
import Link from "next/link";
import nasStyles from "../../../css/naslovnicaCss/naslovnica.module.css";
import styles from "../../../css/mainCss/mainStyle.module.css";
import Image from "next/image";
import SportNaslovnaDetails from "./SportNaslovnaDetails";
import { temporaryApiUrl } from "@/app/lib/fetchDb";
import { useCustomSWR } from "@/app/lib/api";

const SportNaslovna = () => {
  const isMobile = useWindowSize();
  const url = temporaryApiUrl; // Replace with your actual API endpoint
  const category = "Sport";
  const numOfPosts = 10;

  // Use the custom SWR hook with the URL, category, and numberOfPosts
  const { data, error, isLoading } = useCustomSWR({
    url,
    category,
    numOfPosts,
  });

  if (isMobile) {
    return;
  }
  if (isMobile === undefined) {
    return null;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className={nasStyles.gospSportMargin}>
      <h3 className={nasStyles.naslovnicaHeading}>
        <Link href={`/category/sport`}>SPORT</Link>
      </h3>
      <div>
        <div className={nasStyles.sportBorder}>
          <div className={nasStyles.naslovnaOverlay}>
            <Link href={`/${data[0].slug}`}>
              <div className={nasStyles.imageOverlay}></div>
              <Image
                src={data[0].featuredImage.node.sourceUrl}
                width={400}
                height={260}
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
            <span>{data[0].date}</span>
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
              return <SportNaslovnaDetails key={index} data={item} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default SportNaslovna;
