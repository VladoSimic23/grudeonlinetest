const CommentComponent = dynamic(
  () => import("@/app/components/Comments/CommentComponent"),
  {
    ssr: false,
  }
);
const CommentForm = dynamic(
  () => import("@/app/components/Comments/CommentsForm"),
  {
    ssr: false,
  }
);

import SinglePost from "@/app/components/SinglePost/SinglePost";
import TagsComponent from "@/app/components/Tags/TagsComp";
import { getAllPosts, getSinglePost } from "@/app/lib/service";
import { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { Suspense } from "react";
import styles from "../../../css/mainCss/mainStyle.module.css";
import Sidebar from "@/app/components/Sidebar/Sidebar";

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

  const post = await getSinglePost(slug);

  return {
    title: `${post?.title} - Grude Online`,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

const SingleSport = async ({ params }: any) => {
  const category = "sport";
  const { slug } = params;
  const thePost = await getSinglePost(slug);

  return (
    <div className={styles.grid23}>
      <div>
        <Suspense fallback={<h1>Loading Post...</h1>}>
          <SinglePost slug={slug} category={category} />
        </Suspense>
        <Suspense fallback={<h1>Loading Tags...</h1>}>
          <TagsComponent slug={slug} />
        </Suspense>

        {thePost?.commentStatus === "open" && (
          <CommentComponent post={thePost} />
        )}
        {thePost?.commentStatus === "open" && (
          <CommentForm slug={slug} id={thePost?.postId} />
        )}
        {thePost?.commentStatus === "closed" && <h1>Comments are closed!</h1>}
      </div>
      <Sidebar />
    </div>
  );
};

export default SingleSport;
