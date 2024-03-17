"use client";

import useWindowSize from "@/app/lib/useWindowSize";
import Link from "next/link";
import nasStyles from "../../../css/naslovnicaCss/naslovnica.module.css";
import OstaleVijestiNaslovnaDetails from "./OstaleVijestiNaslovnaDetails";
import { fetcher, temporaryApiUrl } from "@/app/lib/fetchDb";
import useSWR from "swr";

const OstaleVijestiNaslovna = () => {
  const isMobile = useWindowSize();

  const useClientApi = () => {
    const apiUrl = temporaryApiUrl;

    const { data, error, isValidating } = useSWR(
      isMobile ? null : apiUrl,
      (url) => fetcher(url, "Ostale Vijesti", 6)
    );

    if (error) {
      console.error("SWR Error:", error);
    }

    return {
      data,
      error,
      isLoading: !data && !error,
      isFetching: isValidating,
    };
  };

  const { data, error, isLoading, isFetching } = useClientApi();

  if (isMobile) {
    return null;
  }
  if (isMobile === undefined) {
    return null;
  }

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

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
