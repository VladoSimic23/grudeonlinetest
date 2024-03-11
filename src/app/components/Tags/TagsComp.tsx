import { getSinglePost } from "@/app/lib/service";
import Link from "next/link";
import React from "react";
import styles from "../../css/mainCss/mainStyle.module.css";

export async function getData(slug: string) {
  const res = await getSinglePost(slug);

  if (!res) {
    throw new Error("Failed to fetch data");
  }

  return res;
}

const TagsComponent = async ({ slug }: { slug: string }) => {
  const post = await getData(slug);

  if (!post || !post.tags || !post.tags.nodes || post.tags.nodes.length === 0) {
    // Handle the case where tags are not available or empty.
    return null; // or return some default content/message
  }
  return (
    <div className={styles.tagsStyles}>
      {post?.tags?.nodes.map((tag: any, idx: number) => {
        const tagEdit = tag.name.split(" ").join("-").toLowerCase();
        return (
          <div key={idx}>
            <Link href={`/tag/${tagEdit}`}>{tag.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default TagsComponent;
