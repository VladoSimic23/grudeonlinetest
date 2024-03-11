import CommentComponent from "@/app/components/Comments/CommentComponent";
import CommentForm from "@/app/components/Comments/CommentsForm";
import SinglePost from "@/app/components/SinglePost/SinglePost";
import TagsComponent from "@/app/components/Tags/TagsComp";
import { getAllPosts, getSinglePost } from "@/app/lib/service";
import { revalidatePath } from "next/cache";
import React, { Suspense } from "react";

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

const SingleVijesti = async ({ params }: any) => {
  const category = "vijesti";
  //revalidatePath(`/${category}`);
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
      <Suspense>
        <CommentComponent post={thePost} />
      </Suspense>
      <Suspense>
        <CommentForm slug={slug} id={thePost?.postId} />
      </Suspense>
    </div>
  );
};

export default SingleVijesti;
