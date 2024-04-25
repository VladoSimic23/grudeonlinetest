import PostList from "@/app/components/PostList/PostList";
import { Metadata } from "next";
import React, { Suspense } from "react";
import styles from "../../css/mainCss/mainStyle.module.css";
import MobilePostListCategory from "@/app/components/MobileHomepage/MobilePostListCategory";
import Sidebar from "@/app/components/Sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Arhiva Crna Kronika - Grude Online",
  description: "Generated by create next app",
};

const CrnaKronika = async () => {
  return (
    <div className={`${styles.postList} ${styles.grid23}`}>
      <div>
        <h1 className={styles.headingEdit}>
          <span
            style={{
              borderBottom: "1px solid darkslategray",
              paddingBottom: "5px",
            }}
          >
            CRNA KRONIKA
          </span>
        </h1>
        <Suspense>
          <PostList category={"crna-kronika"} amount={2} />
        </Suspense>
        <MobilePostListCategory category={"crna-kronika"} />
      </div>
      <Sidebar />
    </div>
  );
};

export default CrnaKronika;
