export const API_URL = process.env.NEXT_WORDPRESS_API_URL as string;
//export const temporaryApiUrl = "http://localhost:10010/graphql";
export const temporaryApiUrl = "http://193.108.130.23/~vlado/graphql";

export const fetchClientComments = async (contentName: string) => {
  try {
    const response = await fetch(temporaryApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query NewQuery {
          comments(where: {contentName: "${contentName}"}) {
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
        }`,
      }),
    });

    if (!response.ok) {
      return;
    }

    const result = await response.json();
    return result?.data?.comments?.nodes;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchClientApi = async (category: string, numOfPosts: number) => {
  try {
    const response = await fetch(temporaryApiUrl, {
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
      return;
    }

    const result = await response.json();
    return result?.data?.posts?.nodes;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export async function fetchAPI(query: any, { variables }: any = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  const res = await fetch(temporaryApiUrl, {
    next: { revalidate: 120000, tags: ["collection"] },
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

// Update fetchAPI function
export async function fetchAPI2(query: string, variables: any = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    query,
    variables,
  });

  try {
    const res = await fetch(temporaryApiUrl, {
      method: "POST",
      headers,
      body,
    });

    const json = await res.json();

    if (json.errors) {
      return;
    }

    return json.data;
  } catch (error) {
    console.error("Error in fetchAPI:", error);
    throw new Error("Failed to fetch API");
  }
}

/////

export const fetcher = async (
  url: any,
  category: string,
  numOfPosts: number
) => {
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
      return;
    }

    const result = await response.json();
    return result?.data?.posts?.nodes;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error so that useSWR can handle it
  }
};

export const fetcher2 = async (
  url: any,
  category: string,
  numOfPosts: number
) => {
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
    console.log("API Response:", response);

    if (!response.ok) {
      return;
    }

    const result = await response.json();
    return result?.data?.posts?.nodes;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error so that useSWR can handle it
  }
};
