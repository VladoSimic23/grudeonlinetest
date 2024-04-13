import React, { Suspense } from "react";
import SearchResultsComponent from "../components/SearchComp/SearchResultComponent";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params;

  return {
    title: `Tražili ste ${searchParams.s} - Grude Online`,
  };
}

const SearchResults = () => {
  return (
    <>
      <Suspense fallback={<h1>Loading search results...</h1>}>
        <SearchResultsComponent />
      </Suspense>
    </>
  );
};

export default SearchResults;
