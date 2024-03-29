import Sidebar from "@/app/components/Sidebar/Sidebar";
import TagDetails from "@/app/components/Tags/TagDetails";
import { getAllPosts } from "@/app/lib/service";
import { Metadata, ResolvingMetadata } from "next";
import styles from "../../../css/mainCss/mainStyle.module.css";
import React, { Suspense } from "react";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params;
  const { slug }: any = id;

  return {
    title: `Arhiva ${decodeURIComponent(slug)} - Grude Online`,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post: any) => ({
    slug: post?.slug,
  }));
}

const Tag = async ({ params }: any) => {
  const { slug } = params;

  const decodedTag = decodeURIComponent(slug);

  return (
    <div className={`${styles.postList} ${styles.grid23}`}>
      <div>
        <Suspense fallback={<h1>Loading...</h1>}>
          <TagDetails tag={decodedTag} />
        </Suspense>
      </div>
      <Sidebar />
    </div>
  );
};

export default Tag;
