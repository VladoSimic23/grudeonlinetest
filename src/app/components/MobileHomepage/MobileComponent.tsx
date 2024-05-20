import { getRecentPostsHomepage } from "@/app/lib/service";
import Image from "next/image";
import Link from "next/link";
import mobileStyles from "../../css/mobile/mobile.module.css";
import { FaComments } from "react-icons/fa";
import { formatDateToCroatian } from "@/app/lib/utils";
import { categoryStyles } from "@/app/lib/helpers";
import defaultImage from "../../../../public/noImage.jpg";
import cheerio from "cheerio";
import MobileComponentDetails from "./MobileComponentDetails";

const MobileComponent = async () => {
  const data = await getRecentPostsHomepage(5);

  return (
    <div className={mobileStyles.mobilePost}>
      <h2 className={mobileStyles.mobilePostHeading}>Najnovije</h2>
      {data.map((item: any, index: number) => {
        return <MobileComponentDetails key={index} item={item} />;
      })}
    </div>
  );
};

export default MobileComponent;
