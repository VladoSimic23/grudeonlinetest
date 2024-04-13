import { getPostsByCategory } from "@/app/lib/service";
import Link from "next/link";
import React from "react";
import styles from "../../css/mainCss/mainStyle.module.css";
import categoryStyles from "../../css/categoryCss/categoryCss.module.css";
import Image from "next/image";
import { FaComments } from "react-icons/fa";
import { formatDateToCroatian } from "@/app/lib/utils";
import { isMobileDevice } from "@/app/lib/deviceCheck";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

export async function getData(category: string, nums: number) {
  const res = await getPostsByCategory(category, nums);

  if (!res) {
    throw new Error("Failed to fetch data..");
  }

  return res;
}

const PostList = async ({
  category,
  amount,
}: {
  category: string;
  amount: number;
}) => {
  const data = await getData(category, amount);
  const isMobile = isMobileDevice();
  return (
    <div>
      <div>
        {data.map((item: any, idx: number) => {
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
                    width={(isMobile && 190) || (!isMobile && 315) || 0}
                    //{isMobile && width={150}}
                    height={(isMobile && 200) || (!isMobile && 280) || 0}
                    // sizes="(max-width: 768px) 100vw, 992px"
                    // fill
                    priority={true}
                  />
                  <div className={styles.hoverOverlay}></div>
                </div>
              </Link>
              <div className={categoryStyles.flexCategory}>
                <Link href={`/${item.slug}`}>{item?.title}</Link>
                <div className={categoryStyles.flexDate}>
                  <span>{formatDateToCroatian(item?.date)}</span>
                  <p>
                    {item?.comments?.nodes?.length} <FaComments />
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
      </div>
    </div>
  );
};

export default PostList;
