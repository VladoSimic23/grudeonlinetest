// filter by category function
export const filterPostsByCategory = (
  posts: any[],
  categorySlug: string
): any[] => {
  return posts.filter((post) => {
    // Check if the post has the specified category
    return post.categories.edges.some(
      (category: any) => category.node.slug === categorySlug
    );
  });
};
