import { getPostsByCategory } from "@/app/lib/service";
import React from "react";
import Image from "next/image";
import styles from "../../../css/mobile/mobile.module.css";
import Link from "next/link";
import defaultImage from "../../../../../public/noImage.jpg";

const MobileIzdvojeno = async () => {
  const data = await getPostsByCategory("izdvojeno", 5);

  return (
    <div className={styles.izdvojenoContainer}>
      <div className={styles.izdvojenoFirst}>
        <Link href={`/${data[0]?.slug}`}>
          <div className={styles.imgIzdvojeno}>
            <h2>IZDVOJENO</h2>

            <Image
              src={
                data[0]?.featuredImage?.node?.sourceUrl
                  ? data[0]?.featuredImage?.node?.sourceUrl
                  : defaultImage
              }
              width={300}
              height={200}
              quality={50}
              alt={"Izdvojeno Slika 0"}
            />
          </div>
          <h1>{data[0]?.title}</h1>
        </Link>
      </div>
      <div className={styles.izdvojenoRest}>
        {data.map((item: any, index: number) => {
          if (index !== 0) {
            return (
              <div key={index}>
                <Link href={`/${item?.slug}`}>
                  <div className={styles.img2Izdvojeno}>
                    <h2>IZDVOJENO</h2>
                    <Image
                      src={
                        item?.featuredImage?.node?.sourceUrl
                          ? item?.featuredImage?.node?.sourceUrl
                          : defaultImage
                      }
                      width={200}
                      height={100}
                      alt={`Izdvojeno Slika ${index}`}
                    />
                  </div>
                  <h1>{item?.title}</h1>
                </Link>
              </div>
            );
          }
          return;
        })}
      </div>
    </div>
  );
};

export default MobileIzdvojeno;
