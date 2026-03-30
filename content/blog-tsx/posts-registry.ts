/**
 * Posts registry - manages blog post registrations.
 * This file centralizes the registry logic to reduce change amplification.
 */

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags?: string[];
  readingTime: string;
  cover: string;
  ogImage?: string;
};

export type BlogPostEntry<T = any> = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  readingTime: string;
  cover: string;
  ogImage: string;
  Content: T;
};

// Registry for lazy-loaded posts
const postRegistry: Record<
  string,
  () => Promise<{ default: any; meta: BlogPostMeta }>
> = {};

/**
 * Register a blog post for lazy loading.
 * This allows posts to be added without modifying the central index.
 */
export function registerPost(
  slug: string,
  loader: () => Promise<{ default: any; meta: BlogPostMeta }>
) {
  postRegistry[slug] = loader;
}

/**
 * Get all registered blog posts.
 * Uses dynamic imports to minimize initial bundle size and coupling.
 */
export async function getPosts(): Promise<BlogPostEntry[]> {
  const posts: BlogPostEntry[] = [];

  for (const [slug, loader] of Object.entries(postRegistry)) {
    try {
      const { default: Content, meta } = await loader();
      posts.push({
        slug: meta.slug,
        title: meta.title,
        date: meta.date,
        excerpt: meta.excerpt,
        author: meta.author,
        tags: meta.tags || [],
        readingTime: meta.readingTime,
        cover: meta.cover,
        ogImage: meta.ogImage || meta.cover,
        Content,
      });
    } catch (error) {
      console.error(`Failed to load post: ${slug}`, error);
    }
  }

  // Sort by date descending
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Helper function to create a post entry from meta and Content.
 */
export function createPostEntry<T>(
  meta: BlogPostMeta,
  Content: T
): BlogPostEntry<T> {
  return {
    slug: meta.slug,
    title: meta.title,
    date: meta.date,
    excerpt: meta.excerpt,
    author: meta.author,
    tags: meta.tags || [],
    readingTime: meta.readingTime,
    cover: meta.cover,
    ogImage: meta.ogImage || meta.cover,
    Content,
  };
}
