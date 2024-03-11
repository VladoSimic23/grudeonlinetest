import { getPopularPosts } from "@/app/lib/service";
import React, { Suspense } from "react";
import SidebarPostList from "./SidebarPostList";

const Sidebar = async () => {
  const popularPosts = await getPopularPosts(5);

  return (
    <div>
      <Suspense fallback={<h1>Loading popular posts...</h1>}>
        <SidebarPostList data={popularPosts} />
      </Suspense>
    </div>
  );
};

export default Sidebar;
