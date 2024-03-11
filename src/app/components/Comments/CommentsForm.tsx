// components/CommentForm.js
"use client";
import { submitComment } from "@/app/lib/service";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";
import commentStyles from "../../css/commentsCss/comments.module.css";

const CommentForm = ({ slug, id }: any) => {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setdislikes] = useState(0);
  //console.log(id, comment, username);
  const formattedComment = comment.replace(/\n/g, "\\n");

  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  //   useEffect(() => {

  //     await submitComment(id, formattedComment, username);
  //   },[formattedComment, id, username])

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await submitComment(id, formattedComment, username);
      window.location.reload();
      // Optionally, you can handle success or trigger a reload here if needed
      // window.location.reload();
    } catch (error) {
      console.error("Error submitting comment:", error);
      // Handle error as needed
    }

    setComment("");
    setUsername("");
  };

  return (
    <form onSubmit={handleSubmit} className={commentStyles.commentForm}>
      <h2>Ostavi komentar</h2>
      <textarea
        placeholder="Tvoj komentar..."
        value={comment}
        onChange={handleCommentChange}
        rows={5}
      />
      <br />
      <input
        placeholder="Ime"
        type="text"
        value={username}
        onChange={handleUsernameChange}
      />
      <br />
      {/* <span onClick={() => setLikes(likes + 1)}>{likes}</span> */}
      <div>
        <button type="submit">SUBMIT</button>
      </div>
    </form>
  );
};

export default CommentForm;
