import { getSinglePost } from "@/app/lib/service";
import Image from "next/image";
import styles from "../../css/mainCss/mainStyle.module.css";
import { revalidatePath } from "next/cache";

const SinglePost = async ({ slug, category }: any) => {
  revalidatePath(`/${category}`);
  const thePost = await getSinglePost(slug);

  return (
    <div>
      <div className={styles.singlePostHeader}>
        <h1>{thePost?.title}</h1>
        <span>{thePost?.date}</span>
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
      <div dangerouslySetInnerHTML={{ __html: thePost?.content }}></div>
    </div>
  );
};

export default SinglePost;
