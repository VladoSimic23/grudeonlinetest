import { getRecentPostsHomepage } from "@/app/lib/service";
import Image from "next/image";
import Link from "next/link";
import mobileStyles from "../../css/mobile/mobile.module.css";
import { FaComments } from "react-icons/fa";
import { revalidatePath } from "next/cache";

const MobileComponent = async () => {
  //revalidatePath("/");
  const data = await getRecentPostsHomepage(2);

  return (
    <div className={mobileStyles.mobilePost}>
      {data.map((item: any, index: number) => {
        return (
          <div key={index} className={mobileStyles.singleMobilePost}>
            <div className={mobileStyles.singleMobilePostTop}>
              <Link href={`/${item?.slug}`}>
                <Image
                  src={item?.featuredImage?.node?.sourceUrl}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  // width={100}
                  // height={80}
                  alt={item.title}
                  priority={true}
                />
              </Link>
              <h4>
                <Link href={`/${item?.slug}`}>{item?.title}</Link>
              </h4>
            </div>
            <div className={mobileStyles.singleMobilePostBottom}>
              <span>{item?.date}</span>
              <span>
                {item?.comments?.nodes?.length} <FaComments />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MobileComponent;
