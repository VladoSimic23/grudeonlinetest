import { revalidatePath } from "next/cache";

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

export async function triggerRevalidateForPage(pagePath: any) {
  revalidatePath(`/${pagePath}`);
}

export async function triggerRevalidateForAllPages() {
  revalidatePath("/", "layout");
}
