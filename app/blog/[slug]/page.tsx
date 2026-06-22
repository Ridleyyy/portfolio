import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Pre-render one static page per post at build time. Unknown slugs 404
// instead of being rendered on-demand (dynamicParams = false).
export function generateStaticParams(): { slug: string }[] {
  return getPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.summary,
  };
}

export default async function BlogPost({ params }: PageProps) {
  // In Next.js 16, params is async and must be awaited.
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="flex-1 px-8 py-12">
      <Link
        href="/blog"
        className="font-mono text-xs text-neutral-500 transition-colors hover:text-neutral-900"
      >
        ← Blog
      </Link>

      <header className="mt-6">
        <h1 className="font-serif text-2xl text-neutral-900">
          {post.meta.title}
        </h1>
        <time className="mt-1 block font-mono text-xs text-neutral-500">
          {post.meta.date}
        </time>
      </header>

      <article
        className="
          prose mt-8 max-w-none
          font-serif
          prose-headings:font-serif prose-headings:text-neutral-900
          prose-p:text-neutral-800
          prose-a:text-neutral-900 prose-a:underline prose-a:underline-offset-4
          prose-strong:text-neutral-900
          prose-li:text-neutral-800 prose-li:marker:text-neutral-700
          prose-code:font-mono prose-code:text-neutral-900 prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-neutral-500 prose-pre:font-mono prose-pre:text-neutral-100
          prose-blockquote:border-neutral-500 prose-blockquote:text-neutral-700
        "
      >
        {/* Frontmatter was already stripped by gray-matter, so disable
            next-mdx-remote's own parser to avoid double-handling it. */}
        <MDXRemote source={post.content} options={{ parseFrontmatter: false }} />
      </article>
    </main>
  );
}
