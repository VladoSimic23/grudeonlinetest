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

export const categoryStyles = [
  { cat: "sport", color: "green" },
  { cat: "galerije", color: "purple" },
  { cat: "grude-online", color: "chocolate" },
  { cat: "lifestyle", color: "darkmagenta" },
  { cat: "politika", color: "red" },
  { cat: "crna-kronika", color: "darkslategray" },
  { cat: "gospodarstvo", color: "darkslateblue" },
  { cat: "kultura", color: "brown" },
  { cat: "vijesti", color: "crimson" },
  { cat: "zanimljivosti", color: "cornflowerblue" },
  { cat: "ostale-vijesti", color: "cadetblue" },
];
