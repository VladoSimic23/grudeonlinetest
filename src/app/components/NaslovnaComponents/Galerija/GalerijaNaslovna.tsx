import { getPostsByCategory } from "@/app/lib/service";
import Link from "next/link";
import nasStyles from "../../../css/naslovnicaCss/naslovnica.module.css";
import GalerijeNaslovnaDetails from "./GalerijeNaslovnaDetails";

const GalerijaNaslovna = async () => {
  const data = await getPostsByCategory("galerije", 4);
  return (
    <div>
      <div>
        <h3 className={nasStyles.naslovnicaHeading}>
          <Link href={`/category/galerije`}>GALERIJE</Link>
        </h3>
        <div className={nasStyles.grid2GrudeOnline}>
          {data.map((item: any, index: number) => {
            return <GalerijeNaslovnaDetails key={index} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default GalerijaNaslovna;
