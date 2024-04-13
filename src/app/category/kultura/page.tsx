import PostList from "@/app/components/PostList/PostList";
import { Metadata } from "next";
import React, { Suspense } from "react";
import styles from "../../css/mainCss/mainStyle.module.css";
import MobilePostListCategory from "@/app/components/MobileHomepage/MobilePostListCategory";
import Sidebar from "@/app/components/Sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Arhiva Kultura - Grude Online",
  description: "Generated by create next app",
};

const Kultura = async () => {
  return (
    <div className={`${styles.postList} ${styles.grid23}`}>
      <div>
        <h1 className={styles.headingEdit}>KULTURA</h1>
        <Suspense>
          <PostList category={"kultura"} amount={2} />
        </Suspense>
        <MobilePostListCategory category={"kultura"} />
      </div>
      <Sidebar />
    </div>
  );
};

export default Kultura;
