"use client";
import Link from "next/link";
import { FaComments } from "react-icons/fa";
import Image from "next/image";
import { formatDateToCroatian } from "@/app/lib/utils";
import defaultImage from "../../../../public/noImage.jpg";
import { categoryStyles } from "@/app/lib/helpers";
import mobileStyles from "../../css/mobile/mobile.module.css";
import cheerio from "cheerio";
import { MdOutlinePhotoCamera, MdOndemandVideo } from "react-icons/md";

const MobileHomeClientDetails = ({ item, index }: any) => {
  const $ = cheerio.load(item?.content);

  // Check if the HTML contains elements with class 'gallery'
  const hasGallery = $(".gallery").length > 0;

  // Check if the HTML contains a video element
  const hasVideo = $("iFrame").length > 0;

  return (
    <div
      id={`post-${index + 1}`}
      key={index}
      className={mobileStyles.singleMobilePost}
    >
      <div className={mobileStyles.singleMobilePostTop}>
        <Link href={`/${item?.slug}`} className={mobileStyles.mobilePostLink}>
          <Image
            src={
              item?.featuredImage?.node?.sourceUrl
                ? item?.featuredImage?.node?.sourceUrl
                : defaultImage
            }
            width={190}
            height={200}
            alt={item.title}
            priority={true}
          />
          <span
            style={{
              background: `${
                categoryStyles.find(
                  (style) => style.cat === item.categories.edges[0]?.node.slug
                )?.color || "black"
              }`,
            }}
            className={mobileStyles.categoryImgTag}
          >
            {item.categories.edges[0]?.node.slug}
          </span>
          {hasGallery && (
            <span
              className={`${mobileStyles.hasPhoto} ${
                !hasVideo && mobileStyles.floatRight
              }`}
              style={{
                background: `${
                  categoryStyles.find(
                    (style) => style.cat === item.categories.edges[0]?.node.slug
                  )?.color || "black"
                }`,
              }}
            >
              <MdOutlinePhotoCamera />
            </span>
          )}
          {hasVideo && (
            <span
              className={`${mobileStyles.hasVideo} ${
                !hasGallery && mobileStyles.floatRight
              }`}
              style={{
                background: `${
                  categoryStyles.find(
                    (style) => style.cat === item.categories.edges[0]?.node.slug
                  )?.color || "black"
                }`,
              }}
            >
              <MdOndemandVideo />
            </span>
          )}
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
                (style) => style.cat === item.categories.edges[0]?.node.slug
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
};

export default MobileHomeClientDetails;
