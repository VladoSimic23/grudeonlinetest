import { getRecentPostsHomepage } from "@/app/lib/service";
import Image from "next/image";
import Link from "next/link";
import mobileStyles from "../../css/mobile/mobile.module.css";
import { FaComments } from "react-icons/fa";
import { formatDateToCroatian } from "@/app/lib/utils";
import { categoryStyles } from "@/app/lib/helpers";

const MobileComponent = async () => {
  const data = await getRecentPostsHomepage(5);

  return (
    <div className={mobileStyles.mobilePost}>
      <h2 className={mobileStyles.mobilePostHeading}>Najnovije</h2>
      {data.map((item: any, index: number) => {
        return (
          <div key={index} className={mobileStyles.singleMobilePost}>
            <div className={mobileStyles.singleMobilePostTop}>
              <Link
                href={`/${item?.slug}`}
                className={mobileStyles.mobilePostLink}
              >
                <Image
                  src={item?.featuredImage?.node?.sourceUrl}
                  width={190}
                  height={200}
                  alt={item.title}
                  priority={true}
                />
                <span
                  style={{
                    background: `${
                      categoryStyles.find(
                        (style) =>
                          style.cat === item.categories.edges[0]?.node.slug
                      )?.color || "black"
                    }`,
                  }}
                  className={mobileStyles.categoryImgTag}
                >
                  {item.categories.edges[0]?.node.slug}
                </span>
              </Link>
              <h4>
                <Link href={`/${item?.slug}`}>{item?.title}</Link>
              </h4>
            </div>
            <div className={mobileStyles.singleMobilePostBottom}>
              <span
                style={{
                  borderBottom: `1px solid ${
                    categoryStyles.find(
                      (style) =>
                        style.cat === item.categories.edges[0]?.node.slug
                    )?.color || "black"
                  }`,
                }}
              >
                {formatDateToCroatian(item?.date)}
              </span>
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
