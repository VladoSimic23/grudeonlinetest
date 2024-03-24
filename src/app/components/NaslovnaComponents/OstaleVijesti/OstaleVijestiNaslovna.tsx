"use server";
import Link from "next/link";
import nasStyles from "../../../css/naslovnicaCss/naslovnica.module.css";
import OstaleVijestiNaslovnaDetails from "./OstaleVijestiNaslovnaDetails";
import { getPostsByCategory } from "@/app/lib/service";

const OstaleVijestiNaslovna = async () => {
  const data = await getPostsByCategory("ostale-vijesti", 6);

  return (
    <div>
      <h3 className={nasStyles.naslovnicaHeading}>
        <Link href={`/category/ostale-vijesti`}>OSTALE VIJESTI</Link>
      </h3>
      <div className={nasStyles.grid3GrudeOnline}>
        {data.map((item: any, index: number) => {
          return <OstaleVijestiNaslovnaDetails key={index} data={item} />;
        })}
      </div>
    </div>
  );
};

export default OstaleVijestiNaslovna;
