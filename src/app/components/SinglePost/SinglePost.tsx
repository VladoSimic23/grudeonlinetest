import { getSinglePost } from "@/app/lib/service";
import Image from "next/image";
import styles from "../../css/mainCss/mainStyle.module.css";
import { formatDateToCroatian } from "@/app/lib/utils";
import cheerio from "cheerio";
import dynamic from "next/dynamic";
const SinglePostCarousel = dynamic(() => import("./SinglePostCarousel"), {
  ssr: false,
});

const SinglePost = async ({ slug }: any) => {
  const thePost = await getSinglePost(slug);
  const removedGal = cheerio.load(thePost?.content);
  removedGal(".gallery").remove();
  const modH = removedGal.html();
  const $ = cheerio.load(thePost?.content);
  console.log(thePost);

  // // Extract image URLs
  const images: any = [];

  $(".gallery img").each((index, element) => {
    images.push({
      src: $(element).attr("src"),
      width: $(element).attr("width"), // You may need to adjust how you retrieve width and height
      height: $(element).attr("height"),
    });
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
        dangerouslySetInnerHTML={{ __html: modH }}
      ></div>
      <SinglePostCarousel photos={images} />
    </div>
  );
};

export default SinglePost;
