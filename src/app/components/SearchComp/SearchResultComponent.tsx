"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchedPostList from "@/app/components/PostList/SearchedPostList";
import styles from "../../css/mainCss/mainStyle.module.css";
import { temporaryApiUrl } from "@/app/lib/fetchDb";
import Sidebar from "../Sidebar/Sidebar";

const SearchResultsComponent = () => {
  const urlSearchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const searchQuery = urlSearchParams.get("s");

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery) {
        try {
          const response = await fetch(temporaryApiUrl, {
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
                        comments {
                          nodes {
                            content
                            date
                            author {
                              node {
                                name
                              }
                            }
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

  if (results.length < 1) {
    return (
      <div>
        <div className={styles.noSearchResults}>
          <h1 className={styles.headingEdit}>
            Search Results for: {searchQuery?.toUpperCase()}
          </h1>
          <h2>
            Sorry, but nothing matched your search terms. Please try again with
            some different keywords.
          </h2>
        </div>
        <Sidebar />
      </div>
    );
  }

  return (
    <div className={`${styles.postList} ${styles.grid23}`}>
      <div>
        <h1 className={styles.headingEdit}>
          Search Results for: {searchQuery?.toUpperCase()}
        </h1>
        <SearchedPostList data={results} />
      </div>
      <Sidebar />
    </div>
  );
};

export default SearchResultsComponent;
