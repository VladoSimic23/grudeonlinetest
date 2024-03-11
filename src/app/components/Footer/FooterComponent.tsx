import { getRecentComments, getRecentPosts } from "@/app/lib/service";
import React, { Suspense } from "react";
import styles from "../../css/mainCss/mainStyle.module.css";
import footerStyles from "../../css/footerCss/footerstyle.module.css";
import RecentComments from "../Recent/RecentComments";
import RecentPosts from "../Recent/RecentPosts";
import FooterLower from "./FooterLower";

const FooterComponent = async () => {
  const recentComments = await getRecentComments(5);
  const recentPosts = await getRecentPosts(5);

  return (
    <footer className={footerStyles.footerWrapper}>
      <div className={footerStyles.footerContainer}>
        <div className={styles.container}>
          <div className={styles.grid3}>
            <Suspense fallback={<h1>Loading recent comments...</h1>}>
              <RecentComments data={recentComments} />
            </Suspense>
            <Suspense fallback={<h1>Loading recent posts...</h1>}>
              <RecentPosts data={recentPosts} />
            </Suspense>
          </div>
        </div>
      </div>
      <FooterLower />
    </footer>
  );
};

export default FooterComponent;
