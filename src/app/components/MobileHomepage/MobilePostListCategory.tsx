"use client";
import { useCustomSWR4 } from "@/app/lib/api";
import { temporaryApiUrl } from "@/app/lib/fetchDb";
import React, { useState } from "react";
import mobileStyles from "../../css/mobile/mobile.module.css";
import Link from "next/link";
import { FaComments } from "react-icons/fa";
import Image from "next/image";
import categoryStyles from "../../css/categoryCss/categoryCss.module.css";
import styles from "../../css/mainCss/mainStyle.module.css";
import { formatDateToCroatian } from "@/app/lib/utils";

const MobilePostListCategory = ({ category }: { category: string }) => {
  const [numOfPosts, setPostNum] = useState(4);
  const [theData, setTheData] = useState<any[]>([]);
  const url = temporaryApiUrl; // Replace with your actual API endpoint

  // Use the custom SWR hook with the URL, category, and numberOfPosts
  const { data, error, isLoading } = useCustomSWR4({
    url,
    category,
    numOfPosts,
  });

  const handleClick = () => {
    setPostNum((prev) => prev + 2);
    setTheData(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Loading more posts not available</div>;
  if (!theData) return <div>No data available</div>;

  return (
    <div>
      {theData.slice(2).map((item: any, idx: number) => {
        return (
          <div
            key={idx}
            className={`${categoryStyles.grid2PostList} ${categoryStyles.categoryPaddingBottom}`}
          >
            <Link href={`/${item.slug}`}>
              <div className={styles.relativeEle}>
                <Image
                  src={item.featuredImage.node.sourceUrl}
                  alt={item.title}
                  sizes="(max-width: 640px) 150px, (max-width: 768px) 300px"
                  fill
                  priority={true}
                />
                <div className={styles.hoverOverlay}></div>
              </div>
            </Link>
            <div className={categoryStyles.flexCategory}>
              <Link href={`/${item.slug}`}>{item.title}</Link>
              <div className={categoryStyles.flexDate}>
                <span>{formatDateToCroatian(item?.date)}</span>
                <p>
                  {item.comments.nodes.length} <FaComments />
                </p>
              </div>
              <div
                className={styles.dangerHtml}
                dangerouslySetInnerHTML={{
                  __html: item?.content.slice(0, 190) + " ...",
                }}
              ></div>
            </div>
          </div>
        );
      })}
      <div className={mobileStyles.loadMoreBtn}>
        <button onClick={handleClick}>Učitaj Više Objava</button>
      </div>
    </div>
  );
};

export default MobilePostListCategory;
