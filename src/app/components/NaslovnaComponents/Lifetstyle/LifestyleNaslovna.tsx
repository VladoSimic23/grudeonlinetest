"use server";
import useWindowSize from "@/app/lib/useWindowSize";
import Link from "next/link";
import nasStyles from "../../../css/naslovnicaCss/naslovnica.module.css";
import LifestyleNaslovnaDetails from "./LifestyleNaslovnaDetails";
import { temporaryApiUrl } from "@/app/lib/fetchDb";
import { useCustomSWR } from "@/app/lib/api";
import { getPostsByCategory } from "@/app/lib/service";

const LifestyleNaslovna = async () => {
  const data = await getPostsByCategory("lifestyle", 6);

  return (
    <div>
      <h3 className={nasStyles.naslovnicaHeading}>
        <Link href={`/category/lifestyle`}>LIFESTYLE</Link>
      </h3>
      <div className={nasStyles.grid3GrudeOnline}>
        {data.map((item: any, index: number) => {
          return <LifestyleNaslovnaDetails key={index} data={item} />;
        })}
      </div>
    </div>
  );
};

export default LifestyleNaslovna;
