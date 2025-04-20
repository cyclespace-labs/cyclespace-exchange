import { simpleBlogCard } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { NavBar } from "@/components/Navigation/NavBar";

async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc) [0...4] {
    _id,
    title,
    tags,
    smallDescription,
    "currentSlug": slug.current,
    titleImage,
    categories[]-> {
      _id,
      name,
      "slug": slug.current
    }
  }`;

  const data = await client.fetch(query, {}, { next: { revalidate: 30 } });
  return data;
}

export default async function News() {
  const data: simpleBlogCard[] = await getData();

  return (
    <div className="w-full h-full">
      {data && data.length > 0 ? (
        <>
          <div className="w-full h-full flex md:mt-2">
            <NavBar />
          </div>

          <div className="pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-300">Latest News</h1>

            {/* Featured Post */}
            <div className="mb-12">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                <Image
                  src={urlFor(data[0].titleImage).url()}
                  alt={data[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-900 dark:text-gray-300">
                {data[0].title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{data[0].smallDescription}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {data[0]?.categories?.map((category) => (
                  <Badge
                    key={category._id}
                    variant="secondary"
                    className="text-gray-600 dark:text-gray-400 rounded-full border-2 border-gray-900"
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
              <Button asChild className="mt-4 bg-black dark:bg-white text-white dark:text-black">
                <Link href={`/blog/${data[0].currentSlug}`}>Read More</Link>
              </Button>
            </div>

            {/* Grid of Other Posts */}
            <div className="grid md:grid-cols-3 gap-8">
              {data.slice(1).map((post) => (
                <Card key={post._id} className="group rounded-2xl">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] rounded-t-2xl overflow-hidden">
                      <Image
                        src={urlFor(post.titleImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-gray-300">{post.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{post.smallDescription}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.tags?.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-gray-600 dark:text-gray-400 rounded-full border-2 border-gray-900"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {post.categories?.map((category) => (
                          <Badge
                            key={category._id}
                            variant="secondary"
                            className="text-gray-600 dark:text-gray-400 rounded-full border-2 border-gray-900"
                          >
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full text-gray-600 dark:text-gray-400">
                      <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-500">No posts found</p>
        </div>
      )}
    </div>
  );
}