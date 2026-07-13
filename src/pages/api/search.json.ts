import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export const GET: APIRoute = async ({ url }): Promise<Response> => {
  const query: string | null = url.searchParams.get("query");
  // handle if query is null or empty
  if (query === null) {
    return new Response(
      JSON.stringify({ error: "query parameter is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
  const allBlogArticles: CollectionEntry<"blog">[] =
    await getCollection("blog");

  // filter articles based on the search query
  const searchResults = allBlogArticles.filter((article) => {
    const titleMatch: boolean = article.data.title
      .toLowerCase()
      .includes(query!.toLowerCase());

    const bodyMatch: boolean = article
      .body!.toLowerCase()
      .includes(query!.toLowerCase());

    const slugMatch: boolean = article.data.slug
      .toLowerCase()
      .includes(query!.toLowerCase());

    return titleMatch || bodyMatch || slugMatch;
  });
  // query is not null, proceed with search logic
  return new Response(JSON.stringify({ searchResults }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
