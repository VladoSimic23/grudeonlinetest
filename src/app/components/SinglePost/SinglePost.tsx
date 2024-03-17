import { getSinglePost } from "@/app/lib/service";
import Image from "next/image";
import styles from "../../css/mainCss/mainStyle.module.css";
import { revalidatePath } from "next/cache";
import { formatDateToCroatian } from "@/app/lib/utils";

const SinglePost = async ({ slug, category }: any) => {
  //revalidatePath(`/${category}`);
  const thePost = await getSinglePost(slug);

  return (
    <div>
      <div className={styles.singlePostHeader}>
        <h1>{thePost?.title}</h1>
        <span>{formatDateToCroatian(thePost?.date)}</span>
      </div>
      <div className={styles.heroEle}>
        <Image
          src={thePost?.featuredImage?.node?.sourceUrl}
          alt={thePost?.title}
          sizes="1000px"
          fill
          priority={true}
          fetchPriority="high"
        />
      </div>
      <div
        className={styles.wpEditorContent}
        dangerouslySetInnerHTML={{ __html: thePost?.content }}
      ></div>
    </div>
  );
};

export default SinglePost;
