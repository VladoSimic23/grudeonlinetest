"use client";
import { useEffect, useState } from "react";
import commentStyles from "../../css/commentsCss/comments.module.css";
import Image from "next/image";
import { fetchClientComments } from "@/app/lib/fetchDb";
import CommentDetails, { CommentItem } from "./CommentDetails";

const CommentComponent = ({ post, isMobile }: any) => {
  const [comments, setComments] = useState<CommentItem[]>([]);

  useEffect(() => {
    if (post?.slug) {
      const getData = async () => {
        const data = await fetchClientComments(post?.slug);
        setComments(data);
      };
      getData();
    }
  }, [post?.slug]);

  if (!post?.comments?.nodes) {
    return <h1>Loading comments...</h1>;
  }

  return (
    <div className={commentStyles.commentsContainer}>
      <h2>Komentari : {comments?.length}</h2>
      {/* {comments?.map((item: any, idx: number) => {
        return (
          <div key={idx} className={commentStyles.commentWrapper}>
            <div className={commentStyles.displayComments}>
              <div>
                <Image
                  src={"/none.jpg"}
                  width={60}
                  height={60}
                  alt="commentIcon"
                />
              </div>
              <div className={commentStyles.commentDetails}>
                <h4>{item?.author?.node?.name}</h4>
                <span>{item?.date}</span>
                <p>{item?.content.replace(/<p>/g, "").replace(/<\/p>/g, "")}</p>
              </div>
            </div>

            <div>
              <button>
                <Image
                  src={"/icons8-like-30.png"}
                  width={20}
                  height={20}
                  alt="dislike"
                />
              </button>
              <button>
                <Image
                  src={"/icons8-dislike-30.png"}
                  width={20}
                  height={20}
                  alt="like"
                />
              </button>
            </div>
          </div>
        );
      })} */}
      {comments.length > 0 &&
        comments?.map((item: CommentItem, idx: number) => {
          if (!item) {
            return;
          }
          return <CommentDetails key={idx} item={item} isMobile={isMobile} />;
        })}
    </div>
  );
};

export default CommentComponent;
