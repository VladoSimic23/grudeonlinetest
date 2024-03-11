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
import { revalidatePath, revalidateTag } from "next/cache";
import dynamic from "next/dynamic";
import React from "react";
import { Suspense } from "react";

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
  revalidatePath(`/${category}/${slug}`);
  const thePost = await getSinglePost(slug);

  return (
    <div>
      <Suspense fallback={<h1>Loading Post...</h1>}>
        <SinglePost slug={slug} category={category} />
      </Suspense>
      <Suspense fallback={<h1>Loading Tags...</h1>}>
        <TagsComponent slug={slug} />
      </Suspense>

      <CommentComponent post={thePost} />

      <CommentForm slug={slug} id={thePost?.postId} />
    </div>
  );
};

export default SingleSport;
