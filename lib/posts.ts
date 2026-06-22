import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Posts live outside the route tree so they aren't treated as pages.
// process.cwd() is the repo root when Next runs the build/dev server.
const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO string from frontmatter, e.g. "2026-06-01"
  summary: string;
};

export type Post = {
  meta: PostMeta;
  content: string; // raw MDX body, frontmatter stripped
};

function readPostFile(slug: string): Post {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  // gray-matter types `data` as `{ [key: string]: any }`, so coerce each
  // field to keep our return type honest under strict mode.
  return {
    meta: {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      summary: String(data.summary ?? ""),
    },
    content,
  };
}

/** All post slugs, derived from .mdx filenames. */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** All posts' metadata, sorted newest-first. For the index page. */
export function getAllPostsMeta(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => readPostFile(slug).meta)
    // ISO dates (YYYY-MM-DD) sort correctly as plain strings — no Date parsing.
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** A single post (meta + raw MDX) by slug, or null if it doesn't exist. */
export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  return readPostFile(slug);
}
