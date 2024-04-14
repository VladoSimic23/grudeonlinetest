"use server";
import React from "react";
import commentStyles from "../../css/commentsCss/comments.module.css";
import Image from "next/image";
import { isMobileDevice } from "@/app/lib/deviceCheck";

const CommentDetails = ({ item }: any) => {
  const isMobile = isMobileDevice();

  return (
    <div className={commentStyles.commentWrapper}>
      <div className={commentStyles.displayComments}>
        {isMobile && (
          <div>
            <div className={commentStyles.mobileComments}>
              <Image
                src={"/none.jpg"}
                width={60}
                height={60}
                alt="commentIcon"
              />{" "}
              <div>
                <h4>{item?.author?.node?.name}</h4>
                <span>{item?.date}</span>
              </div>{" "}
            </div>
            <div className={commentStyles.mobileCommentsContent}>
              <p>{item?.content.replace(/<p>/g, "").replace(/<\/p>/g, "")}</p>{" "}
            </div>
          </div>
        )}
        {!isMobile && (
          <>
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
          </>
        )}
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
};

export default CommentDetails;
