import PostList from "@/app/components/PostList/PostList";
import { Metadata } from "next";
import React, { Suspense } from "react";
import styles from "../../css/mainCss/mainStyle.module.css";
import MobilePostListCategory from "@/app/components/MobileHomepage/MobilePostListCategory";
import Sidebar from "@/app/components/Sidebar/Sidebar";
//import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Arhiva Lifestyle - Grude Online",
  description: "Generated by create next app",
};

const Lifestyle = async () => {
  //revalidatePath("/gospodarstvo");
  return (
    <div className={`${styles.postList} ${styles.grid23}`}>
      <div>
        <h1 className={styles.headingEdit}>LIFESTYLE</h1>
        <Suspense>
          <PostList category={"lifestyle"} amount={2} />
        </Suspense>
        <MobilePostListCategory category={"lifestyle"} />
      </div>
      <Sidebar />
    </div>
  );
};

export default Lifestyle;
