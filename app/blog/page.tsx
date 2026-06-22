import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";

export default function Blog() {
  const posts = getAllPostsMeta();

  return (
    <main className="flex-1 px-8 py-12">
      <h1 className="font-serif text-2xl text-neutral-900">Blog</h1>

      <ul className="mt-8 flex flex-col gap-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <h2 className="font-serif text-xl text-neutral-900 group-hover:underline group-hover:underline-offset-4">
                {post.title}
              </h2>
              <time className="mt-1 block font-mono text-xs text-neutral-500">
                {post.date}
              </time>
              <p className="mt-2 font-serif text-base text-neutral-700">
                {post.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <p className="mt-8 font-serif text-base text-neutral-600">
          No posts yet.
        </p>
      )}
    </main>
  );
}
