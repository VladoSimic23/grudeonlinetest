"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import navStyles from "../../css/nav/nav.module.css";
import SearchedPostList from "@/app/components/PostList/SearchedPostList";
import styles from "../../css/mainCss/mainStyle.module.css";

const SearchResultsComponent = () => {
  const urlSearchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const searchQuery = urlSearchParams.get("s");

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery) {
        try {
          const response = await fetch(`http://localhost:10010/graphql`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
                  query SearchQuery($searchQuery: String!) {
                    posts(where: { search: $searchQuery }) {
                      nodes {
                        slug
                        title
                        content
                        date
                        featuredImage {
                          node {
                            sourceUrl(size: LARGE)
                          }
                        }
                        categories {
                          edges {
                            node {
                              slug
                            }
                          }
                        }
                        tags {
                          nodes {
                            name
                          }
                        }
                      }
                    }
                  }
                `,
              variables: {
                searchQuery,
              },
            }),
          });

          if (!response.ok) {
            throw new Error(
              `GraphQL request failed with status ${response.status}`
            );
          }

          const data = await response.json();
          setResults(data.data.posts.nodes);
        } catch (error: any) {
          console.error("Error fetching data:", error.message);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [searchQuery]);

  if (loading) {
    return <h1>Loading Posts List...</h1>;
  }

  return (
    <div className={styles.postList}>
      <h1 className={styles.headingEdit}>
        Search Results for: {searchQuery?.toUpperCase()}
      </h1>
      <SearchedPostList data={results} />
    </div>
  );
};

export default SearchResultsComponent;
