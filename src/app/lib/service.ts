import { fetchAPI, temporaryApiUrl } from "./fetchDb";

/// POSTS SECTION
export async function getAllPosts() {
  const data = await fetchAPI(`query NewQuery {
        posts {
          nodes {
            slug
            title
            content
            postId
            commentStatus
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
      }`);

  return data?.posts?.nodes;
}

export async function getSinglePost(slug: string) {
  const query = `
    query SinglePost($slug: String!) {
      postBy(slug: $slug) {
        slug
            title
            content
            date
            postId
            commentStatus
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
  `;

  const variables = {
    slug,
  };
  try {
    const data = await fetchAPI(query, { variables });
    if (!data || !data.postBy) {
      throw new Error("Post not found");
    }
    return data.postBy;
  } catch (error) {
    console.error("Error fetching single post:", error);
    throw new Error("Failed to fetch single post");
  }
  // try {
  //   const data = await fetchAPI(query, { variables });
  //   return data?.postBy; // Adjust this based on the actual response structure
  // } catch (error) {
  //   console.error("Error fetching single post:", error);
  //   throw new Error("Failed to fetch single post");
  // }
}

export const getRecentPosts = async (numOfPosts: number) => {
  const data = await fetchAPI(`{
      posts(first: ${numOfPosts}) {
        nodes {
          title
          slug
        }
      }
    }`);

  return data?.posts?.nodes;
};
export const getRecentPostsHomepage = async (numOfPosts: number) => {
  const data = await fetchAPI(`{
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
    }`);

  return data?.posts?.nodes;
};
export const getPopularPosts = async (numOfPosts: number) => {
  const data = await fetchAPI(`{
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
    }`);

  return data?.posts?.nodes;
};

/// TAGS SECTION
export async function getPostsByTag(tag: string) {
  const query = `query NewQuery {
    posts(where: {tag: ""}) {
      nodes {
        title
      }
    }
  }`;

  const variables = {
    tag,
  };

  try {
    const data = await fetchAPI(query, { variables });
    return data.postBy; // Adjust this based on the actual response structure
  } catch (error) {
    console.error("Error fetching post by tag:", error);
    throw new Error("Failed to fetch post by tag");
  }
}

export async function getAllPostsByTags(tag?: string) {
  const data = await fetchAPI(`query NewQuery {
    posts(where: {tag: "${tag}"}) {
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
  }`);

  return data?.posts?.nodes;
}

/// CATEGORY SECTION
export async function getPostsByCategory(category: string, numOfPosts: number) {
  const data = await fetchAPI(`query NewQuery {
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
  }`);

  return data?.posts?.nodes;
}

/// COMENTS SECTION
export async function submitComment(
  id: number,
  comment: string,
  username: string
) {
  try {
    const response = await fetch(temporaryApiUrl, {
      //next: { revalidate: 1, tags: ["collection"] },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation {
            createComment(input: {
              commentOn: ${id}
              content: "${comment}"
              author: "${username}"        
            }) {
              success
             
            }
          }
        `,
      }),
    });

    const result = await response.json();
    const commentCreation = result.data?.createComment;

    if (commentCreation) {
      console.log(`Comment successfully added`);
    } else {
      console.log("Failed to add comment.");
    }
  } catch (error: any) {
    console.error("Error adding comment:", error.message);
  }
}

export async function getRecentComments(numOfComments: number) {
  const data = await fetchAPI(`{
    comments(first: ${numOfComments}) {
      nodes {
        id
        content
        author {
          node {
            name
          }
        }
        date
        commentedOn {
          node {
            ... on Post {
              title
              slug
            }
          }
        }
      }
    }
  }`);
  return data?.comments;
}
