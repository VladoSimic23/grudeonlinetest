"use client";
import { useCustomSWR3 } from "@/app/lib/api";
import { temporaryApiUrl } from "@/app/lib/fetchDb";
import React, { useState } from "react";
import mobileStyles from "../../css/mobile/mobile.module.css";
import Link from "next/link";
import { FaComments } from "react-icons/fa";
import Image from "next/image";
import { formatDateToCroatian } from "@/app/lib/utils";

const MobileHomeClient = () => {
  const [numOfPosts, setPostNum] = useState(4);
  const [theData, setTheData] = useState<any[]>([]);
  const url = temporaryApiUrl; // Replace with your actual API endpoint
  const category = "Grude Online";
  //const numOfPosts = 5;

  // Use the custom SWR hook with the URL, category, and numberOfPosts
  const { data, error, isLoading } = useCustomSWR3({
    url,
    category,
    numOfPosts,
  });

  const handleClick = () => {
    setPostNum((prev) => prev + 2);
    setTheData(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
  if (!theData) return <div>No data available</div>;

  return (
    <div className={mobileStyles.mobilePost}>
      {theData.slice(2).map((item: any, index: number) => {
        return (
          <div key={index} className={mobileStyles.singleMobilePost}>
            <div className={mobileStyles.singleMobilePostTop}>
              <Link href={`/${item?.slug}`}>
                <Image
                  src={item?.featuredImage?.node?.sourceUrl}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  alt={item.title}
                  priority={true}
                />
              </Link>
              <h4>
                <Link href={`/${item?.slug}`}>{item?.title}</Link>
              </h4>
            </div>
            <div className={mobileStyles.singleMobilePostBottom}>
              <span>{formatDateToCroatian(item?.date)}</span>
              <span>
                {item?.comments?.nodes?.length} <FaComments />
              </span>
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

export default MobileHomeClient;
