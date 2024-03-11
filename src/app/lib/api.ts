// api.ts

import useSWR, { SWRConfiguration } from "swr";
import useWindowSize from "./useWindowSize";
import { fetchAPI } from "./fetchDb";

interface FetcherArgs {
  url: string;
  category: string;
  numOfPosts: number;
}

export const fetcher = async ({ url, category, numOfPosts }: FetcherArgs) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query NewQuery {
          posts(first: ${numOfPosts}, where: {categoryName: "${category}"}) {     
            nodes {
              slug
              title
              content
              date
              postId
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
        }`,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result?.data?.posts?.nodes;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error so that useSWR can handle it
  }
};

export const fetcher2 = async ({ url, category, numOfPosts }: FetcherArgs) => {
  try {
    const response = await fetch("http://localhost:10010/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          {
            posts(first: ${numOfPosts}) {
              nodes {
                title
                date
                slug
                featuredImage {
                    node {
                      sourceUrl(size: LARGE)
                    }
                  }
                  comments {
                    nodes {

                      date                         
                    }
                  }
              }
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result?.data?.posts?.nodes;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const fetcher3 = async ({
  url,
  numOfPosts,
}: {
  url: string;
  numOfPosts: number;
}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          posts(first: ${numOfPosts}) {
            nodes {
              title
              slug
              date
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
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
        }`,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result?.data?.posts?.nodes;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error so that useSWR can handle it
  }
};

export const fetcher4 = async ({
  url,
  numOfPosts,
  category,
}: {
  url: string;
  numOfPosts: number;
  category: string;
}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query NewQuery {
          posts(first: ${numOfPosts}, where: {categoryName: "${category}"}) {     
              nodes {
                slug
                title
                content
                date
                postId
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
        }`,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result?.data?.posts?.nodes;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error so that useSWR can handle it
  }
};

export const useCustomSWR = <T>(
  key: string | FetcherArgs,
  config?: SWRConfiguration<T>
) => {
  const aw = useWindowSize();
  const { data, error } = useSWR<any>(aw ? null : key, fetcher, config);

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export const useCustomSWR2 = <T>(
  key: string | FetcherArgs,
  config?: SWRConfiguration<T>
) => {
  const aw = useWindowSize();
  const { data, error } = useSWR<any>(aw ? null : key, fetcher2, config);

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export const useCustomSWR3 = <T>(
  key: string | FetcherArgs,
  config?: SWRConfiguration<T>
) => {
  const { data, error } = useSWR<any>(key, fetcher3, config);

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export const useCustomSWR4 = <T>(
  key: string | FetcherArgs,
  config?: SWRConfiguration<T>
) => {
  const { data, error } = useSWR<any>(key, fetcher4, config);

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};
