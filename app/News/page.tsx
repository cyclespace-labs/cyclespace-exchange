import { client } from "@/lib/sanity";
import { NavBar } from "@/components/Navigation/NavBar";
import NewsClient from './NewsClient';

async function getData() {
  const blogQuery = `*[_type == 'blog'] | order(_createdAt desc) [0...4] {
    title,
    _id,
    smallDescription,
    "currentSlug": slug.current,
    titleImage,
    tags,
    categories[]->{
      _id,
      name,
      "slug": slug.current
    }
  }`;

  const categoryQuery = `*[_type == 'category'] {
    _id,
    name,
    "slug": slug.current
  }`;

  const [blogs, categories] = await Promise.all([
    client.fetch(blogQuery, {}, { next: { revalidate: 30 } }),
    client.fetch(categoryQuery, {}, { next: { revalidate: 30 } }),
  ]);

  return { blogs, categories };
}

export default async function News() {
  const { blogs, categories } = await getData();
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex md:mt-2">
        <NavBar />
      </div>
      <NewsClient initialBlogs={blogs} categories={categories} />
    </div>
  );
}