import { Metadata } from "next";
import React, { Suspense } from "react";
import styles from "../../css/mainCss/mainStyle.module.css";
import PostList from "@/app/components/PostList/PostList";
import MobilePostListCategory from "@/app/components/MobileHomepage/MobilePostListCategory";
//import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Arhiva Vijesti - Grude Online",
  description: "Generated by create next app",
};

const Vijesti = () => {
  //revalidatePath("/vijesti");
  return (
    <div className={styles.postList}>
      <h1 className={styles.headingEdit}>VIJESTI</h1>
      <Suspense>
        <PostList category={"vijesti"} amount={2} />
      </Suspense>
      <MobilePostListCategory category={"vijesti"} />
    </div>
  );
};

export default Vijesti;