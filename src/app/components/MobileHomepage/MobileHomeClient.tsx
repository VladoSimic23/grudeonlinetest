"use client";
import { useCustomSWR3 } from "@/app/lib/api";
import { temporaryApiUrl } from "@/app/lib/fetchDb";
import React, { useCallback, useEffect, useRef, useState } from "react";
import mobileStyles from "../../css/mobile/mobile.module.css";
import Link from "next/link";
import { FaComments } from "react-icons/fa";
import Image from "next/image";
import { formatDateToCroatian } from "@/app/lib/utils";
import defaultImage from "../../../../public/noImage.jpg";
import { categoryStyles } from "@/app/lib/helpers";
import MobileHomeClientDetails from "./MobileHomeClientDetails";

const MobileHomeClient = () => {
  const [numOfPosts, setPostNum] = useState(10);
  const [theData, setTheData] = useState<any[]>([]);
  const url = temporaryApiUrl; // Replace with your actual API endpoint
  const category = "Grude Online";
  const [prevData, setPrevData] = useState<any[]>([]);
  const buttonRef: any = useRef(null);
  const [loadingEnd, setLoadingEnd] = useState(true);

  // Use the custom SWR hook with the URL, category, and numberOfPosts
  const { data, error, isLoading } = useCustomSWR3({
    url,
    category,
    numOfPosts,
  });

  const handleScrollToLastPost = useCallback(() => {
    if (prevData.length > 0) {
      const lastPostIndex = prevData.length - 4;
      //setTimeout(() => {
      scrollToPost(lastPostIndex);
      //}, 100);
    }
  }, [prevData]);

  // useEffect(() => {
  //   if (isLoading) {
  //     setLoadingEnd(true);
  //   }
  //   if (!isLoading) {
  //     setTimeout(() => {
  //       setLoadingEnd(false);
  //     }, 1000);
  //   }
  // }, [isLoading]);

  useEffect(() => {
    handleScrollToLastPost();
  }, [data, handleScrollToLastPost]);

  const handleClick = () => {
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

  if (isLoading)
    return (
      <div className={mobileStyles.loadMoreLoading}>
        <h2>
          <span></span>
          <span></span>
          <span></span>
        </h2>
      </div>
    );
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
          <MobileHomeClientDetails key={index} item={item} index={index} />
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
