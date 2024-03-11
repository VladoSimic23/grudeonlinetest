"use client";
import useWindowSize from "@/app/lib/useWindowSize";
import Link from "next/link";
import nasStyles from "../../../css/naslovnicaCss/naslovnica.module.css";
import LifestyleNaslovnaDetails from "./LifestyleNaslovnaDetails";
import { temporaryApiUrl } from "@/app/lib/fetchDb";
import { useCustomSWR } from "@/app/lib/api";

const LifestyleNaslovna = () => {
  const isMobile = useWindowSize();
  const url = temporaryApiUrl; // Replace with your actual API endpoint
  const category = "Lifestyle";
  const numOfPosts = 10;

  // Use the custom SWR hook with the URL, category, and numberOfPosts
  const { data, error, isLoading } = useCustomSWR({
    url,
    category,
    numOfPosts,
  });

  if (isMobile) {
    return;
  }
  if (isMobile === undefined) {
    return null;
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
  if (!data) return <div>No data available</div>;

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
