// // "use client";
// // import SearchedPostList from "@/app/components/PostList/SearchedPostList";
// // import { useSearchParams } from "next/navigation";
// // import { useState, useEffect, Suspense } from "react";

// // const SearchResults = () => {
// //   const src = useSearchParams();
// //   const [loading, setLoading] = useState(true);
// //   const [results, setResults] = useState([]);
// //   const url = new URLSearchParams(src);
// //   const skip = url.get("q");
// //   // console.log(results);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       if (skip) {
// //         const response = await fetch(`http://localhost:10010/graphql`, {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({
// //             query: `
// //       query SearchQuery($searchQuery: String!) {
// //         posts(where: { search: $searchQuery }) {
// //           nodes {
// //             slug
// //             title
// //             content
// //             date
// //             featuredImage {
// //               node {
// //                 sourceUrl(size: LARGE)
// //               }
// //             }
// //             categories {
// //               edges {
// //                 node {
// //                   slug
// //                 }
// //               }
// //             }
// //             tags {
// //               nodes {
// //                 name
// //               }
// //             }
// //           }
// //         }
// //       }
// //     `,
// //             variables: {
// //               searchQuery: skip, // Assuming 'q' is the search query parameter
// //             },
// //           }),
// //         });

// //         if (!response.ok) {
// //           throw new Error(
// //             `GraphQL request failed with status ${response.status}`
// //           );
// //         }

// //         const data = await response.json();
// //         setResults(data.data.posts.nodes);
// //       }

// //       setLoading(false);
// //     };

// //     fetchData();
// //   }, [skip]);

// //   if (loading) {
// //     return <h1>Loading Posts List...</h1>;
// //   }

// //   return (
// //     <div>
// //       <SearchedPostList data={results} />
// //     </div>
// //   );
// // };

// // export default SearchResults;
// // pages/index.js (or whatever your root route file is named)

// import { useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import SearchedPostList from "@/app/components/PostList/SearchedPostList";
// import styles from "../css/mainCss/mainStyle.module.css";
// import { Metadata, ResolvingMetadata } from "next";
// import { getSinglePost } from "../lib/service";

// const SearchResults = () => {
//   const urlSearchParams = useSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [results, setResults] = useState([]);
//   const searchQuery = urlSearchParams.get("s");

//   useEffect(() => {
//     const fetchData = async () => {
//       if (searchQuery) {
//         try {
//           const response = await fetch(`http://localhost:10010/graphql`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               query: `
//                 query SearchQuery($searchQuery: String!) {
//                   posts(where: { search: $searchQuery }) {
//                     nodes {
//                       slug
//                       title
//                       content
//                       date
//                       featuredImage {
//                         node {
//                           sourceUrl(size: LARGE)
//                         }
//                       }
//                       categories {
//                         edges {
//                           node {
//                             slug
//                           }
//                         }
//                       }
//                       tags {
//                         nodes {
//                           name
//                         }
//                       }
//                     }
//                   }
//                 }
//               `,
//               variables: {
//                 searchQuery,
//               },
//             }),
//           });

//           if (!response.ok) {
//             throw new Error(
//               `GraphQL request failed with status ${response.status}`
//             );
//           }

//           const data = await response.json();
//           setResults(data.data.posts.nodes);
//         } catch (error: any) {
//           console.error("Error fetching data:", error.message);
//         }
//       }

//       setLoading(false);
//     };

//     fetchData();
//   }, [searchQuery]);

//   if (loading) {
//     return <h1>Loading Posts List...</h1>;
//   }

//   return (
//     <div className={styles.postList}>
//       <h1 className={styles.headingEdit}>
//         Search Results for: {searchQuery?.toUpperCase()}
//       </h1>
//       <SearchedPostList data={results} />
//     </div>
//   );
// };

// export default SearchResults;

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
