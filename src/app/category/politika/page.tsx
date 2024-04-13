import PostList from "@/app/components/PostList/PostList";
import { Metadata } from "next";
import React, { Suspense } from "react";
import styles from "../../css/mainCss/mainStyle.module.css";
import MobilePostListCategory from "@/app/components/MobileHomepage/MobilePostListCategory";
import Sidebar from "@/app/components/Sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Arhiva Politika - Grude Online",
  description: "Generated by create next app",
};

const Politika = async () => {
  return (
    <div className={`${styles.postList} ${styles.grid23}`}>
      <div>
        <h1 className={styles.headingEdit}>POLITIKA</h1>
        <Suspense>
          <PostList category={"politika"} amount={2} />
        </Suspense>
        <MobilePostListCategory category={"politika"} />
      </div>
      <Sidebar />
    </div>
  );
};

export default Politika;
