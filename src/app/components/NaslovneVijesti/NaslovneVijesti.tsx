"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "../../css/mainCss/mainStyle.module.css";
import NaslovneVijestiDetails from "./NaslovneVijestiDetails";
import Link from "next/link";
import useWindowSize from "@/app/lib/useWindowSize";
import { temporaryApiUrl } from "@/app/lib/fetchDb";
import { useCustomSWR2 } from "@/app/lib/api";

const NaslovneVijesti = () => {
  //const [vijesti, setVijesti] = useState<any[]>([]);
  //const numOfPosts = 5;
  const path = usePathname();
  //const isBelow992 = useWindowSize();

  const isMobile = useWindowSize();
  const url = temporaryApiUrl; // Replace with your actual API endpoint
  const category = "any";
  const numOfPosts = 5;

  // Use the custom SWR hook with the URL, category, and numberOfPosts
  const { data, error, isLoading } = useCustomSWR2({
    url,
    category,
    numOfPosts,
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:10010/graphql", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           query: `
  //             {
  //               posts(first: ${numOfPosts}) {
  //                 nodes {
  //                   title
  //                   date
  //                   slug
  //                   featuredImage {
  //                       node {
  //                         sourceUrl(size: LARGE)
  //                       }
  //                     }
  //                     comments {
  //                       nodes {

  //                         date
  //                       }
  //                     }
  //                 }
  //               }
  //             }
  //           `,
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const result = await response.json();
  //       setVijesti(result.data.posts.nodes);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [numOfPosts]);

  if (path !== "/") {
    return;
  }
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
    <div className={styles.naslovnicaWrap}>
      <div className={styles.naslovnicaContainer}>
        <div className={styles.grid2Vijesti}>
          <Link href={`/${data[0].slug}`}>
            <div className={styles.naslovnicaOverly}></div>
            <div
              className={`${styles.naslovnica1}`}
              style={{
                backgroundImage: `url(${data[0].featuredImage.node.sourceUrl})`,
              }}
            >
              <div className={styles.datumKoment}>
                <h3>{data[0].title}</h3>
                <div>
                  <span>{data[0].date}</span> |{" "}
                  <span>{data[0].comments.nodes.length} komentara</span>
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
  );
};

export default NaslovneVijesti;
