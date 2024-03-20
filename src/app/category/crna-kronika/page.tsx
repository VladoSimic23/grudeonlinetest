import PostList from "@/app/components/PostList/PostList";
import { Metadata } from "next";
import React, { Suspense } from "react";
import styles from "../../css/mainCss/mainStyle.module.css";
import MobilePostListCategory from "@/app/components/MobileHomepage/MobilePostListCategory";
//import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Arhiva Crna Kronika - Grude Online",
  description: "Generated by create next app",
};

const CrnaKronika = async () => {
  //revalidatePath("/gospodarstvo");
  return (
    <div className={styles.postList}>
      <h1 className={styles.headingEdit}>CRNA KRONIKA</h1>
      <Suspense>
        <PostList category={"crna-kronika"} amount={2} />
      </Suspense>
      <MobilePostListCategory category={"crna-kronika"} />
    </div>
  );
};

export default CrnaKronika;