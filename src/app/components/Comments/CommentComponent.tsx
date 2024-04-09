"use client";
import { useEffect, useState } from "react";
import commentStyles from "../../css/commentsCss/comments.module.css";
import Image from "next/image";
import { fetchClientComments } from "@/app/lib/fetchDb";

const CommentComponent = ({ post }: any) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchClientComments(post?.slug);
      setComments(data);
    };
    getData();
  }, [post?.slug]);

  if (!post?.comments?.nodes) {
    return <h1>Loading comments...</h1>;
  }

  return (
    <div className={commentStyles.commentsContainer}>
      <h2>Komentari : {comments?.length}</h2>
      {comments?.map((item: any, idx: number) => {
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
      })}
    </div>
  );
};

export default CommentComponent;

// "use client";
// import React, { useState } from "react";
// import commentStyles from "../../css/commentsCss/comments.module.css";
// import Image from "next/image";

// const CommentComponent = ({ post }: any) => {
//   //console.log(post);
//   const [isLiked, setIsLiked] = useState(false);
//   const [isDisliked, setIsDisliked] = useState(false);

//   const handleLike = async (commentId: number) => {
//     if (!isLiked) {
//       // Make a request to your WordPress backend to increment likeCount
//       const response = await fetch("http://localhost:10010/graphql", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ commentId }),
//       });

//       if (response.ok) {
//         setIsLiked(true);
//         setIsDisliked(false); // Reset dislike state if like is clicked
//       }
//     }
//   };

//   const handleDislike = async (commentId: number) => {
//     if (!isDisliked) {
//       // Make a request to your WordPress backend to increment dislikeCount
//       const response = await fetch("http://localhost:10010/graphql", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ commentId }),
//       });

//       if (response.ok) {
//         setIsLiked(false); // Reset like state if dislike is clicked
//         setIsDisliked(true);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>{post?.comments.nodes.length} Komentara</h2>
//       {post?.comments?.nodes.map((item: any, idx: number) => {
//         return (
//           <div key={idx} className={commentStyles.displayComments}>
//             <div>
//               <Image
//                 src={"/none.jpg"}
//                 width={60}
//                 height={60}
//                 alt="commentIcon"
//               />
//             </div>
//             <div className={commentStyles.commentDetails}>
//               <h4>{item.author.node.name}</h4>
//               <span>{item.date}</span>
//               <p>{item.content.replace(/<p>/g, "").replace(/<\/p>/g, "")}</p>
//             </div>
//             <button onClick={() => handleLike(item.commentId)}>
//               Like - {item.likeCount}
//             </button>
//             <button onClick={() => handleDislike(item.commentId)}>
//               Dislike - {item.dislikeCount}
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

//revalidatePath("/sport");
// const [likeCount, setLikeCount] = useState(

// );
// const [dislikeCount, setDislikeCount] = useState(
//   post?.comments.nodes.map((item: any) => item.dislikeCount) || []
// );

// const handleLike = async (commentId: number) => {
//   // Check if the user previously liked the comment
//   const userLiked = likeCount.includes(commentId);

//   try {
//     if (userLiked) {
//       // If the user previously liked, decrease likeCount and remove commentId from likeCount
//       setLikeCount((prev: any) => prev.filter((id: any) => id !== commentId));
//     } else {
//       // If the user didn't like before, increase likeCount and remove commentId from dislikeCount
//       setLikeCount((prev: any) => [...prev, commentId]);
//       setDislikeCount((prev: any) =>
//         prev.filter((id: any) => id !== commentId)
//       );
//     }

//     // Make a request to your WordPress backend to update likeCount
//     await fetchAPI(
//       `
//       mutation UpdateCommentLikes($input: UpdateCommentLikesInput!) {
//         updateCommentLikes(input: $input) {
//           comment {
//             likeCount
//           }
//         }
//       }

//     `,
//       { commentId }
//     );
//   } catch (error: any) {
//     console.error("Error updating like count:", error.message);
//   }
// };

// const handleDislike = async (commentId: number) => {
//   // Check if the user previously disliked the comment
//   const userDisliked = dislikeCount.includes(commentId);

//   try {
//     if (userDisliked) {
//       // If the user previously disliked, decrease dislikeCount and remove commentId from dislikeCount
//       setDislikeCount((prev: any) =>
//         prev.filter((id: any) => id !== commentId)
//       );
//     } else {
//       // If the user didn't dislike before, increase dislikeCount and remove commentId from likeCount
//       setDislikeCount((prev: any) => [...prev, commentId]);
//       setLikeCount((prev: any) => prev.filter((id: any) => id !== commentId));
//     }

//     // Make a request to your WordPress backend to update dislikeCount
//     await fetchAPI(
//       `
//       mutation UpdateDislikeCount($commentId: ID!) {
//         updateDislikeCount(commentId: $commentId) {
//           dislikeCount
//         }
//       }
//     `,
//       { commentId }
//     );
//   } catch (error: any) {
//     console.error("Error updating dislike count:", error.message);
//   }
// };

// Replace with your actual fetch API function
// const fetchAPI = async (query: any, variables: any) => {
//   const response = await fetch("http://localhost:10010/graphql", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ query, variables }),
//   });

//   const data = await response.json();

//   if (response.ok) {
//     return data.data;
//   } else {
//     throw new Error(`Error: ${data.errors[0].message}`);
//   }
// };
