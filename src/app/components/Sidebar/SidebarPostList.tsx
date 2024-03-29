import React from "react";
import styles from "../../css/mainCss/mainStyle.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaComments } from "react-icons/fa";

const SidebarPostList = async ({ data }: any) => {
  return (
    <div className={styles.sidebar}>
      <h4>POPULARNO</h4>
      {data?.map((item: any, index: number) => {
        return (
          <div key={index} className={styles.grid2}>
            <div>
              <Link href={`/${item?.slug}`}>
                <Image
                  src={item?.featuredImage?.node?.sourceUrl}
                  alt={item?.title}
                  width={100}
                  height={100}
                  quality={80}
                  priority={false}
                  loading={"lazy"}
                />
              </Link>
            </div>
            <div className={styles.flexSidebar}>
              <Link href={`/${item?.slug}`}>{item?.title}</Link>
              <span>
                {item?.comments?.nodes?.length} <FaComments />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SidebarPostList;
