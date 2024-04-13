import CommentComponent from "@/app/components/Comments/CommentComponent";
import CommentForm from "@/app/components/Comments/CommentsForm";
import SinglePost from "@/app/components/SinglePost/SinglePost";
import TagsComponent from "@/app/components/Tags/TagsComp";
import { getAllPosts, getSinglePost } from "@/app/lib/service";
import React, { Suspense } from "react";

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

const SinglePolitika = async ({ params }: any) => {
  const category = "politika";
  const { slug } = params;
  const thePost = await getSinglePost(slug);

  return (
    <div>
      <Suspense>
        <SinglePost slug={slug} category={category} />
      </Suspense>
      <Suspense>
        <TagsComponent slug={slug} />
      </Suspense>
      {thePost?.commentStatus === "open" && <CommentComponent post={thePost} />}
      {thePost?.commentStatus === "open" && (
        <CommentForm slug={slug} id={thePost?.postId} />
      )}
      {thePost?.commentStatus === "closed" && <h1>Comments are closed!</h1>}
    </div>
  );
};

export default SinglePolitika;
