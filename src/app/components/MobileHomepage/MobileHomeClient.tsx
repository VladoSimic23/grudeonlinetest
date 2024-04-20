"use client";
import { useCustomSWR3 } from "@/app/lib/api";
import { temporaryApiUrl } from "@/app/lib/fetchDb";
import React, { useCallback, useEffect, useRef, useState } from "react";
import mobileStyles from "../../css/mobile/mobile.module.css";
import Link from "next/link";
import { FaComments } from "react-icons/fa";
import Image from "next/image";
import { formatDateToCroatian } from "@/app/lib/utils";
import { daysInWeek } from "date-fns/constants";
import { categoryStyles } from "@/app/lib/helpers";

const MobileHomeClient = () => {
  const [numOfPosts, setPostNum] = useState(10);
  const [theData, setTheData] = useState<any[]>([]);
  const url = temporaryApiUrl; // Replace with your actual API endpoint
  const category = "Grude Online";
  const [prevData, setPrevData] = useState<any[]>([]);
  const buttonRef: any = useRef(null);
  const [morePostsLoading, setMorePostsLoading] = useState(false);
  console.log(theData);

  // Use the custom SWR hook with the URL, category, and numberOfPosts
  const { data, error, isLoading } = useCustomSWR3({
    url,
    category,
    numOfPosts,
  });

  const handleScrollToLastPost = useCallback(() => {
    if (prevData.length > 0) {
      const lastPostIndex = prevData.length - 4;
      setTimeout(() => {
        scrollToPost(lastPostIndex);
      }, 100);
    }
  }, [prevData]);

  useEffect(() => {
    handleScrollToLastPost();
  }, [data, handleScrollToLastPost]);

  const handleClick = () => {
    setMorePostsLoading(true);

    setPrevData([...theData]);
    setPostNum((prev) => prev + 5);
    setTheData(data);
    // setTimeout(() => {
    //   setMorePostsLoading(false);
    // }, 500);
  };

  const scrollToPost = (postNum: any) => {
    const postElement = document.getElementById(`post-${postNum}`);
    if (postElement) {
      postElement.scrollIntoView({
        behavior: "instant",
      });
    }
  };
  // const handleClick = () => {
  //   setPostNum((prevNum) => prevNum + 5);
  //   setTheData(data);
  // };

  // useEffect(() => {
  //   // Preserve scroll position
  //   const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  //   // Scroll to preserved position after updating
  //   window.scrollTo(0, scrollPosition);
  // }, [theData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Loading more posts not available</div>;
  if (!theData) return <div>No data available</div>;
  // if (morePostsLoading) {
  //   return (
  //     <div className={mobileStyles.loadingMorePosts}>Loading more posts...</div>
  //   );
  // }
  return (
    <div className={mobileStyles.mobilePost}>
      {theData.slice(5).map((item: any, index: number) => {
        return (
          <div
            id={`post-${index + 1}`}
            key={index}
            className={mobileStyles.singleMobilePost}
          >
            <div className={mobileStyles.singleMobilePostTop}>
              <Link
                href={`/${item?.slug}`}
                className={mobileStyles.mobilePostLink}
              >
                <Image
                  src={item?.featuredImage?.node?.sourceUrl}
                  width={190}
                  height={200}
                  // fill
                  // sizes="(max-width: 768px) 100vw, 33vw"
                  //box-shadow: 0px 0px 30px -10px #80007e
                  // style={{
                  //   boxShadow: `0px 10px 10px -13px ${
                  //     categoryStyles.find(
                  //       (style) =>
                  //         style.cat === item.categories.edges[0]?.node.slug
                  //     )?.color || "black"
                  //   }`,
                  // }}
                  alt={item.title}
                  priority={true}
                />
                <span
                  style={{
                    background: `${
                      categoryStyles.find(
                        (style) =>
                          style.cat === item.categories.edges[0]?.node.slug
                      )?.color || "black"
                    }`,
                  }}
                  className={mobileStyles.categoryImgTag}
                >
                  {item.categories.edges[0]?.node.slug}
                </span>
              </Link>
              <h4>
                <Link href={`/${item?.slug}`}>{item?.title}</Link>
              </h4>
            </div>
            <div className={mobileStyles.singleMobilePostBottom}>
              <span
                style={{
                  borderBottom: `1px solid ${
                    categoryStyles.find(
                      (style) =>
                        style.cat === item.categories.edges[0]?.node.slug
                    )?.color || "black"
                  }`,
                }}
              >
                {formatDateToCroatian(item?.date)}
              </span>
              <span>
                {item?.comments?.nodes?.length} <FaComments />
              </span>
            </div>
          </div>
        );
      })}
      <div className={mobileStyles.loadMoreBtn}>
        <button ref={buttonRef} onClick={handleClick}>
          Učitaj Više Objava
        </button>
      </div>
    </div>
  );
};

export default MobileHomeClient;
