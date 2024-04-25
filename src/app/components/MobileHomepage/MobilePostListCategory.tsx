"use client";
import { useCustomSWR4 } from "@/app/lib/api";
import { temporaryApiUrl } from "@/app/lib/fetchDb";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import mobileStyles from "../../css/mobile/mobile.module.css";
import Link from "next/link";
import { FaComments } from "react-icons/fa";
import Image from "next/image";
import categoryStylesCss from "../../css/categoryCss/categoryCss.module.css";
import styles from "../../css/mainCss/mainStyle.module.css";
import { formatDateToCroatian } from "@/app/lib/utils";
import { categoryStyles } from "@/app/lib/helpers";

const MobilePostListCategory = ({ category }: { category: string }) => {
  const [numOfPosts, setPostNum] = useState(4);
  const [theData, setTheData] = useState<any[]>([]);
  const url = temporaryApiUrl; // Replace with your actual API endpoint
  const [prevData, setPrevData] = useState<any[]>([]);
  const buttonRef: any = useRef(null);

  // Use the custom SWR hook with the URL, category, and numberOfPosts
  const { data, error, isLoading } = useCustomSWR4({
    url,
    category,
    numOfPosts,
  });

  const handleScrollToLastPost = useCallback(() => {
    if (prevData.length > 0) {
      const lastPostIndex = prevData.length - 1;
      scrollToPost(lastPostIndex);
    }
  }, [prevData]);

  useEffect(() => {
    handleScrollToLastPost();
  }, [data, handleScrollToLastPost]);

  const handleClick = () => {
    setPostNum((prev) => prev + 1);
    setPrevData([...theData]);
    setTheData(data);
  };

  const scrollToPost = (postNum: any) => {
    const postElement = document.getElementById(`post-${postNum}`);
    if (postElement) {
      postElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Loading more posts not available</div>;
  if (!theData) return <div>No data available</div>;

  return (
    <div className={categoryStylesCss.postListPadding}>
      {theData.slice(2).map((item: any, idx: number) => {
        return (
          <div
            id={`post-${idx + 1}`}
            key={idx}
            className={`${categoryStylesCss.grid2PostList} ${categoryStylesCss.categoryPaddingBottom}`}
          >
            <Link href={`/${item.slug}`}>
              <div className={styles.relativeEle}>
                <Image
                  src={item.featuredImage.node.sourceUrl}
                  alt={item.title}
                  width={315}
                  height={280}
                  priority={true}
                />
                <div className={styles.hoverOverlay}></div>
              </div>
            </Link>
            <div className={categoryStylesCss.flexCategory}>
              <Link href={`/${item.slug}`}>{item.title}</Link>
              <div className={categoryStylesCss.flexDate}>
                <span
                  style={{
                    borderBottom: `1px solid ${
                      categoryStyles.find((style) => style.cat === category)
                        ?.color || "black"
                    }`,
                  }}
                >
                  {formatDateToCroatian(item?.date)}
                </span>
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
        <button ref={buttonRef} onClick={handleClick}>
          Učitaj Više Objava
        </button>
      </div>
    </div>
  );
};

export default MobilePostListCategory;
