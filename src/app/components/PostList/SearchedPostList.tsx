import Link from "next/link";
import React from "react";
import styles from "../../css/mainCss/mainStyle.module.css";
import categoryStyles from "../../css/categoryCss/categoryCss.module.css";
import Image from "next/image";
import { formatDateToCroatian } from "@/app/lib/utils";
import { FaComments } from "react-icons/fa";

const SearchedPostList = ({ data }: { data: any }) => {
  return (
    <div>
      {data?.map((item: any, idx: number) => {
        return (
          <div
            key={idx}
            className={`${categoryStyles.grid2PostList} ${categoryStyles.categoryPaddingBottom}`}
          >
            <Link href={`/${item?.slug}`}>
              <div className={styles.relativeEle}>
                <Image
                  src={item?.featuredImage?.node?.sourceUrl}
                  alt={item?.title}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  fill
                  priority={true}
                />
                <div className={styles.hoverOverlay}></div>
              </div>
            </Link>
            <div className={categoryStyles.flexCategory}>
              <Link href={`/${item?.slug}`}>{item?.title}</Link>
              <div className={categoryStyles.flexDate}>
                <span>{formatDateToCroatian(item?.date)}</span>
                <p>
                  {item.comments.nodes.length} <FaComments />
                </p>
              </div>
              <div
                className={styles.dangerHtml}
                dangerouslySetInnerHTML={{
                  __html: item?.content?.slice(0, 190) + " ...",
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchedPostList;
